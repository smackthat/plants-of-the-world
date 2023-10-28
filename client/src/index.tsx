import { createRoot } from 'react-dom/client';
import './index.scss';
import { createTheme } from '@mui/material/styles';
import Main from './components/main';

const theme = createTheme({
    palette: {
        primary: {
            main: '#00A092',
        }
    },
    typography: {
        fontFamily: 'Roboto',
    }
});

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(<Main theme={theme} />);

