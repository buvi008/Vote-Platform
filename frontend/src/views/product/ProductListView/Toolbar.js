/* eslint-disable */
import React from 'react';
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
import buttonStyle from 'src/assets/jss/components/buttonStyle';



const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  buttonPrimary: buttonStyle.primary
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      {/*<Box*/}
      {/*  display="flex"*/}
      {/*  justifyContent="flex-end"*/}
      {/*>*/}
      {/*  <Button className={classes.importButton}>*/}
      {/*    Import*/}
      {/*  </Button>*/}
      {/*  <Button className={classes.exportButton}>*/}
      {/*    Export*/}
      {/*  </Button>*/}
      {/*  <Button*/}
      {/*    className={classes.buttonPrimary}*/}
      {/*    variant="contained"*/}
      {/*  >*/}
      {/*    Добавить проект*/}
      {/*  </Button>*/}
      {/*</Box>*/}
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
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
