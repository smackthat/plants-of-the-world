import { useContext } from 'react';
import { IMainContext, MainContext } from '../context/maincontext';
import { PlantAvatar } from './plant-avatar';
import PlantImageList from './plant-image-list';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import { ArrowBack } from '@mui/icons-material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ToggleableCardTitle from './toggleable-card-title';
import { DrawerViewContext } from './main';
import { PlantEstablishmentButtonGroup } from './plant-establishment-button-group';
import { Box } from '@mui/material';


const displayStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

export default function Plant() {

    const a: IMainContext = useContext(MainContext);
    const { drawerView } = useContext(DrawerViewContext);

    const handleGoBack = () => {
        a.onPlantSelected(null);
    };

    return (
        <Card elevation={drawerView ? 0 : 2}>
            <CardHeader
                avatar={
                    <IconButton onClick={() => handleGoBack()}>
                        <ArrowBack />
                    </IconButton>
                }
                title={<ToggleableCardTitle title={a.plant.common_name ?? a.plant.scientific_name} />}
                subheader={a.plant.scientific_name}
            >
            </CardHeader>
            <CardContent sx={{ ...displayStyle, maxHeight: drawerView ? '60vh' : '75vh', overflow: drawerView ? 'auto' : 'none' }}>
                <PlantAvatar
                    img={{ imgSrc: a.plant.image_url, title: a.plant.common_name ?? a.plant.scientific_name }}
                    size={'200px'}
                ></PlantAvatar>

                <Typography variant="subtitle2">Family: {a.plant.family}</Typography>
                <Typography sx={{ marginBottom: '1em' }} variant="subtitle2">Genus: {a.plant.genus}</Typography>

                <PlantImageList />

                <Box marginTop='2em'>
                    <PlantEstablishmentButtonGroup />
                </Box>

            </CardContent>
        </Card>
    );

}