import { Card, CardContent, CardHeader, createStyles, List, ListItem, ListItemAvatar, ListItemText, makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { useContext, useRef} from "react";
import { IMainContext, MainContext } from "../context/maincontext";
import { Species } from "../interfaces/trefle.interface";
import { PlantAvatar } from "./plant-avatar";

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

    const handleTextClick = (plantId: number) => {
        a.onPlantSelected(plantId);
    }

    return (
        <Card>
            <CardHeader
                title={"Plants of " + a.region.regionName}>
            </CardHeader>
            <CardContent>

                <List ref={listRef} style={{ maxHeight: '600px', overflow: 'auto' }}>
                    {plants.results.data.map((plant: Species) =>
                        <ListItem key={plant.id}>
                            <ListItemAvatar>
                                <PlantAvatar
                                    img={{ imgSrc: plant.image_url, title: plant.common_name ?? plant.scientific_name }}
                                    size={'80px'}
                                ></PlantAvatar>
                            </ListItemAvatar>
                            <ListItemText className={textClasses.primary} onClick={() => handleTextClick(plant.id)} style={{ marginLeft: '5em' }}>
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