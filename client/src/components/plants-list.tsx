import { createStyles, List, ListItem, makeStyles, Paper, Theme } from "@material-ui/core";
import React from "react";

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

export default function PlantsList() {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            <ListItem>
            </ListItem>

        </List>

    );
}