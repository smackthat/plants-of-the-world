import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { useContext } from "react";
import { IMainContext, MainContext } from "../context/maincontext";
import { PlantAvatar } from "./plant-avatar";

export default function Plant() {

    const a: IMainContext = useContext(MainContext);

    return (
        <Card>
            <CardHeader
                title={a.plant.common_name ?? a.plant.scientific_name}>
            </CardHeader>
            <CardContent>
                <PlantAvatar
                    img={{ imgSrc: a.plant.image_url, title: a.plant.common_name ?? a.plant.scientific_name }}
                    size={'200px'}
                ></PlantAvatar>
            </CardContent>
        </Card>
    )

}