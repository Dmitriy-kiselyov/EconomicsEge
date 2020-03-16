import React, { useRef, useEffect } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';

import { Touchable } from './Touchable';
import { colors, margins } from '../../lib/constants';

export interface ITaskCardProps {
    title: string;
    text: string | null;
    style?: object;
    onClick?: () => void;
}

const numberOfLines = 3;

export const TaskCard: React.FC<ITaskCardProps> = props => {
    const style: object[] = [styles.card];
    const placeholderOpacity = useRef(new Animated.Value(0));

    function animatePlaceholder() {
        placeholderOpacity.current.setValue(0);
        Animated.loop(
            Animated.timing(placeholderOpacity.current, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear
            })
        ).start();
    }

    useEffect(() => {
        animatePlaceholder();
    }, []);

    if (props.style) {
        style.push(props.style);
    }

    return (
        <View style={style}>
            <Touchable delay onClick={props.onClick}>
                <View style={styles.padding}>
                    <Text style={styles.title}>
                        {props.title}
                    </Text>
                    {
                        props.text ?
                            <Text
                                style={styles.text}
                                numberOfLines={numberOfLines}
                            >
                                {props.text}
                            </Text> :
                        <>
                            {
                                new Array(numberOfLines).fill(0).map((_, i) => (
                                    <Animated.View
                                        key={i}
                                        style={[
                                            styles.textPlaceholder,
                                            { opacity: placeholderOpacity.current.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 0.5, 1] }) }
                                        ]}
                                    />
                                ))
                            }
                        </>
                    }
                </View>
            </Touchable>
        </View>
    )
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderColor: colors.primary,
        borderWidth: 3,
        borderRadius: 10,
        elevation: 5,
        height: 110
    },
    padding: {
        paddingHorizontal: margins.m,
        paddingBottom: margins.m,
    },
    title: {
        color: colors.black,
        fontSize: 20,
        fontWeight: 'bold'
    },
    text: {
        color: colors.grey,
        fontSize: 15,
    },
    textPlaceholder: {
        backgroundColor: colors.lightGrey,
        height: 17,
        borderRadius: 100,
        marginVertical: 2,
    }
});
