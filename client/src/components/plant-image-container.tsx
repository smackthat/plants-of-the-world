import IconButton from "@material-ui/core/IconButton";
import { useState } from "react";
import ImageModal from "./image-modal";


/** A generic plant image container that opens the image in a popup when clicked */
export function PlantImageContainer({ element, img }) {

    const [selectedImage, setSelectedImage] = useState<string>(null);

    const handleImageClick = (e) => {

        if (e.target && e.target.currentSrc) {
            setSelectedImage(e.target.currentSrc);
        }
    }

    return (

        <IconButton title={img?.imgSrc ? "Show bigger image" : null} onClick={(e) => handleImageClick(e)}>
            <ImageModal img={selectedImage} setImage={setSelectedImage}></ImageModal>
            {element}
        </IconButton>
    )

}