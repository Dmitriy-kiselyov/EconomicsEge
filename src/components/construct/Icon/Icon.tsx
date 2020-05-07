import React from 'react';
import { Image, ImageStyle } from 'react-native';

export type IIconTypes = 'arrowRight' | 'arrowLeft' | 'camera' | 'correct' | 'correctActive' | 'wrong' | 'wrongActive';

export interface IIconProps {
    size: number;
    type: IIconTypes;
    style?: object;
}

const icons: Record<IIconTypes, any> = {
    arrowRight: require('./assets/arrow-right.png'),
    arrowLeft: require('./assets/arrow-left.png'),
    camera: require('./assets/camera.png'),
    correct: require('./assets/correct.png'),
    correctActive: require('./assets/correct-active.png'),
    wrong: require('./assets/wrong.png'),
    wrongActive: require('./assets/wrong-active.png')
};

export const Icon: React.FC<IIconProps> = props => {
    const style: ImageStyle = {
        width: props.size,
        height: props.size
    }

    return (
        <Image
            source={icons[props.type]}
            style={[style, props.style]}
        />
    )
}
