/* eslint-disable */
import React from 'react';
import {
  Box,
  Container,
  Button,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import { Link } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    // height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    marginTop: '120px'
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  }
}));

const NotFoundView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="404"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="md">
          <Typography
            align="center"
            color="textPrimary"
            variant="h1"
          >
            404: Нет страницы, которую вы ищете <MoodBadIcon style={{verticalAlign: 'middle'}} fontSize={'large'}/>
          </Typography>
          <Typography
            align="center"
            color="textPrimary"
            variant="subtitle2"
          >
            Вы либо пробовали какой-то тенистый маршрут, либо попали сюда по ошибке.
            Что бы это ни было, попробуйте использовать навигацию
          </Typography>
          <Box textAlign="center">
            <img
              alt="Under development"
              className={classes.image}
              src="/static/images/undraw_page_not_found_su7k.svg"
            />
          </Box>
          <Box textAlign="center">
            <Link to={'/'}>
            <Button
              aria-label='to home'
              color={'primary'}
              variant="contained"
            >
              Вернуться домой
            </Button></Link>
          </Box>

        </Container>
      </Box>
    </Page>
  );
};

export default NotFoundView;
