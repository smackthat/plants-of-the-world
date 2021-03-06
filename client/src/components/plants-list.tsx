import { Avatar, Card, CardContent, CardHeader, createStyles, IconButton, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Theme } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React, { useContext, useRef, useState } from "react";
import { IMainContext, MainContext } from "../context/maincontext";
import { Species } from "../interfaces/trefle.interface";
import ImageModal from "./image-modal";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            maxHeight: '100%',
            overflow: 'auto',
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

export default function PlantsList({ region }) {
    const classes = useStyles();

    const a: IMainContext = useContext(MainContext);
    const listRef = useRef(null);
    const { plants } = a;

    const pageSize: number = 20;
    const onPageChange = (page: number) => {
        a.onPageChange(region.regionIdentifier, page)
        console.log(listRef.current);
        listRef.current.scrollTop = 0;
    };

    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageClick = (e) => {
        setSelectedImage(e.target.currentSrc);
    }


    return (
        <Card>
            <CardHeader
                title={"Plants of " + a.region.regionName}>
            </CardHeader>
            <CardContent>

            <ImageModal imgSrc={selectedImage} setImage={setSelectedImage}></ImageModal>

                <List ref={listRef} style={{ maxHeight: '600px', overflow: 'auto' }}>
                    {plants.results.data.map((plant: Species) =>
                        <ListItem key={plant.id}>
                            <ListItemAvatar>
                                <IconButton title="Show bigger image" onClick={(e) => handleImageClick(e)}>
                                    <Avatar style={{ height: '90px', width: '90px' }} src={plant.image_url}></Avatar>
                                </IconButton>
                            </ListItemAvatar>
                            <ListItemText style={{ marginLeft: '5em' }}>
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