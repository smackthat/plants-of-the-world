import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useContext, useState } from 'react';
import { Zone } from '../interfaces/trefle.interface';
import { MainContext } from '../context/maincontext';
import ToggleButton from '@mui/material/ToggleButton';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export enum PlantToggle {
    Native,
    Introduced
}

/** A plant establishment (native/introduced) toggle button. */
export const PlantEstablishmentButtonGroup = () => {

    const { onRegionsChanged, plant, regions } = useContext(MainContext);

    const [plantToggle, setPlantToggle] = useState<PlantToggle>(null);

    const handlePlantToggle = (e, toggle: PlantToggle) => {
        switch (toggle) {
        case PlantToggle.Native:
            onRegionsChanged((plant.distributions.native as Zone[]));
            break;
        case PlantToggle.Introduced:
            onRegionsChanged((plant.distributions.introduced as Zone[]));
            break;
        default:
            onRegionsChanged(null);
        }

        setPlantToggle(toggle);
    };

    const regionsTooltipTitle = (
        <Box overflow="auto" maxHeight="25em">

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
    );

    return (
        <ToggleButtonGroup
            sx={{ zIndex: 1 }}
            value={plantToggle}
            exclusive
            onChange={handlePlantToggle}>


            <ToggleButton value={PlantToggle.Native}>
                <Badge
                    sx={{ cursor: 'pointer' }}
                    color="success"
                    badgeContent={
                        <Tooltip title={regionsTooltipTitle} placement='top'>
                            <span>{regions.length}</span>
                        </Tooltip>
                    }
                    invisible={plantToggle !== PlantToggle.Native}>
                    Show where native
                </Badge>
            </ToggleButton>
            <ToggleButton value={PlantToggle.Introduced}>
                <Badge
                    sx={{ cursor: 'pointer' }}
                    color="success"
                    badgeContent={
                        <Tooltip title={regionsTooltipTitle} placement='top'>
                            <span>{regions.length}</span>
                        </Tooltip>
                    }
                    invisible={plantToggle !== PlantToggle.Introduced}>
                    Show where introduced
                </Badge>
            </ToggleButton>
        </ToggleButtonGroup >
    );
};
