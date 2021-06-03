import Avatar from '@material-ui/core/Avatar';
import PlantIcon from '../assets/icons/leaves.svg';
import { IImage } from '../interfaces/image.interface';
import { PlantImageContainer } from './plant-image-container';

interface Props {
    img: IImage,
    size: string
}

export function PlantAvatar({ img, size }: Props) {

    return (
        <PlantImageContainer
            element={
                <Avatar style={{ height: size, width: size }} src={img?.imgSrc}>
                    <img src={PlantIcon} title={img?.title} alt='P'></img>
                </Avatar>
            }
            img={img}
        ></PlantImageContainer>
    );
}