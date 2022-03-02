/* eslint-disable */
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Avatar from "@material-ui/core/Avatar";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import styles from "src/assets/jss/components/headerStyle.js";
import { NavLink as RouterLink } from 'react-router-dom';
import Logo from 'src/components/Logo';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(styles);

export default function TopBar(props) {

  const classes = useStyles();

  React.useEffect(() => {
    if (props.changeColorOnScroll) {
      window.addEventListener("scroll", headerColorChange);
    }
    return function cleanup() {
      if (props.changeColorOnScroll) {
        window.removeEventListener("scroll", headerColorChange);
      }
    };
  });

  const headerColorChange = () => {
    const { color, changeColorOnScroll } = props;
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[changeColorOnScroll.color]);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[changeColorOnScroll.color]);
    }
  };

  const { color, rightLinks, leftLinks, brand, fixed, absolute } = props;


  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes[color]]: color,
    [classes.absolute]: absolute,
    [classes.fixed]: fixed
  });
  const brandComponent = <Button component={RouterLink} to={'/'} className={classes.title}><Avatar variant="rounded" style={{marginRight: '8px'}}><Logo/></Avatar><Typography variant='h4'>{brand}</Typography></Button>;
  return (<>
    <AppBar className={appBarClasses}>
      <Toolbar className={classes.container}>
        {leftLinks !== undefined ? brandComponent : null}
        <div className={classes.flex}>
          {leftLinks !== undefined ? (
            <Hidden smDown implementation="css">
              {leftLinks}
            </Hidden>
          ) : (
            brandComponent
          )}
        </div>
        <div>
          <Hidden smDown implementation="css">
            {rightLinks}
          </Hidden>
        </div>
        <Hidden mdUp>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.onMobileNavOpen}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>

    </>
  );
}

TopBar.defaultProp = {
  color: "white"
};

TopBar.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "transparent",
    "white",
    "rose",
    "dark"
  ]),
  rightLinks: PropTypes.node,
  leftLinks: PropTypes.node,
  brand: PropTypes.string,
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
  // this will cause the sidebar to change the color from
  // props.color (see above) to changeColorOnScroll.color
  // when the window.pageYOffset is heigher or equal to
  // changeColorOnScroll.height and then when it is smaller than
  // changeColorOnScroll.height change it back to
  // props.color (see above)
  changeColorOnScroll: PropTypes.shape({
    height: PropTypes.number.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "info",
      "success",
      "warning",
      "danger",
      "transparent",
      "white",
      "rose",
      "dark"
    ]).isRequired
  })
};
