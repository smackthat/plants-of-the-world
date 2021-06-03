import { Button, Card, CardContent, CardHeader, IconButton, Snackbar, Typography } from '@material-ui/core';
import { ArrowBack, Search } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';
import { useContext, useState } from 'react';
import { IMainContext, MainContext } from '../context/maincontext';
import Plant from './plant';
import PlantSearch from './plant-search';
import PlantsList from './plants-list';

export default function Information() {

    const a: IMainContext = useContext(MainContext);
    const { region, plants, plant } = a;

    const [useSearch, setUseSearch] = useState(false);

    console.log('REGION? ', region);

    const handleGoBack = () => {
        a.onRegionChanged(null);
        setUseSearch(false);
    };

    const handleClose = () => {
        a.onErrorHiding();
    };

    let view;


    if (plant !== null) {

        view = <Plant></Plant>;
    }
    else if (useSearch && region === null) {
        view =
            <Card>
                <CardHeader
                    avatar={
                        <IconButton onClick={() => handleGoBack()}>
                            <ArrowBack></ArrowBack>
                        </IconButton>
                    }
                    title="Search for plants">
                </CardHeader>
                <CardContent>
                    <PlantSearch></PlantSearch>
                    <PlantsList></PlantsList>
                </CardContent>
            </Card>;
    }
    else if (region !== null && plants !== null) {
        view = 
            <Card>
                <CardHeader
                    avatar={
                        <IconButton onClick={() => handleGoBack()}>
                            <ArrowBack></ArrowBack>
                        </IconButton>
                    }
                    title={'Plants of ' + a.region.regionName}>
                </CardHeader>
                <CardContent>
                    <PlantsList></PlantsList>
                </CardContent>
            </Card>;
    }
    else {
        view =
            <Card>
                <CardHeader
                    title="Welcome to the world of plants!"
                ></CardHeader>
                <CardContent>
                    <Typography>
                        Please choose a region from the map.
                    </Typography>
    
                    <Typography style={{ marginTop: '2em ' }}>
                        <Button
                            variant="contained"
                            onClick={() => setUseSearch(true)}
                            color="primary"
                            startIcon={<Search />}
                        >
                            use search
                        </Button>
                    </Typography>
    
    
    
                </CardContent>
            </Card>;
    }


        
    return (
        <>
            {a.error &&
            <Snackbar
                open={a.error}
                autoHideDuration={6000}
                onClose={handleClose}>
                <Alert onClose={handleClose} variant="filled" severity="error">
                    Something went wrong, please try again later.
                </Alert>
            </Snackbar>
            }
            {view}
        </>
    );
}