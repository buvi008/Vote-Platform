/* eslint-disable */
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Popper from '@material-ui/core/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import ShareIcon from '@material-ui/icons/Share';

import {
  FacebookShareButton,
  VKShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  VKIcon,
  FacebookIcon,
  WhatsappIcon,
  TelegramIcon
} from "react-share";
import {Grid, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  share: {
    height: '30px',
    width: '30px',
    borderRadius: '5px',
  },
  sharePadding: {
    margin: '8px',
    marginBottom: '0',
  }
}));


export default function ShareButton(project) {

  const classes = useStyles();

let shareText = `Я проголосовал за один из вариантов реконструкции проекта «${project.project.name}»
по адресу «${project.project.address}»
на мойгород05.рф`

  return (
    <PopupState variant="popper" popupId="demo-popup-popper">
      {(popupState) => (
        <div>
          <IconButton aria-label='share_popper' variant="contained" color="primary" {...bindToggle(popupState)}>
            <ShareIcon />
          </IconButton>
          <Popper {...bindPopper(popupState)} placement="bottom-end" transition style={{zIndex: '100'}}>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                  <Grid
                    container
                    justify="space-between"
                  >
                    <FacebookShareButton aria-label='facebook' className={classes.sharePadding} url={shareText}><FacebookIcon className={classes.share}/></FacebookShareButton>

                    <VKShareButton aria-label='vkontakte' className={classes.sharePadding} url={shareText}><VKIcon className={classes.share}/></VKShareButton>
                    <WhatsappShareButton aria-label='whatsapp' className={classes.sharePadding} url={shareText}><WhatsappIcon className={classes.share}/></WhatsappShareButton>
                    <TelegramShareButton aria-label='telegram' className={classes.sharePadding} url={shareText}><TelegramIcon className={classes.share}/></TelegramShareButton>
                  </Grid>
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
  );
}
