import React from "react";
// import './maginfy.css'

import ReactImageMagnify from "react-image-magnify";

const ImageMagnify = (props) => {
    console.log("props",props)
  return (
    <div> 
      <ReactImageMagnify
        {...props}
        {...{
          smallImage: {
            alt: "Wristwatch by Ted Baker London",
            isFluidWidth: true,
            src: props.src,
          },
          largeImage: {
            src: props.src,
            width: 500,
            height: 500,
          },
          enlargedImageContainerStyle: {
            zIndex: "200",
          },
          enlargedImageContainerDimensions: {
            width: "50%",
            height: "50%",
          },
        }}
      />
    </div>
  );
};

export default ImageMagnify;
