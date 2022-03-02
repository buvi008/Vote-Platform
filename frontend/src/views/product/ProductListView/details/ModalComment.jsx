/* eslint-disable */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { url } from 'src/fetchs/url-host';
import { useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { useSnackbar } from 'notistack';
import Cookies from "universal-cookie/lib";


export default function ModalComment(props) {
  const user = useSelector(state => state.user);
  const cookies = new Cookies();

  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    props.props.handleClickOpen(false)
  };

  const [comment, setComment] = useState('')
  const handleComment = (value) => {
    if (value.length > 500) return
    setComment(value)
  }


  const sendComment = async (e) => {
    e.preventDefault();
    if (comment.length > 0) {
      if (user.isLogin && cookies.get('user')) {
        const response = await (await fetch(`http://${url}/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: cookies.get('sid')
          },
          body: JSON.stringify({
            id: props.props.id,
            message: comment
          })
        })).json();
        if (response.ok) {
          enqueueSnackbar(response.msg, {variant: 'success'});
          handleComment('');
          handleClose();
        } else {
          enqueueSnackbar(response.msg);
        }
      }
    }
  }


  return (
    <div>
      <Dialog open={props.props.open} aria-labelledby="form-dialog-title" maxWidth='md' fullWidth>
        <DialogTitle id="form-dialog-title">Оставить комментарий</DialogTitle>
        <form onSubmit={(e) => sendComment(e)}>
        <DialogContent>
          {/*<DialogContentText>*/}
          {/*  Попробуйте в кратце описать ваше предложение.*/}
          {/*</DialogContentText>*/}
          <TextField
            autoFocus
            id="outlined-textarea"
            label="Комментарий к проекту"
            helperText="*500 символов"
            multiline
            fullWidth
            required
            variant="outlined"
            value={comment}
            onChange={(e) => handleComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button aria-label='cancel' onClick={handleClose} color="primary">
            Отмена
          </Button>
          <Button aria-label='send_feedback' type='submit' color="primary">
            Отправить
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
