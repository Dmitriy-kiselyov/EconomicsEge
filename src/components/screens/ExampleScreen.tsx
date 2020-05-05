import React from 'react';
import { View, StyleSheet } from 'react-native';

import { margins } from '../../lib/constants';
import { Navigation } from '../Navigation';

export const ExampleScreen: React.FC<{}> = () => (
    <View style={styles.screen}>
        <Navigation />
    </View>
);

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: margins.l,
    }
})
