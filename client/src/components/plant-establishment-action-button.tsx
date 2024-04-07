import Fab from '@mui/material/Fab';
import Popover from '@mui/material/Popover';
import { useContext, useState } from 'react';
import { MainContext } from '../context/maincontext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';

export const PlantEstablishmentActionButton = () => {

    const { regions } = useContext(MainContext);

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <Zoom in easing={{ enter: 'cubic-bezier(0.1, 0.2, 0.9, 0.1)'}}>
                <Fab
                    onClick={handleClick}
                    color="primary"
                    sx={{ zIndex: 100, position: 'absolute', right: 10, top: 10 }}>
                    {regions.length}
                </Fab>
            </Zoom>
            <Popover open={open} anchorEl={anchorEl} anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}} onClose={handleClose}>
                <Box overflow="auto" maxHeight='50vh' padding={1}>
                    {regions?.length > 0 ? (
                        <>
                            {regions.map((r) =>
                                <Typography key={r.slug}>{r.name}</Typography>
                            )}
                        </>
                    ) : (
                        <Typography>No regions.</Typography>
                    )}
                </Box>
            </Popover>
        </>
    );

};