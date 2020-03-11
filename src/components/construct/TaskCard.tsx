import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Touchable } from './Touchable';
import { colors, margins } from '../../lib/constants';

export interface ITaskCardProps {
    title: string;
    text: string;
    style?: object;
}

export const TaskCard: React.FC<ITaskCardProps> = props => {
    const style: object[] = [styles.card];

    if (props.style) {
        style.push(props.style);
    }

    return (
        <View style={style}>
            <Touchable>
                <View style={styles.padding}>
                    <Text style={styles.title}>
                        {props.title}
                    </Text>
                    <Text
                        style={styles.text}
                        numberOfLines={3}
                    >
                        {props.text}
                    </Text>
                </View>
            </Touchable>
        </View>
    )
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderColor: colors.primaryDark,
        borderWidth: 2,
        borderRadius: 10,
        elevation: 5,
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
    }
});
