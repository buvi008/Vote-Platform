/* eslint-disable */
import React, {useEffect, useState} from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  Lock as LockIcon,
  UserPlus as UserPlusIcon,
} from 'react-feather';
import NavItem from './NavItem';
import AppsIcon from '@material-ui/icons/Apps';
import ApartmentIcon from '@material-ui/icons/Apartment';
import FilterListIcon from '@material-ui/icons/FilterList';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LinkIcon from '@material-ui/icons/Link';
import {useSelector} from "react-redux";
import Cookies from 'universal-cookie';


const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    margin: '1.25rem 0px',
    width: 64,
    height: 64
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const user = useSelector(state => state.user);

  const [items, setItems] = useState([
    {
      href: '/',
      icon: AppsIcon,
      title: 'Главная'
    },
    {
      title: 'dropcity',
      icon: ApartmentIcon
    },
    {
      icon: FilterListIcon,
      title: 'dropcategory'
    },
    {
      href: '/login',
      icon: LockIcon,
      title: 'Вход'
    },
    {
      href: '/register',
      icon: UserPlusIcon,
      title: 'Регистрация'
    },
    {
      href: '/',
      icon: ExitToAppIcon,
      title: 'logout'
    }
  ])

  const classes = useStyles();
  const location = useLocation();
  const cookies = new Cookies();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);



  useEffect(() => {
    if (cookies.get('user')) {
      setItems([ { href: '/', icon: AppsIcon, title: 'Главная' }, { title: 'dropcity', icon: ApartmentIcon }, { icon: FilterListIcon, title: 'dropcategory' }, { icon: AccountBalanceWalletIcon, title: 'dropbusiness'}, { icon: LinkIcon, title: 'droplinks'}, { href: '/', icon: ExitToAppIcon, title: 'logout' } ])
    } else {
      setItems([ { href: '/', icon: AppsIcon, title: 'Главная' }, { title: 'dropcity', icon: ApartmentIcon }, { icon: FilterListIcon, title: 'dropcategory' }, { icon: AccountBalanceWalletIcon, title: 'dropbusiness'}, { icon: LinkIcon, title: 'droplinks'}, { href: '/login', icon: LockIcon, title: 'Вход' }, { href: '/register', icon: UserPlusIcon, title: 'Регистрация' } ])
    }
    return () => {}
  }, [user])

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={''}
          to={window.location.pathname}
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {cookies.get('user') ? cookies.get('user').name : 'Гость'}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) =>
          {
            return ( <NavItem
              href={item.href}
              key={Math.random()}
              title={item.title}
              icon={item.icon}
            />
          )})}
        </List>
      </Box>

    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
