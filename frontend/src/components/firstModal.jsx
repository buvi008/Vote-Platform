/* eslint-disable */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from "@material-ui/core/Typography";
import * as Yup from "yup";
import {Box, Grid, Link, TextField} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
import {Formik} from "formik";
import {loginUser} from "../views/auth/form/formAuth";
import * as ACTION_USER from "../redux/reducers/actions/action-user";
import Cookies from "universal-cookie";
import {useDispatch} from "react-redux";


const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
  modal: {textAlign: 'center'},
  danger: {
    color: '#dc3545',
  }
}));

export default function FirstModal(props) {
  const classes = useStyles();
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const [errorPass, setErrorPass] = useState(false);

  const handleLoginSubmit = async (values) => {
    const response = await loginUser(values)
    if (response.ok) {
      setErrorPass(false)
      cookies.set('user', response.user, { path: '/', expires: new Date(response.expires) });
      dispatch(ACTION_USER.IS_LOGIN(response.user))
      props.props.handleFirstModal(false)
    } else {
      setErrorPass(true)
    }
  }


  return (
    <React.Fragment>
      <Dialog
        fullWidth
        maxWidth={'xs'}
        open={props.props.open}
        // onClose={() => props.props.handleFirstModal(false)}
        aria-labelledby="max-width-dialog-title"
        className={classes.modal}
      >
        <DialogTitle id="max-width-dialog-title"><Typography style={{paddingTop: '16px', fontSize: '40px', fontWeight: '600'}}>Мой город</Typography></DialogTitle>
        <DialogContent>
          <DialogContentText style={{padding: '0px 24px'}}>
            Для дальнейших действий на сайте вам потребуется войти в свой аккаунт
          </DialogContentText>
          {errorPass ? <Typography className={classes.danger}>Неверный номер или пароль</Typography> : false}


          <Formik
            initialValues={{
              phone: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              phone: Yup.string().max(20).required('Введите номер телефона'),
              password: Yup.string().max(50).required('Введите пароль')
            })}
            // onSubmit={() => {
            //   navigate('/app/dashboard', { replace: true });
            // }}
          >
            {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values
              }) => (
              <form onSubmit={(e) => {
                e.preventDefault();
                handleLoginSubmit(values);
              }}>
                <TextField
                  error={Boolean(touched.phone && errors.phone)}
                  fullWidth
                  helperText={touched.phone && errors.phone}
                  label="Введите пароль"
                  margin="normal"
                  name="phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.phone}
                  variant="outlined"
                  style={{marginBottom: '0px'}}
                  autoComplete={'off'}
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Введите пароль"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                  style={{marginBottom: '0px'}}
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    aria-label='signin'
                  >
                    Войти
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Нет аккаунта?
                  {' '}
                  <Link
                    component={RouterLink}
                    onClick={() => props.props.handleFirstModal(false)}
                    to="/register"
                    variant="h6"
                  >
                    Зарегистрироваться
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>


        </DialogContent>
        <DialogActions>
          <Button aria-label='closed' onClick={() => props.props.handleFirstModal(false)} color="primary">
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
