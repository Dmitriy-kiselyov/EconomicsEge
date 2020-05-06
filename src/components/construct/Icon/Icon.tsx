import React from 'react';
import { Image, ImageStyle } from 'react-native';

export type IIconTypes = 'arrowRight' | 'arrowLeft' | 'camera';

export interface IIconProps {
    size: number;
    type: IIconTypes;
    style?: object;
}

const icons: Record<IIconTypes, any> = {
    arrowRight: require('./assets/arrow-right.png'),
    arrowLeft: require('./assets/arrow-left.png'),
    camera: require('./assets/camera.png'),
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
