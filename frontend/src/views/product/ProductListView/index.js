/* eslint-disable */
import React, {useState} from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import ProductCard from './ProductCard';
import Parallax from "../../../components/Parallax/Parallax";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Button from "@material-ui/core/Button";
import {container} from "src/assets/jss/material-kit-react.js";
import Footer from 'src/components/Footer/Footer';
import { Link } from 'react-scroll'
import { useSelector } from "react-redux";
import {ArrowDownward} from "@material-ui/icons";
import LinearProgress from '@material-ui/core/LinearProgress';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    position: 'relative',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  },
  container: {
    zIndex: "12",
    color: "rgb(255,255,255)",
    padding: '8px 11px',
    ...container,
  },
  title: {
    display: "inline-block",
    position: "relative",
  },
  parallaxBox: {
    width: '100%',
    paddingTop: theme.spacing(6)
  },
  scrollButton: {
    padding: '16px 32px',
    boxShadow: '0px 0px 20px #000',
    background: 'rgb(78 115 175 / 60%)',
  },
  shadow: {
    textShadow: '1px 1px 10px #000',
  },
  notFound: {
    width: '100%',
    textAlign: 'center',
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(12),
  },
  icon: {
    marginRight: '8px',
  },
  bottom: {
    margin: '32px',
  },
}));

const ProductList = () => {
  const classes = useStyles();

  const [limitProduct, setLimitProduct] = useState(3);

  const state = useSelector(state => state.projects);
  const city = useSelector(state => state.city);



  return (
    <div>
      <Parallax filter image={'./static/images/background.jpg'}>
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} lg={12} style={{textAlign: 'center'}}>
          <div className="mb-wrap mb-style-3">
					<blockquote>
						<p>Мы готовы принять любой вызов времени и победить.</p>
					</blockquote>
					<div className="mb-attribution">
						<p className="mb-author">Путин В.В</p>
						<span className={classes.shadow}>Президент РФ</span>
						<div className="mb-thumb"></div>
					</div>
				</div>
          </GridItem>
          <Box textAlign="center" className={classes.parallaxBox}>
              <Link
                  activeClass="active"
                    to="section"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={1000}>
                  <Button
                    aria-label='scroll to projects'
                    size="large"
                    rel="noopener noreferrer"
                    color='primary'
                    variant='contained'
                    className={classes.scrollButton}
                >
                  <ArrowDownward fontSize={'small'} className={classes.icon}/> Перейти к проектам
                </Button></Link>
          </Box>
        </GridContainer>
      </div>
    </Parallax>
    <Page
      className={classes.root}
      title="Главная"
    >

      <Container id='section' name='section' maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
            {state.length > 0 ? false : <Box className={classes.notFound}><h2>
              Проектов реконструкции в <span style={{fontSize: '32px'}}>{city}</span> не имеется</h2>
              <LinearProgress className={classes.bottom}/>
            </Box>}
            {state.sort((prev, next) => next.id - prev.id).slice(0, limitProduct).map(item => item.variantId.map((product,i) => (
              <Grid
                item
                key={i}
                lg={4} // 1280+
                md={6} // 960+
                xs={12} // +0
                // xl={3} //1920+
              >
                <ProductCard
                  className={classes.productCard}
                  product={product}
                  project={{name: item.name, address: item.adrProject, id: item._id}}
                />
              </Grid>
            )))}
          </Grid>
        </Box>
        { limitProduct <= state.length-1 ?
          <Box
            mt={3}
            display="flex"
            justifyContent="center"
          >
            <Button aria-label='load more' variant={'outlined'} onClick={() => setLimitProduct(limitProduct + 1)}>
              {/*<AddCircleOutlineIcon fontSize={'medium'} className={classes.icon}/>*/}
              Загрузить еще</Button>
          </Box> : false
        }
      </Container>
    </Page>
    <Footer/></div>
  );
};

export default ProductList;
