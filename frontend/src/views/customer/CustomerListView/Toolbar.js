/* eslint-disable */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import { url } from 'src/fetchs/url-host';
import { useDispatch } from 'react-redux';
import * as ACTION_PROJECT from 'src/redux/reducers/actions/action-projects';
import { useSnackbar } from 'notistack';
import Cookies from 'universal-cookie';


const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const cookies = new Cookies();

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const dispatch = useDispatch();

  const handleAddProject = async (e) => {
    e.preventDefault();
      const addProject = await fetch(`http://${url}/app/postProject`, {
        method: 'POST',
        headers: {
          authorization: cookies.get('user').accessToken,
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          name: nameValue,
          address: addressValue,
          city: cookies.get('user').city,
        })
      })
      const response = await addProject.json();

      if (response.ok) {
        dispatch(ACTION_PROJECT.ADD_PROJECT(response.project));
        handleNameProject('');
        handleAddressProject('');
        handleClickOpen();
        enqueueSnackbar(response.msg, {variant: 'success'});
      } else {
        enqueueSnackbar(response.msg, {variant: 'error'});
      }

  }

  const [nameValue, setName] = useState('')
  const handleNameProject = (value) => {
    setName(value)
  }

  const [addressValue, setAddress] = useState('')
  const handleAddressProject = (value) => {
    setAddress(value)
  }


  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Button aria-label='import' className={classes.importButton}>
          Import
        </Button>
        <Button aria-label='export' className={classes.exportButton}>
          Export
        </Button>
        <Button
          color="primary"
          aria-label='add project'
          variant="contained"
          onClick={handleClickOpen}
        >
          Добавить проект
        </Button>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Поиск проектов"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>


      <div>
        <Dialog open={open} onClose={handleClickOpen} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Создать новый проект</DialogTitle>
          <form method='POST' onSubmit={handleAddProject}>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send updates
              occasionally.
            </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Название проекта"
                type="text"
                value={nameValue}
                fullWidth
                required
                onChange={(e) => handleNameProject(e.target.value)}
              />
              <TextField
                margin="dense"
                id="address"
                label="Адрес проекта"
                type="text"
                value={addressValue}
                onChange={(e) => handleAddressProject(e.target.value)}
                fullWidth
                required
              />
          </DialogContent>
          <DialogActions>
            <Button aria-label='cancel' onClick={handleClickOpen} color="primary">
              Отмена
            </Button>
            <Button aria-label='add_project' type='submit' color="primary">
              Добавить
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      </div>
    </div>

  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
