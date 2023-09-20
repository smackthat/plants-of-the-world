import Avatar from '@mui/material/Avatar';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import PlantIcon from '../assets/icons/leaves.svg';
import { IImage } from '../interfaces/image.interface';
import { PlantImageContainer } from './plant-image-container';
import { useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

interface Props {
    img: IImage,
    size: string
}

export function PlantAvatar({ img, size }: Props) {
    const [loaded, setLoaded] = useState<boolean>(false);

    const handleImageLoaded = () => setLoaded(true);

    if (!img.imgSrc) {
        return (
            <Box padding='8px'>
                <Avatar sx={{ height: size, width: size }}>
                    <img src={PlantIcon} title={img?.title} alt='P'></img>
                </Avatar>
            </Box>

        );
    }

    return (
        <>
            {!loaded &&
                <Box paddingX={'8px'}>
                    <Skeleton variant='circular' animation='wave' height={size} width={size} />
                </Box>
            }
            <PlantImageContainer
                element={
                    <LazyLoadComponent>
                        <Avatar sx={{ height: size, width: size, display: loaded ? 'block' : 'none' }} src={img?.imgSrc} imgProps={{ onLoad: handleImageLoaded }}>
                            <img src={PlantIcon} title={img?.title} alt='P'></img>
                        </Avatar>
                    </LazyLoadComponent>
                }
                img={img}
            ></PlantImageContainer>

        </>

    );
}