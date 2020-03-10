import React from 'react';
import {
    Platform,
    Text,
    View,
    TouchableNativeFeedback,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import { colors } from '../../lib/constants';
import { getStyleWithMod } from '../../lib/getStyleWithMod';

interface IButtonProps {
    title: string;
    onPress?: () => void;
    size: 'm' | 'l';
    outline?: boolean;
    style?: object;
}

export const Button: React.FC<IButtonProps> = props => {
    const title = props.title.toUpperCase();
    const Touchable =
        Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
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
            <Touchable accessibilityRole="button" onPress={props.onPress}>
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
        margin: 8,
        marginHorizontal: 16,
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
