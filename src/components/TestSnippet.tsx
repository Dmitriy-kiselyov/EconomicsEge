import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Title } from './construct/Title';
import { Button } from './construct/Button';

export interface ITestSnippetProps {
    title: string;
    levels: string[];
    style?: object;
}

export const TestSnippet: React.FC<ITestSnippetProps> = props => {
    const buttons = props.levels.map((level, i) => (
        <Button
            title={level}
            size="m"
            key={level}
            outline
            style={i !== 0 ? styles.marginLeft : undefined}
        />
    ));

    return (
        <View style={props.style}>
            <Title size="m" title={props.title} />
            <View style={styles.buttons}>{buttons}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 8,
    },
    marginLeft: {
        marginLeft: 8,
    },
});
