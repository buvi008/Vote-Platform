/* eslint-disable */
import React, {useState} from 'react';
import AwesomeSlider from "react-awesome-slider";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';


const Photo = (props) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setOpenPhoto] = useState(false);


  const images = props.images.map(el => {
    return `./static/images/variants/${el}`
  })

  return (<>
    <AwesomeSlider startup={true} bullets={null}> 
      {
        images.length ? images.map(item => {
          return (<img alt={'card-image'} style={{cursor: 'pointer'}} onClick={() => setOpenPhoto(true)} key={item} data-src={item} />)
        }) : (<img alt={'card-image'} key={Date.now()} data-src={'./static/images/nophoto.png'}/>)
      }
    </AwesomeSlider>
    {isOpen && (
      <Lightbox
        reactModalStyle={{
          overlay: {zIndex: 1100}
        }
        }
        mainSrc={images[photoIndex]}
        nextSrc={images[(photoIndex + 1) % images.length]}
        prevSrc={images[(photoIndex + images.length - 1) % images.length]}
        onCloseRequest={() => setOpenPhoto(false)}
        onMovePrevRequest={() => {
          setPhotoIndex((photoIndex + images.length - 1) % images.length)
        }}
        onMoveNextRequest={() => {
          setPhotoIndex((photoIndex + 1) % images.length)
        }}
      />
    )}
    </>
  )
}


export default Photo;
