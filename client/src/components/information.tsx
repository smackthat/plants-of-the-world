import { Avatar, Button, Card, CardContent, CardHeader, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Pagination from "@material-ui/lab/Pagination";
import React, { useContext, useState } from "react";
import { IMainContext, MainContext } from "../context/maincontext";
import { Species } from "../interfaces/trefle.interface";

export default function Information() {

    const a: IMainContext = useContext(MainContext);
    const { region, plants } = a;

    const pageSize: number = 20;
    const onPageChange = (page: number) => {
        a.onPageChange(region.regionIdentifier, page)
    };

    console.log('REGION? ', region);

    if (region !== null && plants !== null) {
        return (
            <Card>
                <CardHeader
                    title={"Plants of " + a.region.regionName}>
                </CardHeader>
                <CardContent>

                    <List style={{ maxHeight: '600px', overflow: 'auto' }}>
                        {plants.results.data.map((plant: Species) =>
                            <ListItem key={plant.id}>
                                <ListItemAvatar>
                                    <Avatar style={{ height: '90px', width: '90px' }} src={plant.image_url}></Avatar>
                                </ListItemAvatar>
                                <ListItemText style={{ marginLeft: '5em' }}>
                                    {plant.common_name ?? plant.scientific_name}
                                </ListItemText>
                            </ListItem>
                        )}

                    </List>
                    <Pagination
                        page={plants.page}
                        count={Math.ceil(plants.results.meta.total / pageSize)}
                        onChange={(e, page) => onPageChange(page)}
                        color="primary"
                    ></Pagination>

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