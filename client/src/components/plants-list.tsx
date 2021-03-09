import { Avatar, Card, CardContent, CardHeader, createStyles, IconButton, List, ListItem, ListItemAvatar, ListItemText, makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { useContext, useRef, useState } from "react";
import { IMainContext, MainContext } from "../context/maincontext";
import { IImage } from "../interfaces/image.interface";
import { Species } from "../interfaces/trefle.interface";
import ImageModal from "./image-modal";
import PlantIcon from '../assets/icons/leaves.svg';

const textStyles = makeStyles(() =>
    createStyles({
        primary: {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    })
);


export default function PlantsList({ region }) {

    const textClasses = textStyles();

    const a: IMainContext = useContext(MainContext);
    const listRef = useRef(null);
    const { plants } = a;

    const pageSize: number = 20;
    const onPageChange = (page: number) => {
        a.onPageChange(region.regionIdentifier, page)
        console.log(listRef.current);
        listRef.current.scrollTop = 0;
    };

    const [selectedImage, setSelectedImage] = useState<IImage>(null);
    const handleImageClick = (e) => {
        
        if (e.target && e.target.currentSrc && e.target.classList.length > 0) {
            setSelectedImage({imgSrc: e.target.currentSrc});
        }
    }

    const handleTextClick = (e) => {
        console.log('KLIKKI! ', e);
    } 


    return (
        <Card>
            <CardHeader
                title={"Plants of " + a.region.regionName}>
            </CardHeader>
            <CardContent>

            <ImageModal img={selectedImage} setImage={setSelectedImage}></ImageModal>

                <List ref={listRef} style={{ maxHeight: '600px', overflow: 'auto' }}>
                    {plants.results.data.map((plant: Species) =>
                        <ListItem key={plant.id}>
                            <ListItemAvatar>
                                <IconButton title="Show bigger image" onClick={(e) => handleImageClick(e)}>
                                    <Avatar style={{ height: '90px', width: '90px' }} src={plant.image_url}>
                                        <img src={PlantIcon} alt='P'></img>
                                    </Avatar>
                                </IconButton>
                            </ListItemAvatar>
                            <ListItemText className={textClasses.primary} onClick={(e) => handleTextClick(e)} style={{ marginLeft: '5em' }}>
                                {plant.common_name ?? plant.scientific_name}
                            </ListItemText>
                        </ListItem>
                    )}

                </List>
                <Pagination
                    siblingCount={2}
                    page={plants.page}
                    count={Math.ceil(plants.results.meta.total / pageSize)}
                    onChange={(e, page) => onPageChange(page)}
                    color="primary"
                ></Pagination>

            </CardContent>
        </Card>

    );
}