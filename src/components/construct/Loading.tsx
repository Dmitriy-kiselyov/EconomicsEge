import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Animated, Easing, AppState } from 'react-native';

import { colors, margins } from '../../lib/constants';

const duration = 600; // делимое на 3

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
        Animated.sequence([
            Animated.delay(props.delay || 0),
            Animated.loop(
                Animated.timing(placeholderOpacity.current, {
                    toValue: 1,
                    duration,
                    easing: Easing.linear
                })
            )
        ]).start();
    }

    const handleAppStateChange = (newState: string) => {
        if (newState === 'active') {
            animatePlaceholder();
        }
    }

    useEffect(() => {
        animatePlaceholder();

        AppState.addEventListener('change', handleAppStateChange);

        return () => {
            AppState.removeEventListener('change', handleAppStateChange);
        }
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
