/*eslint-disable*/
import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Button,
  ListItem,
  makeStyles
} from '@material-ui/core';
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {useDispatch, useSelector} from "react-redux";
import * as ACTION_USER from "../../../redux/reducers/actions/action-user";
import * as ACTION_CITY from '../../../redux/reducers/actions/action-city';
import * as ACTION_PROJECT from '../../../redux/reducers/actions/action-projects';
import { logout } from './logout/logout';
import { getData } from 'src/fetchs/get_data';
import Cookies from 'universal-cookie';
import TransitionsModal from "../../../components/Links";

const useStyles = makeStyles((theme) => ({
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  nested: {
    paddingLeft: theme.spacing(4)
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
    marginRight: 'auto',
    textAlign: 'left'
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

  const cookies = new Cookies();
  const dispatch = useDispatch();

  const user = useSelector(state => state.user)

  const classes = useStyles();

  switch (title) {
    case 'null': return
    case 'dropcity':
      const city = useSelector(state => state.city);

      const [open, setOpen] = React.useState(false);
      const handleClick = () => setOpen(!open);
      const handleCity = async (value) => {
        setOpen(!open);
        dispatch(ACTION_CITY.SELECT_CITY(value));
        localStorage.setItem('city', value);
        const response = await getData(value);
        if (response.ok) {
          dispatch(ACTION_PROJECT.GET_PROJECTS(response.projects));
        }
      }


      return (<>
          <Button aria-controls="simple-menu" aria-haspopup="true"
                  className={classes.button}
                  aria-label='city'
                  endIcon={open ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
                  onClick={handleClick}>
            {Icon && (
              <Icon
                className={classes.icon}
                size="20"
              />
            )}
            <span className={classes.title}>
          {city}
        </span>
          </Button>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding style={{height: '300px', overflow: 'auto'}}>
              {["Махачкала","Хасавюрт","Дербент","Каспийск","Кизляр","Кизилюрт","Буйнакск","Даг Огни","Избербаш","Южно-Сухокумск","Агульский район","Акушинский район",
          "Ахвахский район","Ахтынский район","Бабаюртовский район","Ботлихский район","Буйнакский район","Гергебильский район","Гумбетовский район","Гунибский район",
          "Дахадаевский район","Дербентский район","Докузпаринский район","Казбековский район","Кайтагский район","Карабудахкентский район","Каякентский район"
          ,"Кизилюртовский район","Кизлярский район","Кулинский район","Кумторкалинский район","Курахский район","Лакский район","Левашинский район","Магарамкентский район",
          "Новолакский район","Ногайский район","Рутульский район","Сергокалинский район","Сулейман-Стальский район","Табасаранский район","Тарумовский район",
          "Тляратинский район","Унцукульский район","Хасавюртовский район","Хивский район","Хунзахский район","Цумадинский район","Цунтинский район","Бежтинский участок",
          "Чародинский район","Шамильский район"].map(item => {
                return (
                  <ListItem
                    button
                    className={clsx(classes.item,classes.nested, className)}
                    disableGutters
                    onClick={() => handleCity(item)}
                    {...rest}
                    key={item}
                  >
                    <Button
                      aria-label='city'
                      className={classes.button}
                    >
                      {Icon && (
                        <LocationCityIcon
                          className={classes.icon}
                          size="20"
                        />
                      )}
                      <span className={classes.title}>
          {item}
        </span>
                    </Button>
                  </ListItem>
                )})}
            </List>
          </Collapse>
          </>
      )
    case 'dropcategory':
      const [categoryValue, setCategory] = React.useState(localStorage.getItem('category') ?? 'Категория')

      const [openCat, setOpenCat] = React.useState(false);
      const handleClickCat = () => setOpenCat(!openCat);
      const handleCategory = (value) => {
        setOpenCat(!openCat)
        setCategory(value)
        localStorage.setItem('category', value)
      }


      return ( <>
          <Button aria-controls="simple-menu" aria-haspopup="true"
                  className={classes.button}
                  aria-label='category'
                  endIcon={openCat ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
                  onClick={handleClickCat}>
            {Icon && (
              <Icon
                className={classes.icon}
                size="20"
              />
            )}
            <span className={classes.title}>
          {categoryValue}
        </span>
          </Button>
          <Collapse in={openCat} timeout="auto" unmountOnExit id={'category'}>
            <List component="div" disablePadding>
              {['Промышленность', 'Экономика', 'Спорт', 'Образование', 'Инвестиции','Стратегия и развитие города',
                'Приоритетные проекты', 'Комфортная городская среда'].map(item => {
                return (
                  <ListItem
                    button
                    className={clsx(classes.item,classes.nested, className)}
                    disableGutters
                    onClick={() => handleCategory(item)}
                    {...rest}
                    key={item}
                  >
                    <Button
                      aria-label='category'
                      className={classes.button}
                    >
                      {Icon && (
                        <ArrowRightIcon
                          className={classes.icon}
                          size="20"
                        />
                      )}
                      <span className={classes.title}>
          {item}
        </span>
                    </Button>
                  </ListItem>
                )})}
            </List>
          </Collapse>
        </>
      )
    
    case 'dropbusiness':
      const [openBus, setOpenBus] = React.useState(false);
      const handleClickBus = () => setOpenBus(!openBus);
        return ( <>
          <Button aria-controls="simple-menu" aria-haspopup="true"
                  className={classes.button}
                  aria-label='business'
                  endIcon={openBus ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
                  onClick={handleClickBus}>
            {Icon && (
              <Icon
                className={classes.icon}
                size="20"
              />
            )}
            <span className={classes.title}>
          {'Бизнес'}
        </span>
          </Button>
          <Collapse in={openBus} timeout="auto" unmountOnExit id={'business'}>
            <List component="div" disablePadding>
              {['Рестораны','Гостиницы','Бытовая и орг. техника',
            'Хоз. товары', 'Одежда'].map(item => {
                return (
                  <ListItem
                    button
                    className={clsx(classes.item,classes.nested, className)}
                    disableGutters
                    {...rest}
                    onClick={handleClickBus}
                    key={item}
                    disabled
                  >
                    <Button
                      aria-label='business'
                      className={classes.button}
                    >
                      {Icon && (
                        <ArrowRightIcon
                          className={classes.icon}
                          size="20"
                        />
                      )}
                      <span className={classes.title}>
          {item}
        </span>
                    </Button>
                  </ListItem>
                )})}
            </List>
          </Collapse>
        </>
      )

    case 'droplinks':
      const [links, setLinks] = React.useState(false);

      const handleLinks = (bool) => {
        setLinks(bool);
      };

      return (<>
      <ListItem
      className={clsx(classes.item, className)}
          disableGutters
          {...rest}
        >
          <Button
            className={classes.button}
            aria-label='useful links'
            onClick={() => handleLinks(true)}
          >
            {Icon && (
              <Icon
                className={classes.icon}
                size="20"
              />
            )}
            <span className={classes.title}>
          {'Мой Дагестан'}
        </span>
          </Button>
        {links ? <TransitionsModal props={{links, handleLinks}}/> : false}
        </ListItem>
        </>
      )
    case 'logout':

      return (
        <ListItem
          className={clsx(classes.item, className)}
          key={Date.now()}
          disableGutters
          onClick={async () => {
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
          }}
          {...rest}
        >
          <Button
            aria-label='exit'
            className={classes.button}
          >
            {Icon && (
              <Icon
                className={classes.icon}
                size="20"
              />
            )}
            <span className={classes.title}>
          {'Выход'}
        </span>
          </Button>
        </ListItem>
      )
    default:
      return (
        <ListItem
          className={clsx(classes.item, className)}
          disableGutters
          {...rest}
        >
            <Button
              className={classes.button}
              aria-label='nav button'
              component={RouterLink}
              to={href}
            >
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
  }

};

NavItem.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string
};

export default NavItem;
