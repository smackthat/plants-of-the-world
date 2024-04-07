import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Skeleton from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';
import { useContext, useState } from 'react';
import { LazyLoadComponent, trackWindowScroll } from 'react-lazy-load-image-component';
import { IMainContext, MainContext } from '../context/maincontext';
import ImageModal from './image-modal';
import { DrawerViewContext } from './main';

const StyledDiv = styled('div')(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: theme.palette.background.paper,
}));

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
            {!loaded && <Skeleton variant='rectangular' animation='wave' height={150} />}
            <StyledImageTile onLoad={handleImageLoaded} style={!loaded ? { display: 'none' } : { display: 'block' }} src={img.image_url} alt={''} onClick={(e) => onImgClick(e)}></StyledImageTile>
        </>
    );
};

const StyledImageTile = styled('img')`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

function PlantImageList() {

    const a: IMainContext = useContext(MainContext);
    const { drawerView } = useContext(DrawerViewContext);

    const [selectedImage, setSelectedImage] = useState<string>(null);

    const onImgClick = (e) => {
        setSelectedImage(e.target.src);
    };

    const plantImages = Object.keys(a.plant.images)
        .flatMap(imgCategory => a.plant.images[imgCategory])
        .map((img: IPlantImage) => (
            <ImageListItem sx={{ ':hover': { cursor: 'pointer' } }} key={img.id} cols={1}>
                <LazyLoadComponent>
                    <ImageTile img={img} onImgClick={onImgClick} />
                </LazyLoadComponent>
            </ImageListItem>
        ));

    return (

        <StyledDiv>
            <ImageList rowHeight={150} cols={3} sx={{ width: drawerView ? '90vw' : '35vw'}}>
                {plantImages}
            </ImageList>
            <ImageModal img={selectedImage} setImage={setSelectedImage}></ImageModal>
        </StyledDiv>

    );
}

export default trackWindowScroll(PlantImageList);