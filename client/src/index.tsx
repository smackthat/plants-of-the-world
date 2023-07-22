import { createRoot } from 'react-dom/client';
import './index.scss';
import Information from './components/information';
import MainContextProvider from './context/maincontext';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MapboxGlobe from './components/mapbox-globe';

const theme = createTheme({
    typography: {
        fontFamily: 'Arial',
    }
});

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(
    <ThemeProvider theme={theme}>
        <MainContextProvider>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    {/* <Globe
                        size={800}
                    ></Globe> */}
                    <MapboxGlobe />
                </Grid>
                <Grid item xs={12} md={5}>
                    <Information></Information>
                </Grid>
                <Grid item xs={12}>
                    <div className="footer">
                        <div>Plant icon made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                    </div>
                </Grid>
            </Grid>
        </MainContextProvider>
    </ThemeProvider>
);

