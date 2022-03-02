/* eslint-disable */
import React, {useState} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { Button, makeStyles, TableCell, TextField } from "@material-ui/core";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import DialogActions from "@material-ui/core/DialogActions";
import { addNewVariant } from "./forms/formVariant";
import Slide from '@material-ui/core/Slide';
import { useDispatch } from 'react-redux';
import * as ACTION_PROJECT from 'src/redux/reducers/actions/action-projects';
import Cookies from 'universal-cookie';
import { useSnackbar } from 'notistack';



const useStyles = makeStyles((theme) => ({
  root: {},
  textarea: {
    minWidth: '100%',
    minHeight: '150px',
    maxWidth: '100%',
    maxHeight: '450px',
    overflow: 'auto!important',
    fontSize: '1.3rem',
    padding: '8px',
  },
  input: {
    display: 'none'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const Modal = (props) => {
  const classes = useStyles();
  const dataModal = props.props;

  const cookies = new Cookies();
  const { enqueueSnackbar } = useSnackbar();

  const [nameVariant, setNameVariant] = useState('');
  const handleNameVariant = (value) => {
    setNameVariant(value);
  }

  const [infoVariant, setInfoVariant] = useState('');
  const handleInfoVariant = (value) => {
    setInfoVariant(value);
  }

  const dispatch = useDispatch();


  const variantSender = async (e, data) => {
    e.preventDefault();
    if (data.id && data.name && data.infoText) {
      const response = await addNewVariant(data, cookies.get('user').accessToken);
      if (response.ok) {
        dispatch(ACTION_PROJECT.ADD_VARIANT({
          id: data.id,
          variant: response.variant,
        }))
        handleNameVariant('');
        handleInfoVariant('');
        dataModal.func();
        enqueueSnackbar(response.msg, { variant: 'success' })
      } else {
        enqueueSnackbar(response.msg, { variant: 'error' })
      }
    }
  }

  return (
    <div>
      <Dialog open={dataModal.open} onClose={dataModal.func}  aria-labelledby="form-dialog-title" TransitionComponent={Transition}>
        <DialogTitle id="form-dialog-title">Вариант Проекта</DialogTitle>
        {/*action={'http://192.168.1.156/app/uploadFile'}*/}
        <form method='PUT' onSubmit={(e) => {
          e.preventDefault();
          variantSender(e, {
            id: dataModal.id,
            name: nameVariant,
            infoText: infoVariant,
            images: document.getElementById('contained-button-file'),
          })
        }}>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send updates
              occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Название варианта"
              type="text"
              value={nameVariant}
              fullWidth
              required
              onChange={(e) => handleNameVariant(e.target.value)}
            />
            <TextareaAutosize
              required
              name={'info'}
              className={classes.textarea}
              value={infoVariant}
              placeholder={'Описание варианта'}
              onChange={(e) => handleInfoVariant(e.target.value)}
            />
            <input
              // accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              name={'images'}
              type="file"
              // value={images}
              // onChange={(e) => handleImages(e.target.value)}
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" aria-label='select file' component="span">
                Выберите файлы
              </Button>
            </label>

            {/*// value={addressValue}*/}
            {/*// onChange={(e) => handleAddressProject(e.target.value)}*/}
          </DialogContent>
          <DialogActions>
            <Button aria-label='cancel' color="primary" onClick={dataModal.func}>
              Отмена
            </Button>
            <Button aria-label='insert_variant' type='submit' color="primary">
              Добавить
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default Modal;
