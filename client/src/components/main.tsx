import { Theme, ThemeProvider } from '@mui/material/styles';
import MainContextProvider from '../context/maincontext';
import Grid from '@mui/material/Grid';
import MapboxGlobe from './mapbox-globe';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Information from './information';
import { Context, createContext, useState } from 'react';
import { Typography, useMediaQuery } from '@mui/material';

interface Props {
    theme: Theme;
}

interface IDrawerViewContext {
    drawerView: boolean;
    drawerOpen: boolean;
    toggleDrawer?: (newOpen: boolean) => void;
}

export const DrawerViewContext: Context<IDrawerViewContext> = createContext(null);

export default function Main({ theme }: Props) {

    const [open, setOpen] = useState<boolean>(false);

    const isDrawerView = useMediaQuery('only screen and (max-width: 1280px)');

    const toggleDrawer = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    return (
        <ThemeProvider theme={theme}>
            <MainContextProvider>
                <DrawerViewContext.Provider value={{drawerView: isDrawerView, drawerOpen: open, toggleDrawer: toggleDrawer }}>
                    <Grid container flexDirection={isDrawerView ? 'column' : 'row'} alignItems={isDrawerView ? 'center' : 'flex-start'} justifyContent="flex-start" spacing={3}>
                        {isDrawerView ? (
                            <MapboxGlobe />
                        ) : (
                            <Grid item>
                                <MapboxGlobe />
                            </Grid>
                        )}


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
                                    <Information />
                                </SwipeableDrawer>
                            </Grid>

                        ) : (
                            <Grid item width={'40vw'}>
                                <Information />
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <div className="footer">
                                <Typography variant="subtitle2">Plant icon made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></Typography>
                            </div>
                        </Grid>
                    </Grid>
                </DrawerViewContext.Provider>
            </MainContextProvider>
        </ThemeProvider >
    );
}