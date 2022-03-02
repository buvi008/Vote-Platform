/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import Page from 'src/components/Page';
import { url } from 'src/fetchs/url-host';

import CustomerListView from './index';
import CommentsView from 'src/views/customer/CustomerListView/comments/index';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import {Link as RouterLink, Navigate, useNavigate} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  page: {
    // backgroundColor: 'transparent',
    position: 'relative',
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

export default function LabTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState('1');

  const cookies = new Cookies();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const user = useSelector(state => state.user);

  const [clearCheckAdmin, setClearCheckAdmin] = useState(false);
  const [isRoot, setRoot] = useState(true);

  useEffect(() => {
    const isAdmin = async () => {
      if(cookies.get('user')) {
        const response = await (await fetch(`http://${url}/user/dontsudo`, {
          method: 'POST',
          headers: {
            authorization: cookies.get('user').accessToken,
          }
        }))
        if (response.ok) {
          setRoot(true);
        } else {
          setRoot(false);
        }
      } else {
        setRoot(false);
      }
    }
    if(!clearCheckAdmin) isAdmin();

    return () => {
      setClearCheckAdmin(true);
    }
  }, [user])

  return (<>
    {isRoot ?
    <Page
      className={classes.page}
      title='Проекты'
    >
    <div className={classes.root}>
      <TabContext value={value}>
        <AppBar position="static" style={{backgroundColor: 'transparent'}}>
          <TabList onChange={handleChange} aria-label="simple tabs" indicatorColor="primary" textColor="primary" centered>
            <Tab label="Проекты" value="1" />
            <Tab label="Комментарии" value="2" />
            {/* <Tab label="Item Three" value="3" /> */}
          </TabList>
        </AppBar>
        <TabPanel style={{padding: '0px'}} value="1"><CustomerListView /></TabPanel>
        <TabPanel style={{padding: '0px'}} value="2"><CommentsView /></TabPanel>
      </TabContext>
    </div>
    </Page> : <Navigate to={'/'}/>}
  </>);
}
