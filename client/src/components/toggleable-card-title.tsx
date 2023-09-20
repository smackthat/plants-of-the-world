import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { DrawerViewContext } from './main';

export default function ToggleableCardTitle({ title }: { title: string }) {

    const { drawerOpen, drawerView, toggleDrawer } = useContext(DrawerViewContext);

    return (
        <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="body2">{title}</Typography>

            {drawerView && (
                <>
                    {drawerOpen ? (
                        <IconButton onClick={() => toggleDrawer(false)}>
                            <KeyboardArrowDown />
                        </IconButton>
                    ) : (
                        <IconButton onClick={() => toggleDrawer(true)}>
                            <KeyboardArrowUp />
                        </IconButton>
                    )}
                </>
            )}
        </Stack>
    );
}