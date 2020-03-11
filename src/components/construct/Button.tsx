import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Touchable } from './Touchable';
import { colors, margins } from '../../lib/constants';
import { getStyleWithMod } from '../../lib/getStyleWithMod';

interface IButtonProps {
    title: string;
    onClick?: () => void;
    size: 'm' | 'l';
    outline?: boolean;
    style?: object;
    delay?: boolean;
}

export const Button: React.FC<IButtonProps> = props => {
    const title = props.title.toUpperCase();
    const buttonStyle = getStyleWithMod(styles, 'button', {
        size: props.size,
        outline: props.outline,
    });
    const textStyle = getStyleWithMod(styles, 'text', {
        size: props.size,
        outline: props.outline,
    });

    if (props.style) {
        buttonStyle.push(props.style);
    }

    return (
        <View style={buttonStyle}>
            <Touchable onClick={props.onClick} delay={props.delay}>
                <View style={styles.touchable}>
                    <Text style={textStyle}>{title}</Text>
                </View>
            </Touchable>
        </View>
    );
};

const styles = StyleSheet.create({
    touchable: {
        flex: 1,
    },
    button: {
        overflow: 'hidden',
        backgroundColor: colors.primary,
    },
    buttonSizeL: {
        elevation: 10,
        borderRadius: 10,
        minWidth: 150,
        height: 80,
    },
    buttonSizeM: {
        borderRadius: 100,
        elevation: 4,
        minWidth: 80,
        height: 50,
    },
    buttonOutline: {
        backgroundColor: colors.white,
        borderColor: colors.primary,
        borderWidth: 3,
    },
    text: {
        textAlign: 'center',
        textAlignVertical: 'center',
        flex: 1,
        margin: margins.m,
        marginHorizontal: margins.l,
        fontWeight: '700',
        color: colors.white,
    },
    textSizeL: {
        fontSize: 30,
    },
    textSizeM: {
        fontSize: 12,
    },
    textOutline: {
        color: colors.primaryDark,
    },
});
