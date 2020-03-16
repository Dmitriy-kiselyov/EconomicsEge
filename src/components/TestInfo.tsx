import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect, DispatchProp, useDispatch } from 'react-redux';

import { Title } from './construct/Title';
import { Button } from './construct/Button';
import { IMultiLang, multiLang } from '../lib/multiLang';
import { colors, margins } from '../lib/constants';
import { openLevel } from '../store/openLevel';
import { IStore, IStoreTest } from '../typings/store';
import { ILevel } from '../typings/tasks';
import { getLevelFromStore } from '../lib/getLevelFromStore';

export interface ITestInfoProps {
    test: IStoreTest;
    style?: object;
}

interface IConnectProps {
    levels: ILevel[];
}

type ITestSnippetPropsWithConnect = ITestInfoProps & IConnectProps & DispatchProp;

const multiLangTasksCount: IMultiLang = {
    none: 'задач',
    one: 'задача',
    some: 'задачи',
    many: 'задач',
};

export const TestInfoPresenter: React.FC<ITestSnippetPropsWithConnect> = props => {
    const dispatch = useDispatch();

    const levels = props.levels.map((level, i) => (
        <View key={level.title} style={i !== 0 ? styles.marginLeft : undefined}>
            <Button
                title={level.title}
                size="m"
                key={level.title}
                outline
                delay
                onClick={() => dispatch(openLevel(level.id))}
            />
            <Text style={styles.info}>
                {
                    level.tasks.length + ' ' + multiLang(level.tasks.length, multiLangTasksCount)
                }
            </Text>
        </View>
    ));

    return (
        <View style={props.style}>
            <Title size="m" title={props.test.title} />
            <View style={styles.levels}>{levels}</View>
        </View>
    );
};

export const TestInfo = connect(
    (state: IStore, props: ITestInfoProps): IConnectProps => ({
        levels: props.test.levels.map(levelId => getLevelFromStore(state, levelId)) as ILevel[],
    })
)(TestInfoPresenter);

const styles = StyleSheet.create({
    levels: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: margins.m,
    },
    info: {
        textAlign: 'center',
        color: colors.grey,
        marginTop: margins.s,
    },
    marginLeft: {
        marginLeft: margins.m,
    },
});
