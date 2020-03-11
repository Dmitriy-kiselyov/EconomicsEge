import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Title } from './construct/Title';
import { Button } from './construct/Button';
import { ILevel } from '../typings/tasks';
import { IMultiLang, multiLang } from '../lib/multiLang';
import { colors } from '../lib/constants';

export interface ITestSnippetProps {
    title: string;
    levels: ILevel[];
    style?: object;
}

const multiLangTasksCount: IMultiLang = {
    none: 'задач',
    one: 'задача',
    some: 'задачи',
    many: 'задач',
};

export const TestSnippet: React.FC<ITestSnippetProps> = props => {
    const levels = props.levels.map((level, i) => (
        <View key={level.title} style={i !== 0 ? styles.marginLeft : undefined}>
            <Button title={level.title} size="m" key={level.title} outline />
            <Text style={styles.info}>
                {level.tasks.length +
                    ' ' +
                    multiLang(level.tasks.length, multiLangTasksCount)}
            </Text>
        </View>
    ));

    return (
        <View style={props.style}>
            <Title size="m" title={props.title} />
            <View style={styles.levels}>{levels}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    levels: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 8,
    },
    info: {
        textAlign: 'center',
        color: colors.grey,
        marginTop: 4,
    },
    marginLeft: {
        marginLeft: 8,
    },
});
