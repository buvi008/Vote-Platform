/*eslint-disable*/
import React, {useEffect} from "react";
// react components for routing our app without refresh

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Button from 'src/components/CustomButtons/Button';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { NavLink as RouterLink } from 'react-router-dom';
import SpringModal from 'src/components/Links';

// @material-ui/icons
import { Album} from "@material-ui/icons";
import DnsIcon from '@material-ui/icons/Dns';
import ApartmentIcon from '@material-ui/icons/Apartment';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import GavelIcon from '@material-ui/icons/Gavel';
// core components
import CustomDropdown from "src/components/CustomDropdown/CustomDropdown.js";

import styles from "src/assets/jss/components/headerLinksStyle.js";
import {useDispatch, useSelector} from "react-redux";
import * as ACTION_USER from 'src/redux/reducers/actions/action-user';
import * as ACTION_CITY from 'src/redux/reducers/actions/action-city';
import * as ACTION_PROJECT from 'src/redux/reducers/actions/action-projects';
import { logout } from './logout/logout';
import { getData } from 'src/fetchs/get_data';
import Cookies from 'universal-cookie';


const useStyles = makeStyles(styles);




export default function TopBarLinks(props) {

  const user = useSelector(state => state.user);

  const dispatch = useDispatch();
  const city = useSelector(state => state.city);

  const [categoryValue, setCategory] = React.useState(localStorage.getItem('category') ?? 'Категория');

  const cookies = new Cookies();

  const handleCategory = (value) => {
    setCategory(value);
    localStorage.setItem('category', value);
  };
  const handleCity = async (value) => {
    dispatch(ACTION_CITY.SELECT_CITY(value));
    const response = await getData(value);
    if (response.ok) {
      dispatch(ACTION_PROJECT.GET_PROJECTS(response.projects));
    }
    localStorage.setItem('city', value);
  }

  const [links, setLinks] = React.useState(false);
  const handleLinks = (bool) => {
    setLinks(bool);
  };


  const classes = useStyles();

  useEffect(() => {
    if (cookies.get('user')) {
      props.setNavigation([{title: 'Выход', href: '/'}]);
    } else {
      props.setNavigation([{title: 'Вход', href: '/login'}, {title: 'Регистрция', href: '/register'}]);
    }
    return () => {}
  }, [user])


  return (
    <>
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText={'Навигация'}
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={DnsIcon}
          dropdownList={props.navigation.map(item => {
            if (item.title==='Выход') {
              return (
                <ListItem onClick={async () => {
                  const accept = confirm('Выйти с аккаунта?')
                  if(accept) {
                    try {
                      const res = await logout(user.isLogin, cookies.get('user'));

                      if (res.ok){
                        dispatch(ACTION_USER.LOGOUT());
                        cookies.remove('user');
                        cookies.remove('sid');
                        window.location.href = '/';
                      } else {
                        dispatch(ACTION_USER.LOGOUT());
                        cookies.remove('user');
                        cookies.remove('sid');
                        window.location.href = '/';
                      }
                    } catch (err) {
                      dispatch(ACTION_USER.LOGOUT());
                      cookies.remove('user');
                      cookies.remove('sid');
                      window.location.href = '/';
                    }
                  }
                }} component={RouterLink} to={item.href} key={item.title} className={classes.dropdownLink}>
                  {item.title}
                </ListItem>
              )
            }
            return (<ListItem component={RouterLink} to={item.href} key={item.title} className={classes.dropdownLink}>
              {item.title}
            </ListItem>)})}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText={city}
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          style={{
            height: '400px',
          }}
          buttonIcon={ApartmentIcon}
          dropdownList={["Махачкала","Хасавюрт","Дербент","Каспийск","Кизляр","Кизилюрт","Буйнакск","Даг Огни","Избербаш","Южно-Сухокумск","Агульский район","Акушинский район",
          "Ахвахский район","Ахтынский район","Бабаюртовский район","Ботлихский район","Буйнакский район","Гергебильский район","Гумбетовский район","Гунибский район",
          "Дахадаевский район","Дербентский район","Докузпаринский район","Казбековский район","Кайтагский район","Карабудахкентский район","Каякентский район"
          ,"Кизилюртовский район","Кизлярский район","Кулинский район","Кумторкалинский район","Курахский район","Лакский район","Левашинский район","Магарамкентский район",
          "Новолакский район","Ногайский район","Рутульский район","Сергокалинский район","Сулейман-Стальский район","Табасаранский район","Тарумовский район",
          "Тляратинский район","Унцукульский район","Хасавюртовский район","Хивский район","Хунзахский район","Цумадинский район","Цунтинский район","Бежтинский участок",
          "Чародинский район","Шамильский район"].map(item =>{
            return (<ListItem 
              onClick={() => handleCity(item)} key={item} className={classes.dropdownLink}>
              {item}
            </ListItem>)})}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText={categoryValue}
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Album}
          dropdownList={['Стратегия и развитие города','Приоритетные проекты','Промышленность',
            'Экономика', 'Спорт', 'Образование', 'Комфортная городская среда', 'Инвестиции'].map(item =>{
            return (<ListItem onClick={() => handleCategory(item)} key={item} className={classes.dropdownLink}>
              {item}
            </ListItem>)})}
        >
        </CustomDropdown>
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText={'Бизнес'}
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={AccountBalanceWalletIcon}
          dropdownList={['Рестораны','Гостиницы','Бытовая и орг. техника',
            'Хоз. товары', 'Одежда'].map(item =>{
            return (<ListItem disabled key={item} className={classes.dropdownLink}>
              {item}
            </ListItem>)})}
        >
        </CustomDropdown>
      </ListItem>
      
      <ListItem className={classes.listItem}>
        <Button aria-label='useful_links' className={classes.navLink} onClick={() => handleLinks(true)} color={'transparent'}>Мой Дагестан</Button>
      </ListItem>
    </List>
      {links ? <SpringModal props={{links, handleLinks}}/> : false}
    </>
  );
}
