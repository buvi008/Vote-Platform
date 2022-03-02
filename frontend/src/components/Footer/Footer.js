/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { List, ListItem, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CopyrightIcon from '@material-ui/icons/Copyright';
// @material-ui/icons

import styles from "src/assets/jss/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  return (
    <footer className={footerClasses}>
      <Container maxWidth={false}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a
                href="/"
                className={classes.block}
              >
                Button
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="/"
                className={classes.block}
              >
                About us
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="/"
                className={classes.block}
              >
                Blog
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="/"
                className={classes.block}
              >
                Licenses
              </a>
            </ListItem>
          </List>
        </div>
        <div className={classes.right} id={'copy'}>
          <CopyrightIcon fontSize='small'/>
          <span>2020 Администрация МО ГО 'Город Хасавюрт'</span>
        </div>
      </Container>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool
};
