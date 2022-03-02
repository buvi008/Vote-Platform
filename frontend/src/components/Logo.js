/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';


const flags = {
  Дагестан: {
    alt: 'dagestan',
    src: 'dagestan.png'
  },
  Хасавюрт: {
    alt: 'khasavyurt',
    src: 'khasavyurt.png'
  },
  Махачкала: {
    src: 'mahachkala.png'
  },
  Кизилюрт: {
    src: 'kizilyurt.png'
  },
  Дербент: {
    src: 'derbent.png'
  },
  Каспийск: {
    src: 'kaspiysk.png'
  },
  ДагОгни: {
    src: 'dagogni.png'
  }
}



const Logo = (props) => {

  const city = useSelector(state => state.city);
  const logo = city.replace(/\s/gmi, '')

  return (
    <img
      alt="Logo"
      id='logo'
      src={`/static/flags/${flags[logo] ? flags[logo].src : flags['Дагестан'].src}`}
      {...props}
    />
  );
};

export default Logo;
