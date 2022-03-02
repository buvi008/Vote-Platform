/* eslint-disable */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: '60vh',
    overflowY: 'auto',
  },
}));

export default function TransitionsModal(props) {
  const { links, handleLinks } = props.props;
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={links}
        onClose={() => handleLinks(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 600,
        }}
      >
        <Fade in={links}>
          <div className={classes.paper}>
            <div className="bannergroup">

              <div className="banneritem">
                <a href="http://mintransdag.ru/prioritetnyy-proekt-bezopasnye-i-kachestvennye-dorogi-" target="_blank"
                   title="Национальный проект «Безопасные и качественные автомобильные дороги»">
                  <img draggable='false' src="http://www.e-dag.ru/images/banners/2442233.jpg"
                       alt="Национальный проект «Безопасные и качественные автомобильные дороги»"/>
                </a>
              </div>
              <div className="banneritem">
                <a href="http://www.e-dag.ru/component/banners/click/24.html" target="_blank" title="Бережливое Правительство">
                  <img draggable='false' src="http://www.e-dag.ru/images/banners/BerejPrav.jpg" alt="Бережливое Правительство"/>
                </a>
              </div>
              <div className="banneritem">
                <a href="http://pravo.minjust.ru/" target="_blank" title="Правовой портал Минюста России">
                  <img draggable='false' src="http://www.e-dag.ru/images/banners/pravominust2.png" alt="Правовой портал Минюста России"/>
                </a>
              </div>
              <div className="banneritem">
                <a href="http://www.e-dag.ru/component/banners/click/28.html" target="_blank" title="Мы вместе">
                  <img draggable='false' src="http://www.e-dag.ru/images/banners/vmes.jpg" alt="Мы вместе" width="250" height="150"/>
                </a>
              </div>
              <div className="banneritem">
                <a href="http://www.e-dag.ru/component/banners/click/11.html" target="_blank"
                   title="Официальный интернет-портал правовой информации">
                  <img draggable='false' src="http://www.e-dag.ru/images/banners/oippi.png"
                       alt="Официальный интернет-портал правовой информации"/>
                </a>
              </div>
              <div className="banneritem">
                <a href="http://www.e-dag.ru/component/banners/click/10.html" target="_blank"
                   title="Портал государственных и муниципальных услуг">
                  <img draggable='false' src="http://www.e-dag.ru/images/banners/banner_pgu_245x97.gif"
                       alt="Портал государственных и муниципальных услуг"/>
                </a>
              </div>
              <div className="banneritem">
                <a href="http://dagtorgi.ru/" target="_blank"
                   title="Официальный сайт РЕСПУБЛИКИ ДАГЕСТАН для размещения информации о размещении заказов">
                  <img draggable='false' src="http://www.e-dag.ru/images/banners/banner_dagtorgi.jpg"
                       alt="Официальный сайт РЕСПУБЛИКИ ДАГЕСТАН для размещения информации о размещении заказов"/>
                </a>
              </div>
              <div className="banneritem">
                <a href="http://www.e-dag.ru/component/banners/click/14.html" target="_blank"
                   title="Инвестиционный портал Республики Дагестан">
                  <img draggable='false' src="http://www.e-dag.ru/images/banners/Investportal.jpg"
                       alt="Инвестиционный портал Республики Дагестан" width="250" height="90"/>
                </a>
              </div>
              <div className="banneritem">
                <a href="http://www.e-dag.ru/component/banners/click/26.html" target="_blank" title="МОЛОДЕЖНЫЙ КАДРОВЫЙ РЕЗЕРВ">
                  <img draggable='false' src="http://www.e-dag.ru/images/banners/ya_prof.png" alt="МОЛОДЕЖНЫЙ КАДРОВЫЙ РЕЗЕРВ" width="250"
                       height="90"/>
                </a>
              </div>
              <div className="banneritem">
                <a href="http://www.e-dag.ru/component/banners/click/27.html" target="_blank" title="Портал Мой Дагестан">
                  <img draggable='false' src="http://www.e-dag.ru/images/banners/mydag264x842.gif" alt="Портал Мой Дагестан"/>
                </a>
              </div>

            </div>

          </div>
        </Fade>
      </Modal>
    </div>
  );
}
