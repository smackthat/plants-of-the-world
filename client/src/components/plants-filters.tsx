import { Forest, Restaurant } from '@mui/icons-material';
import { ListItemText } from '@mui/material';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { useContext, useState } from 'react';
import { IMainContext, MainContext } from '../context/maincontext';


export default function PlantsFilters() {

    const [ediblesAnchor, setEdiblesAnchor] = useState<null | HTMLElement>(null);
    const [nativityAnchor, setNativityAnchor] = useState<null | HTMLElement>(null);

    const context: IMainContext = useContext(MainContext);

    const nativityChipVariant = context.region.filters?.nativityFilter ? 'filled' : 'outlined';
    const edibilityChipVariant = context.region.filters?.edibilityFilter ? 'filled' : 'outlined';

    const handleChipClick = (event: React.MouseEvent<HTMLDivElement>, anchorSetter: React.Dispatch<React.SetStateAction<HTMLElement>>) => {
        anchorSetter(event.currentTarget);
    };

    const handleChipClose = (anchorSetter: React.Dispatch<React.SetStateAction<HTMLElement>>) => {
        anchorSetter(null);
    };

    const handleNativityFilterChange = (nativityFilter?: 'native' | 'introduced') => {
        context.onRegionChanged({ ...context.region, filters: { nativityFilter, edibilityFilter: context.region.filters?.edibilityFilter } });
    };

    const handleEdibilityFilterChange = (edibilityFilter?: string) => {
        context.onRegionChanged({ ...context.region, filters: { nativityFilter: context.region.filters?.nativityFilter, edibilityFilter } });
    };

    return (
        <Stack className="plants-filters" direction="row" spacing={1}>
            <Chip label="Nativity" icon={<Forest />} variant={nativityChipVariant} aria-haspopup="true" onClick={(e) => handleChipClick(e, setNativityAnchor)} />
            <Chip label="Edibility" icon={<Restaurant />} variant={edibilityChipVariant} aria-haspopup="true" onClick={(e) => handleChipClick(e, setEdiblesAnchor)} />

            <Menu anchorEl={nativityAnchor} open={Boolean(nativityAnchor)} onClose={() => handleChipClose(setNativityAnchor)}>
                <MenuItem onClick={() => handleNativityFilterChange(null)}>
                    <ListItemText>
                        All
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleNativityFilterChange('native')} selected={context.region.filters?.nativityFilter === 'native'}>
                    <ListItemText>
                        Native
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleNativityFilterChange('introduced')}  selected={context.region.filters?.nativityFilter === 'introduced'}>
                    <ListItemText>
                        Introduced
                    </ListItemText>
                </MenuItem>
            </Menu>

            <Menu anchorEl={ediblesAnchor} open={Boolean(ediblesAnchor)} onClose={() => handleChipClose(setEdiblesAnchor)}>
                <MenuItem onClick={() => handleEdibilityFilterChange(null)}>
                    <ListItemText>
                        All
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleEdibilityFilterChange('true')} selected={context.region.filters?.edibilityFilter === 'true'}>
                    <ListItemText>
                        Edibles
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleEdibilityFilterChange('false')} selected={context.region.filters?.edibilityFilter === 'false'}>
                    <ListItemText>
                        Inedibles
                    </ListItemText>
                </MenuItem>
            </Menu>
        </Stack>
    );
}