import Avatar from '@material-ui/core/Avatar';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
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
                <LazyLoadComponent>
                    <Avatar style={{ height: size, width: size }} src={img?.imgSrc}>
                        <img src={PlantIcon} title={img?.title} alt='P'></img>
                    </Avatar>
                </LazyLoadComponent>
            }
            img={img}
        ></PlantImageContainer>
    );
}