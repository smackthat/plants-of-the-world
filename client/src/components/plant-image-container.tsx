import IconButton from '@mui/material/IconButton';
import React, { useState } from 'react';
import { IImage } from '../interfaces/image.interface';
import ImageModal from './image-modal';


interface Props {
    img: IImage,
    element: React.ReactNode
}

/** A generic plant image container that opens the image in a popup when clicked */
export function PlantImageContainer({ element, img }: Props) {

    const [selectedImage, setSelectedImage] = useState<string>(null);

    const handleImageClick = (e) => {

        if (e.target && e.target.currentSrc) {
            setSelectedImage(e.target.currentSrc);
        }
    };

    return (

        <IconButton title={img?.imgSrc ? 'Show bigger image' : null} onClick={(e) => handleImageClick(e)}>
            <ImageModal img={selectedImage} setImage={setSelectedImage}></ImageModal>
            {element}
        </IconButton>
    );

}