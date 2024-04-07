import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ReactComponent as PlantIcon } from '../assets/icons/leaves.svg';
import SvgIcon from '@mui/material/SvgIcon';


export const Footer = () => {

    return (
        <Stack direction="row" justifyContent="flex-end" pt={2}>
            <div className="footer">
                <Typography fontSize="12px" variant="subtitle2"><SvgIcon component={PlantIcon} viewBox='0 0 600 300' /> by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></Typography>
            </div>
        </Stack>
    );
};