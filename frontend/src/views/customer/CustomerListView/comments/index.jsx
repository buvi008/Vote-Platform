/* eslint-disable */
import React, { useState, useEffect} from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import { useSelector } from "react-redux";
import { url } from 'src/fetchs/url-host';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    position: 'relative',
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));


const CommentsView = () => {
  const classes = useStyles();




  const [comments, setComments] = useState([]);





  const user = useSelector(state => state.user);

  const [clean, setClean] = useState(false);

  useEffect(() => {
    if (!clean && user.user) {
      const getComments = async () => {
        const response = await (await fetch(`http://${url}/comments`, {
          method: 'GET',
          headers: {
            authorization: user.user.accessToken
          }
        })).json();
        if (response.ok) {
          setComments(response.comments)
        }
      }
      getComments();
    }

    return () => setClean(false)
  }, [])

  return (
    <Page
      className={classes.root}
      title='Проекты'
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <Results comments={comments} />
        </Box>
      </Container>
    </Page>
  );
};

export default CommentsView;
