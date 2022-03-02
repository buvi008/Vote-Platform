/* eslint-disable */
import 'react-perfect-scrollbar/dist/css/styles.css';
import React, {useEffect, useState} from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import theme from 'src/theme';
import routes from 'src/routes';
import 'src/assets/css/normalize.css';
import {useDispatch, useSelector} from "react-redux";
import * as ACTION_TYPES from 'src/redux/reducers/actions/action-projects';
import {getData} from "./fetchs/get_data";
import {getUser} from "./fetchs/get_user";
import Cookies from "universal-cookie";
import * as ACTION_USER from 'src/redux/reducers/actions/action-user';  
import FirstModal from 'src/components/firstModal';

const App = () => {
  const dispatch = useDispatch();

  const cookies = new Cookies();

  const routing = useRoutes(routes);
  const [cleanupFunction, setClean] = useState(false);

  const [firstModal, setFirstModal] = useState(false);
  const handleFirstModal = (bool) => setFirstModal(bool);
  
  const city = useSelector(state => state.city);

  useEffect(() => {
    async function fetchData() {
      const result = await getData(city);
      if (result.ok) {
        dispatch(ACTION_TYPES.GET_PROJECTS(result.projects));
      }
    }
    if (!cleanupFunction) {
      fetchData();
    };

    const user = cookies.get('user');
    async function fetchUser() {
      const response = await getUser(user);

      if (response.ok) {
        dispatch(ACTION_USER.IS_LOGIN(response.user));
        if (!cleanupFunction) {
          cookies.set('user', response.user, {path: '/', expires: new Date(response.expires)});
          cookies.set('sid', response.user.accessToken, {path: '/', expires: new Date(response.expires)});
          cookies.set('date', new Date());
        }
      } else {
        cookies.remove('user');
        cookies.remove('sid');
        dispatch(ACTION_USER.LOGOUT());
      }
    }

    if (user) {
      if (user.id && user.accessToken && user.name && user.city) fetchUser();
      else {
        cookies.remove('user');
        cookies.remove('sid');
        dispatch(ACTION_USER.LOGOUT());
      }
    } else {
      if (!cleanupFunction) handleFirstModal(true);
    }

    return () => setClean(true);
  }, []);


  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <FirstModal props={{open: firstModal, handleFirstModal}}/>
      {routing}
    </ThemeProvider>
  );
};

export default App;
