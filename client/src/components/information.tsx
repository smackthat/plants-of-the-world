import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { IMainContext, MainContext } from "../context/maincontext";
import PlantsList from "./plants-list";

export default function Information() {

    const a: IMainContext = useContext(MainContext);
    const { region, plants } = a;

    console.log('REGION? ', region);

    if (region !== null && plants !== null) {
        return (
            <PlantsList
            region={region}
            ></PlantsList>
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