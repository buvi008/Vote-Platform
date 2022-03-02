/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {Link as RouterLink, Navigate} from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import IconButton from "@material-ui/core/IconButton";
import { createNewUser } from './form/formAuth';
import Cookies from "universal-cookie";
import {PersonAdd} from "@material-ui/icons";

const currencies = [
  {
    value: '',
    label: 'Не выбрано',
  },
{"value":"Махачкала","label":"Махачкала"},{"value":"Хасавюрт","label":"Хасавюрт"},{"value":"Дербент","label":"Дербент"},{"value":"Каспийск","label":"Каспийск"},{"value":"Кизляр","label":"Кизляр"},{"value":"Кизилюрт","label":"Кизилюрт"},{"value":"Буйнакск","label":"Буйнакск"},{"value":"Даг Огни","label":"Даг Огни"},{"value":"Избербаш","label":"Избербаш"},{"value":"Южно-Сухокумск","label":"Южно-Сухокумск"},{"value":"Агульский район","label":"Агульский район"},{"value":"Акушинский район","label":"Акушинский район"},{"value":"Ахвахский район","label":"Ахвахский район"},{"value":"Ахтынский район","label":"Ахтынский район"},{"value":"Бабаюртовский район","label":"Бабаюртовский район"},{"value":"Ботлихский район","label":"Ботлихский район"},{"value":"Буйнакский район","label":"Буйнакский район"},{"value":"Гергебильский район","label":"Гергебильский район"},{"value":"Гумбетовский район","label":"Гумбетовский район"},{"value":"Гунибский район","label":"Гунибский район"},{"value":"Дахадаевский район","label":"Дахадаевский район"},{"value":"Дербентский район","label":"Дербентский район"},{"value":"Докузпаринский район","label":"Докузпаринский район"},{"value":"Казбековский район","label":"Казбековский район"},{"value":"Кайтагский район","label":"Кайтагский район"},{"value":"Карабудахкентский район","label":"Карабудахкентский район"},{"value":"Каякентский район","label":"Каякентский район"},{"value":"Кизилюртовский район","label":"Кизилюртовский район"},{"value":"Кизлярский район","label":"Кизлярский район"},{"value":"Кулинский район","label":"Кулинский район"},{"value":"Кумторкалинский район","label":"Кумторкалинский район"},{"value":"Курахский район","label":"Курахский район"},{"value":"Лакский район","label":"Лакский район"},{"value":"Левашинский район","label":"Левашинский район"},{"value":"Магарамкентский район","label":"Магарамкентский район"},{"value":"Новолакский район","label":"Новолакский район"},{"value":"Ногайский район","label":"Ногайский район"},{"value":"Рутульский район","label":"Рутульский район"},{"value":"Сергокалинский район","label":"Сергокалинский район"},{"value":"Сулейман-Стальский район","label":"Сулейман-Стальский район"},{"value":"Табасаранский район","label":"Табасаранский район"},{"value":"Тарумовский район","label":"Тарумовский район"},{"value":"Тляратинский район","label":"Тляратинский район"},{"value":"Унцукульский район","label":"Унцукульский район"},{"value":"Хасавюртовский район","label":"Хасавюртовский район"},{"value":"Хивский район","label":"Хивский район"},{"value":"Хунзахский район","label":"Хунзахский район"},{"value":"Цумадинский район","label":"Цумадинский район"},{"value":"Цунтинский район","label":"Цунтинский район"},{"value":"Бежтинский участок","label":"Бежтинский участок"},{"value":"Чародинский район","label":"Чародинский район"},{"value":"Шамильский район","label":"Шамильский район"}
];


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
  icon: {
    marginRight: '8px',
  }
}));

