import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export const Footer = () => {

    return (
        <Grid item xs={12}>
            <div className="footer">
                <Typography variant="subtitle2">Plant icon made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></Typography>
            </div>
        </Grid>
    );
};