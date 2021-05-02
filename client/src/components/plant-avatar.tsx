import Avatar from "@material-ui/core/Avatar";
import PlantIcon from '../assets/icons/leaves.svg';
import { PlantImageContainer } from "./plant-image-container";

export function PlantAvatar({ img, size }) {

    return (
        <PlantImageContainer
            element={
                <Avatar style={{ height: size, width: size }} src={img?.imgSrc}>
                    <img src={PlantIcon} title={img?.title} alt='P'></img>
                </Avatar>
            }
            img={img}
        ></PlantImageContainer>
    )
}