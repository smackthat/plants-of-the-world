import { Theme, ThemeProvider } from '@mui/material/styles';
import MainContextProvider from '../context/maincontext';
import MapboxGlobe from './mapbox-globe';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Information from './information';
import { Context, createContext, useState } from 'react';
import { Footer } from './footer';
import useMediaQuery from '@mui/material/useMediaQuery';
import Stack from '@mui/material/Stack';

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
                    <Stack direction={isDrawerView ? 'column' : 'row'} alignItems={isDrawerView ? 'center' : 'flex-start'} justifyContent="flex-start" spacing={3}>
                        {isDrawerView ? (
                            <MapboxGlobe />
                        ) : (
                            <Stack>
                                <MapboxGlobe />
                            </Stack>
                        )}


                        {isDrawerView ? (
                            <Stack>
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
                            </Stack>

                        ) : (
                            <Stack width={'40vw'}>
                                <Information />
                            </Stack>
                        )}


                    </Stack>
                    {!isDrawerView && (
                        <Footer />
                    )}
                </DrawerViewContext.Provider>
            </MainContextProvider>
        </ThemeProvider >
    );
}