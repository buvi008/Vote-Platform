/* eslint-disable */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import 'react-awesome-slider/dist/styles.css';
import buttonStyle from 'src/assets/jss/components/buttonStyle';
import { voteProject } from "./funcs/voteProject";
import FavoriteIcon from '@material-ui/icons/Favorite';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import ModalComment from './details/ModalComment';
import ReadMoreReact from 'read-more-react';
import ShareButton from "./details/Share";

import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles, IconButton
} from '@material-ui/core';
import Photo from "./details/photo";
import {useDispatch, useSelector} from "react-redux";
import FirstModal from 'src/components/firstModal';
import * as ACTION_PROJECT from 'src/redux/reducers/actions/action-projects';
import { useSnackbar } from 'notistack';
import Cookies from "universal-cookie/lib";



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  buttonPrimary: buttonStyle.primary,
}));

const ProductCard = ({ className, product, project, ...rest }) => {
  const classes = useStyles();

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [firstModal, setFirstModal] = useState(false);
  const handleFirstModal = (bool) => setFirstModal(bool);
  const { enqueueSnackbar } = useSnackbar();
  const cookies = new Cookies();


  const handleClickVote = async (data) => {
    if (user.isLogin && cookies.get('user')) {
      const accept = confirm(`Вы уверены, что хотите проголосовать за вариант ${data.nameProject}`);
      if (accept) {
        const response = await voteProject(cookies.get('user').accessToken, data.idVariant, data.idProject);
        if (response.ok) {
          dispatch(ACTION_PROJECT.ADD_LIKE({idProject: data.idProject, idVariant: data.idVariant}))
          enqueueSnackbar(response.msg, { variant: 'success' })
        } else {
          enqueueSnackbar(response.msg)
        }
      }
    } else {
      handleFirstModal(true)
    }
  }


  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (value) => {
    if (user.isLogin) {
      setOpen(value);
    } else {
      handleFirstModal(true);
    }
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="center"
          mb={2}
        >
          <Photo images={product.images}/>
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {project.name}
        </Typography>
        <Box align={'center'}>
        <Typography
          color="textPrimary"
          variant="caption"
        >
          {product.nameVariant}
        </Typography></Box>
        <Box align={'center'}>
            <ReadMoreReact text={product.infoText}
              min={80}
              ideal={100}
              max={200}
              readMoreText="Читать далее..."
              />
        </Box>
        {/*<Typography*/}
        {/*  align="right"*/}
        {/*  color="textPrimary"*/}
        {/*  variant="body1"*/}
        {/*>*/}
        {/*  {project.address}*/}
        {/*</Typography>*/}
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={1}>
        <Grid
          container
          justify="space-between"
          spacing={2}
        >
          <Grid
            className={classes.statsItem}
            item
            title={`Количество голосов`}
          >
            <IconButton
              // className={classes.buttonPrimary}
              aria-label='Vote Project'
              color='primary'
              onClick={() => handleClickVote({
                idVariant: product._id,
                idProject: project.id,
                nameProject: project.name,
              })}
              title='Проголосовать за проект'
              // variant="contained"
            >
              <FavoriteIcon />
            </IconButton>
            <Typography
              color="textSecondary"
              display="inline"
              variant="h4"
            >
              {product.count}
            </Typography>
            {/* <StatPopover votesCount={createdAt(product.createdAt)}/> */}
            {/*<ThumbUpIcon*/}
            {/*  className={classes.statsIcon}*/}
            {/*  color="action"*/}
            {/*  color='primary'*/}
            {/*/>*/}

          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            <IconButton
              color='primary'
              aria-label='feedback'
              title='Оставить отзыв'
              onClick={() => handleClickOpen(true)}
            >
                <EmojiObjectsIcon />
            </IconButton>
              {open ? <ModalComment props={{open: open, handleClickOpen, id: product._id}}/> : false}
            <ShareButton project={project}/>

            {/*<Typography*/}
            {/*  color="textSecondary"*/}
            {/*  display="inline"*/}
            {/*  variant="body2"*/}
            {/*>*/}
            {/*  {product.totalDownloads}*/}
            {/*  {' '}*/}
            {/*  Голосов*/}
            {/*</Typography>*/}
          </Grid>
        </Grid>
      </Box>
      {firstModal ? <FirstModal props={{open: firstModal, handleFirstModal}} /> : false}
    </Card>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default ProductCard;
