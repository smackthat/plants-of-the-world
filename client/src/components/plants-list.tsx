import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Pagination from '@mui/material/Pagination';
import { useContext, useRef } from 'react';
import { IMainContext, MainContext } from '../context/maincontext';
import { Species } from '../interfaces/trefle.interface';
import { PlantAvatar } from './plant-avatar';


export default function PlantsList() {

    const a: IMainContext = useContext(MainContext);
    const listRef = useRef(null);
    const { plants, loading } = a;

    const pageSize = 20;
    const onPageChange = (page: number) => {
        a.onPageChange(page);
        listRef.current.scrollTop = 0;
    };

    const handleTextClick = (plantId: number) => {
        a.onPlantSelected(plantId);
    };

    if (!plants) {
        return (
            <Box display='flex' justifyContent='center' padding="1em">
                {loading && <CircularProgress></CircularProgress>}
            </Box>
        );
    }

    return (
        <>
            <List ref={listRef} sx={{ maxHeight: '600px', overflow: 'auto' }}>
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
                siblingCount={2}
                page={plants.page}
                count={Math.ceil(plants.results.meta.total / pageSize)}
                onChange={(e, page) => onPageChange(page)}
                color="primary"
            ></Pagination>
        </>

    );
}