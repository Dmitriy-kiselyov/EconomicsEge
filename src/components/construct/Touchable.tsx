import React from 'react';
import {
    Platform,
    TouchableNativeFeedback,
    TouchableOpacity,
} from 'react-native';

const TouchableNative = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

export interface ITouchable {
    delay?: boolean;
    onClick?: () => void;
    children: React.ReactElement;
}

const delayedClickHandler = (onClick?: () => void) => {
    return () => {
        if (onClick) {
            setTimeout(() => onClick(), 100); // анимация нажатия
        }
    }
};

export const Touchable: React.FC<ITouchable> = props => {
    return (
        // @ts-ignore
        <TouchableNative
            accessibilityRole="button"
            onPress={props.delay ? delayedClickHandler(props.onClick) : props.onClick}
        >
            {props.children}
        </TouchableNative>
    );
};
