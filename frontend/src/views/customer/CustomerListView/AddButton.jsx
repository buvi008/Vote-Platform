/* eslint-disable */
import React, {useState} from 'react';
import IconButton from "@material-ui/core/IconButton";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import Modal from './Modal';

const AddButton = (props) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(!open);
  };

  return (<>
    <IconButton aria-label='add_variable_project' color={'primary'} onClick={()=>handleClickOpen()}><AddToPhotosIcon/></IconButton>
      {open ? <Modal props={{open: open, id: props.props, func: handleClickOpen}}/> : false}

    </>
  )
}

export default AddButton;
