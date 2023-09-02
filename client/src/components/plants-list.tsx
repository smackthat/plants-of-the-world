import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Pagination from '@mui/material/Pagination';
import { useContext, useMemo, useRef } from 'react';
import { IMainContext, MainContext } from '../context/maincontext';
import { Species } from '../interfaces/trefle.interface';
import { PlantAvatar } from './plant-avatar';
import { Typography } from '@mui/material';

const pageSize = 20;

export default function PlantsList() {

    const a: IMainContext = useContext(MainContext);
    const listRef = useRef(null);
    const { plants, loading } = a;

    const onPageChange = (page: number) => {
        a.onPageChange(page);
        listRef.current.scrollTop = 0;
    };

    const handleTextClick = (plantId: number) => {
        a.onPlantSelected(plantId);
    };

    const totalCount = useMemo(() => {
        return Math.ceil(plants?.results?.meta?.total / pageSize);
    }, [plants]);

    if (!plants) {
        return (
            <Box display='flex' justifyContent='center' padding="1em">
                {loading && <CircularProgress></CircularProgress>}
            </Box>
        );
    }

    if (plants.results.data.length === 0) {
        return (
            <Typography sx={{padding: 1}}>No results found.</Typography>
        );
    }

    return (
        <>
            <List ref={listRef} sx={{ maxHeight: '60vh', overflow: 'auto' }}>
                {plants.results.data.map((plant: Species) =>
                    <ListItem key={plant.id}>
                        <ListItemAvatar>
                            <PlantAvatar
                                img={{ imgSrc: plant.image_url, title: plant.common_name ?? plant.scientific_name }}
                                size={'80px'}
                            ></PlantAvatar>
                        </ListItemAvatar>
                        <ListItemText onClick={() => handleTextClick(plant.id)} sx={{ ':hover': { cursor: 'pointer' }, marginLeft: '5em' }}>
                            {plant.common_name ?? plant.scientific_name}
                        </ListItemText>
                    </ListItem>
                )}

            </List>
            <Pagination
                sx={{paddingTop: '1em'}}
                siblingCount={2}
                page={plants.page}
                count={totalCount}
                onChange={(e, page) => onPageChange(page)}
                color="primary"
            ></Pagination>
        </>

    );
}