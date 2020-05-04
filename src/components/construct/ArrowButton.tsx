import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Touchable } from './Touchable';
import { EIconTypes, Icon } from './Icon/Icon';
import { colors, margins } from '../../lib/constants';
import { getStyleWithMod } from '../../lib/getStyleWithMod';

export type IArrowButtonDirection = 'left' | 'right';

export interface IArrowButtonProps {
    text: string;
    onClick?: () => void;
    direction: IArrowButtonDirection;
}

export const ArrowButton: React.FC<IArrowButtonProps> = props => {
    const { direction } = props;
    const icon = (
        <Icon
            type={direction === 'left' ? EIconTypes.arrowLeft : EIconTypes.arrowRight}
            size={20}
        />
    );
    const touchStyle = getStyleWithMod(styles, 'touch', { direction });

    return (
        <View style={styles.button}>
            <Touchable onClick={props.onClick} delay>
                <View style={touchStyle}>
                    <Text style={styles.text}>
                        {direction === 'left' && icon}
                        {props.text}
                        {direction === 'right' && icon}
                    </Text>
                </View>
            </Touchable>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        alignSelf: 'flex-start',
        borderRadius: 50,
        overflow: 'hidden',
    },
    touch: {
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    touchDirectionLeft: {
        paddingRight: 10
    },
    touchDirectionRight: {
        paddingLeft: 10
    },
    text: {
        fontSize: 20,
        alignSelf: 'center',
        color: colors.primaryDark
    },
    icon: {
        height: 20,
        width: 20,
    }
});
