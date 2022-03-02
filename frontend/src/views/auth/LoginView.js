/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {Link as RouterLink, Navigate, useNavigate} from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
// import FacebookIcon from 'src/icons/Facebook';
// import GoogleIcon from 'src/icons/Google';
import Page from 'src/components/Page';
import { loginUser } from "./form/formAuth";
import Cookies from 'universal-cookie';
import {useDispatch} from "react-redux";
import * as ACTION_USER from 'src/redux/reducers/actions/action-user';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    // height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  IconButton: {
    padding: '0px'
  },
  danger: {
    color: '#dc3545',
  }
}));

const LoginView = (...rest) => {

  const dispatch = useDispatch();
  const cookies = new Cookies();
  const navigate = useNavigate();

  const [redirect, setRedirect] = useState(false)

  const classes = useStyles();

  const handleLoginSubmit = async (values) => {
    const response = await loginUser(values)
    if (response.ok) {
      setErrorPass(false)
      cookies.set('user', response.user, { path: '/', expires: new Date(response.expires) });
      dispatch(ACTION_USER.IS_LOGIN(response.user))
      navigate('/', { replace: true });
    } else {
      setErrorPass(true)
    }
  }

  useEffect(() => {
    if (cookies.get('user')) setRedirect(true)

    return () => {
      setRedirect(false)
    }
  }, [])

  const [showPassword, setShowPassword] = React.useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  };

  const [errorPass, setErrorPass] = useState(false);

  return (<>
    {redirect ? <Navigate to={'/'}/> : false }
    <Page
      className={classes.root}
      title="Login"
      id='auth_section'
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
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
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Вход
                  </Typography>
                  {/*<Typography*/}
                  {/*  color="textSecondary"*/}
                  {/*  gutterBottom*/}
                  {/*  variant="body2"*/}
                  {/*>*/}
                  {/*  Войдите под своим аккаунтом*/}
                  {/*</Typography>*/}
                </Box>
                {/*<Grid*/}
                {/*  container*/}
                {/*  spacing={3}*/}
                {/*>*/}
                {/*  <Grid*/}
                {/*    item*/}
                {/*    xs={12}*/}
                {/*    md={6}*/}
                {/*  >*/}
                {/*    <Button*/}
                {/*      color="primary"*/}
                {/*      fullWidth*/}
                {/*      startIcon={<FacebookIcon />}*/}
                {/*      onClick={handleSubmit}*/}
                {/*      size="large"*/}
                {/*      variant="contained"*/}
                {/*    >*/}
                {/*      Login with Facebook*/}
                {/*    </Button>*/}
                {/*  </Grid>*/}
                {/*  <Grid*/}
                {/*    item*/}
                {/*    xs={12}*/}
                {/*    md={6}*/}
                {/*  >*/}
                {/*    <Button*/}
                {/*      fullWidth*/}
                {/*      startIcon={<GoogleIcon />}*/}
                {/*      onClick={handleSubmit}*/}
                {/*      size="large"*/}
                {/*      variant="contained"*/}
                {/*    >*/}
                {/*      Login with Google*/}
                {/*    </Button>*/}
                {/*  </Grid>*/}
                {/*</Grid>*/}
                <Box
                  mt={3}
                  mb={1}
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    Войдите по номеру телефона
                  </Typography>
        {errorPass ? <Typography align='center' className={classes.danger}>Неверный номер или пароль</Typography> : false}

                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Номер телефона"
                  margin="normal"
                  name="phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.phone}
                  variant="outlined"
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
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment><IconButton className={classes.IconButton} position="end" onClick={handleShowPassword}>
                        {showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}</IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    aria-label='signin'
                    variant="contained"
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
                    to="/register"
                    variant="h6"
                  >
                    Зарегистрироваться
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page></>
  );
};

export default LoginView;
