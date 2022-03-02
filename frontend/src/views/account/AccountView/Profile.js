/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';
import {useSelector} from "react-redux";

const user = {
  avatar: 'https://avatars.githubusercontent.com/u/48009249?s=460&u=f8f593f8f60706a68f51bde8fa6674f1daefc455&v=4',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Djambulat Alibekov',
  timezone: 'GTM-3'
};

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
    margin: 30,
  }
}));

const Profile = ({ className, ...rest }) => {
  const user = useSelector(state => state.user);
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={''}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {user.user.name ?? 'Гость'}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {`${user.user.city ?? 'Город'}`}
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
          aria-label='upload avatar'
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
