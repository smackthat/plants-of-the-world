import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { useContext, useState } from "react";
import { IMainContext, MainContext } from "../context/maincontext";
import { PlantAvatar } from "./plant-avatar";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Zone } from "../interfaces/trefle.interface";
import IconButton from "@material-ui/core/IconButton";
import { ArrowBack } from "@material-ui/icons";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

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
    Extinct
}

export default function Plant() {

    const a: IMainContext = useContext(MainContext);

    const [plantToggle, setPlantToggle] = useState(null);

    const handleGoBack = (e) => {
        a.onPlantSelected(null);
    };

    const handlePlantToggle = (e, toggle: PlantToggle) => {

        if (toggle === PlantToggle.Native) {
            a.onRegionsChanged((a.plant.distributions.native as Zone[]));
        }
        else if (toggle === PlantToggle.Extinct) {

        }
        else {
            a.onRegionsChanged(null);
        }
        setPlantToggle(toggle);
    }

    return (
        <Card className={styles().primary}>
            <CardHeader className={styles().title}
                avatar={
                    <IconButton onClick={(e) => handleGoBack(e)}>
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

                <ToggleButtonGroup
                    value={plantToggle}
                    exclusive
                    onChange={handlePlantToggle}
                >
                    <ToggleButton value={PlantToggle.Native}>Show where I grow!</ToggleButton>
                    {/* <ToggleButton value={PlantToggle.Extinct}>Show where I'm extinct...</ToggleButton> */}
                </ToggleButtonGroup>

            </CardContent>
        </Card>
    )

}