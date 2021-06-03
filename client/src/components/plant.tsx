import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { useContext, useState } from 'react';
import { IMainContext, MainContext } from '../context/maincontext';
import { PlantAvatar } from './plant-avatar';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Zone } from '../interfaces/trefle.interface';
import IconButton from '@material-ui/core/IconButton';
import { ArrowBack } from '@material-ui/icons';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { Typography } from '@material-ui/core';
import ImageList from './image-list';

const styles = makeStyles(() =>
    createStyles({
        primary: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        title: {
            textAlign: 'center'
        }
    })
);

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
        <Card className={styles().primary}>
            <CardHeader className={styles().title}
                avatar={
                    <IconButton onClick={() => handleGoBack()}>
                        <ArrowBack></ArrowBack>
                    </IconButton>
                }
                title={a.plant.common_name ?? a.plant.scientific_name}
                subheader={a.plant.scientific_name}
            >
            </CardHeader>
            <CardContent className={styles().primary}>
                <PlantAvatar
                    img={{ imgSrc: a.plant.image_url, title: a.plant.common_name ?? a.plant.scientific_name }}
                    size={'200px'}
                ></PlantAvatar>

                <Typography variant="subtitle2">Family: {a.plant.family}</Typography>
                <Typography style={{marginBottom: '2em'}} variant="subtitle2">Genus: {a.plant.genus}</Typography>

                <ImageList></ImageList>

                <ToggleButtonGroup
                    style={{ marginTop: '2em' }}
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