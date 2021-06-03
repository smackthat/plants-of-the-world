import { createStyles, GridList, GridListTile, makeStyles, Theme } from '@material-ui/core';
import { useContext, useState } from 'react';
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

export default function ImageList() {

    const classes = useStyles();
    const a: IMainContext = useContext(MainContext);

    const [ selectedImage, setSelectedImage] = useState<string>(null);

    const onImgClick = (e) => {
        setSelectedImage(e.target.src);
    };

    const plantImages = Object.keys(a.plant.images)
        .flatMap(imgCategory => a.plant.images[imgCategory])
        .map((img: IPlantImage) => (
            <GridListTile className={classes.gridListTile} key={img.id} cols={1}>
                <img src={img.image_url} alt={''} onClick={(e) => onImgClick(e)}></img>
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