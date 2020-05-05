import React from 'react';
import { Image, ImageStyle } from 'react-native';

export enum EIconTypes {
    arrowRight = 'arrowRight',
    arrowLeft = 'arrowLeft'
}

export interface IIconProps {
    size: number;
    type: EIconTypes;
    style?: object;
}

const icons = {
    [EIconTypes.arrowRight]: require('./assets/arrow-right.png'),
    [EIconTypes.arrowLeft]: require('./assets/arrow-left.png')
};

export const Icon: React.FC<IIconProps> = props => {
    const style: ImageStyle = {
        width: props.size,
        height: props.size
    }

    const styles = [style];
    if (props.style) {
        styles.push(props.style);
    }

    return (
        <Image
            source={icons[props.type]}
            style={styles}
        />
    )
}
