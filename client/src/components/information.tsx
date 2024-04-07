import { ArrowBack, Search } from '@mui/icons-material';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import { useContext, useState } from 'react';
import { IMainContext, MainContext } from '../context/maincontext';
import Plant from './plant';
import PlantSearch from './plant-search';
import PlantsList from './plants-list';
import PlantsFilters from './plants-filters';
import Box from '@mui/material/Box';
import { DrawerViewContext } from './main';
import ToggleableCardTitle from './toggleable-card-title';
import { Footer } from './footer';

export default function Information() {

    const a: IMainContext = useContext(MainContext);
    const { drawerView, toggleDrawer } = useContext(DrawerViewContext);
    const { region, plant } = a;

    const [useSearch, setUseSearch] = useState(false);

    console.log('REGION? ', region);

    const handleGoBack = () => {
        toggleDrawer(false);
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
            <Card elevation={drawerView ? 0 : 2}>
                <CardHeader
                    avatar={
                        <IconButton onClick={() => handleGoBack()}>
                            <ArrowBack></ArrowBack>
                        </IconButton>
                    }
                    title={<ToggleableCardTitle title="Search for plants" />}>
                </CardHeader>
                <CardContent>
                    <PlantSearch></PlantSearch>
                    <PlantsList></PlantsList>
                </CardContent>
            </Card>;
    }
    else if (region !== null) {
        view =
            <Card elevation={drawerView ? 0 : 2}>
                <CardHeader
                    avatar={
                        <IconButton onClick={() => handleGoBack()}>
                            <ArrowBack></ArrowBack>
                        </IconButton>
                    }
                    title={<ToggleableCardTitle title={'Plants of ' + a.region.regionName} />}>
                </CardHeader>
                <CardContent sx={{ p: 0}}>
                    <PlantsFilters />
                    <PlantsList />
                </CardContent>
            </Card>;
    }
    else {
        view =
            <Card elevation={drawerView ? 0 : 2}>
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
                    anchorOrigin={{ vertical: drawerView ? 'top' : 'bottom', horizontal: 'center' }}
                    onClose={handleClose}>
                    <Alert onClose={handleClose} variant="filled" severity="error">
                        Something went wrong, please try again later.
                    </Alert>
                </Snackbar>
            }
            {drawerView ? (
                <Box sx={{
                    position: 'absolute',
                    top: -200,
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                    visibility: 'visible',
                    right: 0,
                    left: 0,
                }}>
                    {view}
                    <Footer />
                </Box>
            ) : (
                <>
                    {view}
                </>
            )}


        </>
    );
}
