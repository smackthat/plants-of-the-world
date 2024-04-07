import { Forest, Restaurant, Image } from '@mui/icons-material';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { useContext, useState } from 'react';
import { IMainContext, MainContext } from '../context/maincontext';
import ListItemText from '@mui/material/ListItemText';


export default function PlantsFilters() {

    const [ediblesAnchor, setEdiblesAnchor] = useState<null | HTMLElement>(null);
    const [nativityAnchor, setNativityAnchor] = useState<null | HTMLElement>(null);
    const [imagesAnchor, setImagesAnchor] = useState<null | HTMLElement>(null);

    const context: IMainContext = useContext(MainContext);

    const nativityChipVariant = context.region.filters?.nativityFilter ? 'filled' : 'outlined';
    const edibilityChipVariant = context.region.filters?.edibilityFilter ? 'filled' : 'outlined';
    const imagedCountChipVariant = context.region.filters?.imagesCountFilter ? 'filled' : 'outlined';

    const handleChipClick = (event: React.MouseEvent<HTMLDivElement>, anchorSetter: React.Dispatch<React.SetStateAction<HTMLElement>>) => {
        anchorSetter(event.currentTarget);
    };

    const handleChipClose = (anchorSetter: React.Dispatch<React.SetStateAction<HTMLElement>>) => {
        anchorSetter(null);
    };

    const handleNativityFilterChange = (nativityFilter?: 'native' | 'introduced') => {
        context.onRegionChanged({ ...context.region, filters: { ...context.region.filters, nativityFilter } });
    };

    const handleEdibilityFilterChange = (edibilityFilter?: string) => {
        context.onRegionChanged({ ...context.region, filters: { ...context.region.filters, edibilityFilter } });
    };

    const handleImagesCountFilterChange = (imagesCountFilter?: { min: number, max: number }) => {
        context.onRegionChanged({ ...context.region, filters: { ...context.region.filters, imagesCountFilter } });
    };

    return (
        <Stack className="plants-filters" direction="row" spacing={1} padding={1} sx={{ background: (theme) => theme.palette.grey[100]}}>
            <Chip label="Nativity" icon={<Forest />} variant={nativityChipVariant} aria-haspopup="true" onClick={(e) => handleChipClick(e, setNativityAnchor)} />
            <Chip label="Edibility" icon={<Restaurant />} variant={edibilityChipVariant} aria-haspopup="true" onClick={(e) => handleChipClick(e, setEdiblesAnchor)} />
            <Chip label="Images" icon={<Image />} variant={imagedCountChipVariant} aria-haspopup="true" onClick={(e) => handleChipClick(e, setImagesAnchor)} />

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
                <MenuItem onClick={() => handleNativityFilterChange('introduced')} selected={context.region.filters?.nativityFilter === 'introduced'}>
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

            <Menu anchorEl={imagesAnchor} open={Boolean(imagesAnchor)} onClose={() => handleChipClose(setImagesAnchor)}>
                <MenuItem onClick={() => handleImagesCountFilterChange(null)}>
                    <ListItemText>
                        All
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleImagesCountFilterChange({ min: 0, max: 0 })} selected={context.region.filters?.imagesCountFilter?.min === 0}>
                    <ListItemText>
                        No images
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleImagesCountFilterChange({ min: 1, max: 5 })} selected={context.region.filters?.imagesCountFilter?.min === 1}>
                    <ListItemText>
                        1 - 5
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleImagesCountFilterChange({ min: 5, max: 10 })} selected={context.region.filters?.imagesCountFilter?.min === 5}>
                    <ListItemText>
                        5 - 10
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleImagesCountFilterChange({ min: 10, max: 1000 })} selected={context.region.filters?.imagesCountFilter?.min === 10}>
                    <ListItemText>
                        10 or more
                    </ListItemText>
                </MenuItem>

            </Menu>
        </Stack>
    );
}