const RegisterView = (...rest) => {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false)
  const [loginRedirect, setLoginRedirect] = useState(false)

  const cookies = new Cookies();


  const handleSubmitReg = async (values) => {
    const response = await createNewUser(values)
    if (response.ok) {
      setLoginRedirect(true)
    } else {
      console.log('Ошибка')
    }
  }

  const [showPassword, setShowPassword] = React.useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  };

  useEffect(() => {
    if (cookies.get('user')) setRedirect(true)
    
    return () => {
      setLoginRedirect(false)
      setRedirect(false)
    }
  }, [])

  return (<>
      {redirect ? <Navigate to={'/'}/> : false}
      {loginRedirect ? <Navigate to={'/login'}/> : false}
      
    <Page
      className={classes.root}
      title="Регистрация"
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
              name: '',
              city: localStorage.getItem('city') ?? '',
              password: '',
              age: '',
              employ: 'Свободен',
              // policy: false,
            }}
            validationSchema={
              Yup.object().shape({
                phone: Yup.string().max(20).required('Введите номер телефона'),
                name: Yup.string().max(60).required('Введите ФИО'),
                city: Yup.string().max(50).required('Укажите ваш город'),
                password: Yup.string().max(50).required('Введите пароль'),
                age: Yup.string().max(3).required('Укажите ваш возраст'),
                employ: Yup.string().max(50).required('Отметьте занятость'),
                // policy: Yup.boolean().oneOf([true], 'Это поле необходимо отметить')
              })
            }
            onSubmit={(values, { setSubmitting }) => {
                handleSubmitReg(values)
                setSubmitting(false);
            }}
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
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Регистрация нового аккаунта
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Используйте номер телефона для регистрации аккаунта
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label="ФИО"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  variant="outlined"
                  autoComplete={'off'}
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Пароль"
                  margin="normal"
                  name="password"
                  autoComplete={'off'}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  variant="outlined"
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment><IconButton aria-label='show password' className={classes.IconButton} position="end" onClick={handleShowPassword}>
                        {showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}</IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  error={Boolean(touched.phone && errors.phone)}
                  fullWidth
                  helperText={touched.phone && errors.phone || 'Потребуется подтверждение номера телефона' }
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
                  error={Boolean(touched.city && errors.city)}
                  helperText={touched.city && errors.city || 'Голосовать можно только за проекты города, указанного при регистрации. Изменить нельзя!'}
                  id="outlined-select-currency-native"
                  fullWidth
                  select
                  focused
                  value={values.city}
                  SelectProps={{
                    native: true,
                  }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="city"
                  margin="normal"
                  variant="outlined"
                  label="Ваш город"
                >
                  {currencies.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>

                <TextField
                  error={Boolean(touched.age && errors.age)}
                  fullWidth
                  helperText={touched.age && errors.age}
                  label="Возраст"
                  margin="normal"
                  name="age"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="number"
                  value={values.age}
                  variant="outlined"
                />

                <TextField
                  error={Boolean(touched.employ && errors.employ)}
                  helperText={touched.employ && errors.employ}
                  fullWidth
                  select
                  value={values.employ}
                  SelectProps={{
                    native: true,
                  }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="employ"
                  margin="normal"
                  variant="outlined"
                  label="Занятость"
                >
                    <option value={'Свободен'}>Свободен</option>
                    <option value={'Школьник'}>Школьник</option>
                    <option value={'Студент'}>Студент</option>
                    <option value={'Рабочий'}>Рабочий</option>
                </TextField>
                {/* <Box
                  alignItems="center"
                  display="flex"
                  ml={-1}
                >
                  <Checkbox
                    checked={values.policy}
                    color='primary'
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    Я ознакомился с
                    {' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Политикой конфиденциальности
                    </Link>
                  </Typography>
                </Box> */}
                {/* {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>
                    {errors.policy}
                  </FormHelperText>
                )} */}
                <Box my={2}>
                  <Button
                    color="primary"
                    // disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    aria-label='signup'
                    variant="contained"
                  >
                    <PersonAdd fontSize={"small"} className={classes.icon}/> Зарегистрировать
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Имеется аккаунт?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    Войдите
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

export default RegisterView;
