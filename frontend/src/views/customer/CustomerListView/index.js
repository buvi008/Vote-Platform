/* eslint-disable */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    position: 'relative',
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CustomerListView = () => {
  const classes = useStyles();
  const projects = useSelector(state => state.projects);

  return (
    <Page
      className={classes.root}
      title='Проекты'
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results customers={projects} />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
