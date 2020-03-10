import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors } from '../../lib/constants';

import { getStyleWithMod } from '../../lib/getStyleWithMod';

export interface ITitleProps {
    size: 'm' | 'l';
    center?: boolean;
    title: string;
    style?: object;
}

export const Title: React.FC<ITitleProps> = props => {
    const textStyle = getStyleWithMod(styles, 'text', {
        size: props.size,
        center: props.center,
    });

    if (props.style) {
        textStyle.push(props.style);
    }

    return <Text style={textStyle}>{props.title}</Text>;
};

const styles = StyleSheet.create({
    text: {
        color: colors.black,
        fontWeight: '700',
    },
    textCenter: {
        textAlign: 'center',
    },
    textSizeM: {
        fontSize: 25,
    },
    textSizeL: {
        fontSize: 40,
    },
});
