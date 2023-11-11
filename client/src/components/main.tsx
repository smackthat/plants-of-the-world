import { Theme, ThemeProvider } from '@mui/material/styles';
import MainContextProvider from '../context/maincontext';
import Grid from '@mui/material/Grid';
import MapboxGlobe from './mapbox-globe';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Information from './information';
import { Context, createContext, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { Footer } from './footer';

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

    const isDrawerView = useMediaQuery('only screen and (max-width: 900px)');

    const toggleDrawer = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    return (
        <ThemeProvider theme={theme}>
            <MainContextProvider>
                <DrawerViewContext.Provider value={{ drawerView: isDrawerView, drawerOpen: open, toggleDrawer: toggleDrawer }}>
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
                        {!isDrawerView && (
                            <Footer />
                        )}

                    </Grid>
                </DrawerViewContext.Provider>
            </MainContextProvider>
        </ThemeProvider >
    );
}