import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { Icon, IIconProps } from './Icon/Icon';
import { Touchable } from './Touchable';

export interface IClickableIconProps extends IIconProps {
    onClick?: () => void;
}

export const ClickableIcon: React.FC<IClickableIconProps> = props => {
    const { style, size, ...iconProps } = props;

    const iconSize = Math.abs(size * 0.4);
    const sizeStyle = {
        width: size,
        height: size
    }

    return (
        <View style={[styles.wrap, style, sizeStyle]}>
            <Touchable delay onClick={props.onClick}>
                <View style={styles.icon}>
                    <Icon size={iconSize} { ...iconProps } />
                </View>
            </Touchable>
        </View>
    );
}

const styles = StyleSheet.create({
    wrap: {
        borderRadius: 50,
        overflow: 'hidden',
        backgroundColor: '#0001'
    },
    icon: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
