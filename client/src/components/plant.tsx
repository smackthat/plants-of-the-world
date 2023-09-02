import { useContext, useState } from 'react';
import { IMainContext, MainContext } from '../context/maincontext';
import { PlantAvatar } from './plant-avatar';
import { Zone } from '../interfaces/trefle.interface';
import PlantImageList from './plant-image-list';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import { ArrowBack } from '@mui/icons-material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';


const displayStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

enum PlantToggle {
    Native,
    Introduced
}

export default function Plant() {

    const a: IMainContext = useContext(MainContext);

    const [plantToggle, setPlantToggle] = useState(null);

    const handleGoBack = () => {
        a.onPlantSelected(null);
    };

    const handlePlantToggle = (e, toggle: PlantToggle) => {

        switch (toggle) {
        case PlantToggle.Native:
            a.onRegionsChanged((a.plant.distributions.native as Zone[]));
            break;
        case PlantToggle.Introduced:
            a.onRegionsChanged((a.plant.distributions.introduced as Zone[]));
            break;
        default:
            a.onRegionsChanged(null);
        }

        setPlantToggle(toggle);
    };

    return (
        <Card>
            <CardHeader
                avatar={
                    <IconButton onClick={() => handleGoBack()}>
                        <ArrowBack />
                    </IconButton>
                }
                sx={{ textAlign: 'center' }}
                title={a.plant.common_name ?? a.plant.scientific_name}
                subheader={a.plant.scientific_name}
            >
            </CardHeader>
            <CardContent sx={{ ...displayStyle, maxHeight: '70vh' }}>
                <PlantAvatar
                    img={{ imgSrc: a.plant.image_url, title: a.plant.common_name ?? a.plant.scientific_name }}
                    size={'200px'}
                ></PlantAvatar>

                <Typography variant="subtitle2">Family: {a.plant.family}</Typography>
                <Typography sx={{ marginBottom: '2em' }} variant="subtitle2">Genus: {a.plant.genus}</Typography>

                <PlantImageList />

                <ToggleButtonGroup
                    sx={{ marginTop: '2em' }}
                    value={plantToggle}
                    exclusive
                    onChange={handlePlantToggle}
                >
                    <ToggleButton value={PlantToggle.Native}>Show where native</ToggleButton>
                    <ToggleButton value={PlantToggle.Introduced}>Show where introduced</ToggleButton>
                </ToggleButtonGroup>

            </CardContent>
        </Card>
    );

}