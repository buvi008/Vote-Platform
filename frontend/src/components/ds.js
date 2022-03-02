/* eslint-disable */
import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Button,
  ListItem,
  makeStyles
} from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";


const useStyles = makeStyles((theme) => ({
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: 'flex-start',
    letterSpacing: 0,
    padding: '10px 8px',
    textTransform: 'none',
    width: '100%'
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  title: {
    marginRight: 'auto'
  },
  active: {
    color: theme.palette.primary.main,
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium
    },
    '& $icon': {
      color: theme.palette.primary.main
    }
  }
}));

const NavItem = ({
                   className,
                   href,
                   icon: Icon,
                   title,
                   ...rest
                 }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [cityValue, setCity] = React.useState('Город')

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (value) => {
    setCity(value)
    setAnchorEl(null);
  }

  return (
    <ListItem
      className={clsx(classes.item, className)}
      disableGutters
      {...rest}
    >
      <Button
        activeClassName={classes.active}
        className={classes.button}
        aria-label='drop menu'
        component={RouterLink}
        to={title === 'dropmenu' ? false: href}
        aria-controls={title === 'dropmenu' ? "simple-menu" : false} aria-haspopup={title === 'dropmenu' ? "true" : false}
        endIcon={title === 'dropmenu' ? <ArrowDropDownIcon /> : false}
        onClick={title === 'dropmenu' ? handleClick : false}
      >
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleSelect('Хасавюрт')}>Хасавюрт</MenuItem>
          <MenuItem onClick={() => handleSelect('Кизилюрт')}>Кизилюрт</MenuItem>
          <MenuItem onClick={() => handleSelect('Махачкала')}>Махачкала</MenuItem>
        </Menu>
        {Icon && (
          <Icon
            className={classes.icon}
            size="20"
          />
        )}
        <span className={classes.title}>
          {title}
        </span>
      </Button>
    </ListItem>
  );
};

NavItem.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string
};

export default NavItem;
