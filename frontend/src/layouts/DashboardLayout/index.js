/* eslint-disable */
import React, {useEffect, useState} from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import NavBar from './NavBar';
import TopBar from './TopBar';
import TopBarLinks from "./NavBar/TopBarLinks";

import Cookies from "universal-cookie";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const DashboardLayout = (...rest) => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const cookies = new Cookies();

  const [navigation, setNavigation] = useState([])
  useEffect(() => {
    if (cookies.get('user')) {
      setNavigation([{title: 'Выход', href: '/'}])
    } else {
      setNavigation([{title: 'Вход', href: '/login'}, {title: 'Регистрция', href: '/register'}])
    }
    return () => {}
  }, [])

  return (

    <div className={classes.root}>
      <TopBar
        color="primary"
        brand="Мой Город"
        rightLinks={<TopBarLinks
          navigation={navigation}
          setNavigation={setNavigation}
        />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        onMobileNavOpen={() => {
          setMobileNavOpen(true)
        }}
        {...rest}
      />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
