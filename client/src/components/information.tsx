import { Avatar, Button, Card, CardContent, CardHeader, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import React, { useContext } from "react";
import { IMainContext, MainContext } from "../context/maincontext";
import { Species } from "../interfaces/trefle.interface";

export default function Information() {

    const a: IMainContext = useContext(MainContext);
    const {region, plants} = a;

    console.log('REGION? ', region);

    if (region !== null && plants !== null) {
        return (
            <Card>
                <CardHeader
                    title={"Plants of " + a.region.regionName}>
                </CardHeader>
                <CardContent>

                    <List style={{maxHeight: '400px', overflow: 'auto'}}>
                        {plants.data.map((plant: Species) => 
                            <ListItem key={plant.id}>
                                <ListItemAvatar>
                                    <Avatar src={plant.image_url}></Avatar>
                                </ListItemAvatar>
                                <ListItemText>
                                    {plant.common_name ?? plant.scientific_name}
                                </ListItemText>
                            </ListItem>
                        )}
                        
                    </List>
                    <Pagination count={Math.ceil(plants.meta.total / plants.data.length)} onChange={(e, page) => a.onPageChange(region.regionIdentifier, page)} color="primary"></Pagination>

                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader
                title="Welcome to the world of plants!"
            ></CardHeader>
            <CardContent>
                <Typography>
                    Please choose a region from the map.
                </Typography>
   
            </CardContent>
        </Card>
    )

}