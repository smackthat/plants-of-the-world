import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import React from 'react';

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

    const handleClose = () => {
        setImage(null);
    };

    return (

        <StyledModal
            open={!!img}
            onClose={handleClose}
            closeAfterTransition
        >
            <Fade in={!!img}>
                <img style={{ maxHeight: '80%', width: 'auto' }} src={img} alt=''></img>
            </Fade>

        </StyledModal>

    );
}