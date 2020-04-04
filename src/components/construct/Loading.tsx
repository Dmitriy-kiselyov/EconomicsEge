import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';

import { colors, margins } from '../../lib/constants';

const duration = 300; // делимое на 3

export const Loading: React.FC = () => (
    <View style={styles.loading}>
        <Dot />
        <Dot delay={duration / 3} />
        <Dot delay={duration / 3 * 2} />
    </View>
);

interface IDotProps {
    delay?: number;
}

const Dot: React.FC<IDotProps> = props => {
    const placeholderOpacity = useRef(new Animated.Value(0));

    function animatePlaceholder() {
        placeholderOpacity.current.setValue(0);
        Animated.loop(
            Animated.timing(placeholderOpacity.current, {
                toValue: 1,
                duration,
                easing: Easing.linear
            })
        ).start();
    }

    useEffect(() => {
        setTimeout(animatePlaceholder, props.delay || 0);
    }, []);

    return (
        <Animated.View
            style={[
                styles.dot,
                { opacity: placeholderOpacity.current.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 1, 0] }) }
            ]}
        />
    );
};

const size = 12;

const styles = StyleSheet.create({
    loading: {
        flexDirection: 'row'
    },
    dot: {
        marginHorizontal: margins.s,
        width: size,
        height: size,
        borderRadius: size,
        backgroundColor: colors.primary
    }
});
