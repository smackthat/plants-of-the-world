import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import React, { useCallback, useContext, useEffect } from "react";
import { IMainContext, MainContext } from "../context/maincontext";

export default function Information() {

    const a: IMainContext = useContext(MainContext);   

    return (
        <Card>
            <CardHeader
                title="Plant info"
            ></CardHeader>
            <CardContent>
                <Typography>
                    This contains some generic info. Plants are fun.
                </Typography>
                <Typography>
                    {a.region.regionName}! {a.region.regionIdentifier}
                </Typography>
            </CardContent>
        </Card>
    )

}