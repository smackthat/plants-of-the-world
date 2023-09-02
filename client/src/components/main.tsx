import { Theme, ThemeProvider } from '@mui/material/styles';
import MainContextProvider from '../context/maincontext';
import Grid from '@mui/material/Grid';
import MapboxGlobe from './mapbox-globe';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Information from './information';
import { useState } from 'react';
import { Button, useMediaQuery } from '@mui/material';

interface Props {
    theme: Theme;
}

export default function Main({ theme }: Props) {

    const [open, setOpen] = useState<boolean>(false);

    const isDrawerView = useMediaQuery('only screen and (max-width: 1280px)');

    const toggleDrawer = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    return (
        <ThemeProvider theme={theme}>
            <MainContextProvider>
                <Grid container flexDirection={isDrawerView ? 'column' : 'row'} alignItems={isDrawerView ? 'center' : 'flex-start'} justifyContent="flex-start" spacing={3}>
                    <Button onClick={() => toggleDrawer(!open)}>Toggle</Button>
                    <Grid item>
                        <MapboxGlobe />
                    </Grid>

                    {isDrawerView ? (
                        <Grid item>
                            <SwipeableDrawer
                                anchor="bottom"
                                variant="persistent"
                                onOpen={() => toggleDrawer(true)}
                                onClose={() => toggleDrawer(false)}
                                swipeAreaWidth={80}
                                disableSwipeToOpen={false}
                                ModalProps={{
                                    keepMounted: true,
                                }}
                                open={open} >
                                <Information drawerOpen={open} />
                            </SwipeableDrawer>
                        </Grid>

                    ) : (
                        <Grid item width={'40vw'}>
                            <Information drawerOpen={false} />
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <div className="footer">
                            <div>Plant icon made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                        </div>
                    </Grid>
                </Grid>
            </MainContextProvider>
        </ThemeProvider>
    );
}