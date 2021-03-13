import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { useState } from "react";
import PlantIcon from '../assets/icons/leaves.svg';
import { IImage } from "../interfaces/image.interface";
import ImageModal from "./image-modal";

/** Plant avatar that opens a bigger image in a modal */
export function PlantAvatar({ img, size }) {

    const [selectedImage, setSelectedImage] = useState<IImage>(null);

    const handleImageClick = (e) => {

        if (e.target && e.target.currentSrc && e.target.classList.length > 0) {
            setSelectedImage({ imgSrc: e.target.currentSrc });
        }
    }
    
    return (

        <IconButton title={img?.imgSrc ? "Show bigger image" : null} onClick={(e) => handleImageClick(e)}>
            <ImageModal img={selectedImage} setImage={setSelectedImage}></ImageModal>
            <Avatar style={{ height: size, width: size }} src={img?.imgSrc}>
                <img src={PlantIcon} title={img?.title} alt='P'></img>
            </Avatar>
        </IconButton>
    )
}