import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Pagination from '@mui/material/Pagination';
import { ChangeEvent, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { IMainContext, MainContext } from '../context/maincontext';
import { Species } from '../interfaces/trefle.interface';
import { PlantAvatar } from './plant-avatar';
import { DrawerViewContext } from './main';
import Typography from '@mui/material/Typography';
import { Button, Stack, TextField } from '@mui/material';

const pageSize = 30;

export default function PlantsList() {

    const a: IMainContext = useContext(MainContext);
    const  { drawerView } = useContext(DrawerViewContext);
    const listRef = useRef(null);
    const { plants, loading } = a;

    const [pageInput, setPageInput] = useState<number | string>('');

    const totalCount = useMemo(() => {
        return Math.ceil(plants?.results?.meta?.total / pageSize);
    }, [plants]);

    const onPageChange = (page: number) => {
        a.onPageChange(page);
    };

    const handleTextClick = (plantId: number) => {
        a.onPlantSelected(plantId);
    };

    const onPageInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const pageNumber = parseInt(event.target.value);

        if (isNaN(pageNumber)) {
            setPageInput('');
        }
        else if (pageNumber <= totalCount && pageNumber > 0) {
            setPageInput(pageNumber);
        }
    };

    const handlePageInputApply = () => {
        if (pageInput !== '') {
            onPageChange(+pageInput);
            setPageInput('');
        }
    };

    const onPageInputKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        // Handle enter click to submit
        if (event.keyCode === 13) {
            handlePageInputApply();
        }
    };

    useEffect(() => {
        if (listRef?.current) {
            listRef.current.scrollTop = 0;
        }
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
            <Typography sx={{ padding: 1 }}>No results found.</Typography>
        );
    }

    return (
        <>
            <List ref={listRef} sx={{ maxHeight: drawerView ? '45vh' : '60vh', overflow: 'auto' }}>
                {plants.results.data.map((plant: Species, index) =>
                    <ListItem key={plant.id + `_${index}`}>
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
            <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1} paddingTop={1}>
                <Pagination
                    sx={{ paddingX: 1 }}
                    siblingCount={2}
                    page={plants.page}
                    count={totalCount}
                    onChange={(e, page) => onPageChange(page)}
                    color="primary"
                ></Pagination>

                <Stack direction="row" alignItems="center">
                    <Typography fontSize={12}>Page</Typography>
                    <TextField
                        type="number"
                        size="small"
                        autoComplete='off'
                        value={pageInput}
                        onChange={onPageInputChange}
                        onKeyDown={onPageInputKeyDown}
                        sx={{ width: 60, marginLeft: 1 }} />
                    <Button 
                        variant="text" 
                        size="small"
                        color="info" 
                        onClick={() => handlePageInputApply()}
                    >
                        Go
                    </Button>
                </Stack>

                
            </Stack>

        </>

    );
}