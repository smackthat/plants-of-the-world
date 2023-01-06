import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';

const StyledModal = styled(Modal)`
    display: flex;
    align-items: center;
    justify-content: center;
`;

interface Props {
    img: string,
    setImage: React.Dispatch<React.SetStateAction<string>>
}

export default function ImageModal({ img, setImage }: Props) {

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setImage(null);
        setOpen(false);
    };

    useEffect(() => {
        if (img) {
            setOpen(true);
        }
    }, [img]);

    return (

        <StyledModal
            open={open}
            onClose={handleClose}
            closeAfterTransition
        >
            <Fade in={open}>
                <img style={{ maxHeight: '80%', width: 'auto' }} src={img} alt=''></img>
            </Fade>

        </StyledModal>

    );
}