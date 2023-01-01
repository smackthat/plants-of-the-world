import { createStyles, GridList, GridListTile, makeStyles, Theme } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useContext, useState } from 'react';
import styled from 'styled-components';
import { IMainContext, MainContext } from '../context/maincontext';
import ImageModal from './image-modal';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },
        gridList: {
            width: 540,
            height: 400,
        },
        gridListTile: {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    }),
);

interface IPlantImage {
    id?: number;
    image_url?: string;
    copyright?: string | null
}

const ImageTile = ({ img, onImgClick }: { img: IPlantImage, onImgClick: (e: any) => void }) => {
    const [loaded, setLoaded] = useState<boolean>(false);

    const handleImageLoaded = () => setLoaded(true);

    return (
        <>
            {!loaded && <Skeleton variant='rect' animation='wave' height={150} />}
            <StyledImageTile onLoad={handleImageLoaded} style={!loaded ? { display: 'none' } : { display: 'block' }} src={img.image_url} alt={''} onClick={(e) => onImgClick(e)}></StyledImageTile>
        </>
    );
};

const StyledImageTile = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export default function ImageList() {

    const classes = useStyles();
    const a: IMainContext = useContext(MainContext);

    const [selectedImage, setSelectedImage] = useState<string>(null);

    const onImgClick = (e) => {
        setSelectedImage(e.target.src);
    };

    const plantImages = Object.keys(a.plant.images)
        .flatMap(imgCategory => a.plant.images[imgCategory])
        .map((img: IPlantImage) => (
            <GridListTile className={classes.gridListTile} key={img.id} cols={1}>
                <ImageTile img={img} onImgClick={onImgClick} />
            </GridListTile>
        ));

    return (

        <div className={classes.root}>
            <GridList cellHeight={150} className={classes.gridList} cols={3}>
                {plantImages}
            </GridList>
            <ImageModal img={selectedImage} setImage={setSelectedImage}></ImageModal>
        </div>

    );
}