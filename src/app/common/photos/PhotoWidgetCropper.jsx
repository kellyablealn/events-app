import React from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const PhotoWidgetCropper = ({setImage, imagePreview}) => {
    
    let cropper;

    const onCropperInit = (component) => {
        cropper = component;
    }

    //const cropperRef = useRef(null);
    
    const onCropImage = () => {
        
        // const imageElement = cropperRef?.current;
        // const cropper = imageElement?.current;
        if ( cropper & typeof cropper.getCroppedCanvas() === 'undefined') {
            return;
        }

        cropper.getCroppedCanvas().toBlob(blob => {
            setImage(blob);
        }, 'image/jpeg');
    };

    return (
        <Cropper
          src={imagePreview}
          style={{ height: 200, width: "100%" }}
          // Cropper.js options
          initialAspectRatio={1}
          preview='.img-preview'
          viewMode={1}
          dragMode='move'
          scalable={true}
          cropBoxMovable={true}
          cropBoxResizable={true}
          onInitialized={onCropperInit}
          guides={false}
          crop={onCropImage}
          ref={cropper}
        />
    )
}

export default PhotoWidgetCropper;