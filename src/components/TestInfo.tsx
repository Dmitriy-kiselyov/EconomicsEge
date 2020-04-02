import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect, DispatchProp, useDispatch } from 'react-redux';

import { Title } from './construct/Title';
import { Button } from './construct/Button';
import { IMultiLang, multiLang } from '../lib/multiLang';
import { colors, margins } from '../lib/constants';
import { openLevel } from '../store/openLevel';
import { IFulfilledStore, IStoreLevel, IStoreTest } from '../typings/store';

export interface ITestInfoProps {
    test: IStoreTest;
    style?: object;
}

interface IConnectProps {
    levels: IStoreLevel[];
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

    const levels = props.levels.map(level => (
        <View key={level.title} style={styles.marginLeft}>
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
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.scroll}
            >
                <View style={styles.scrollContent}>
                    <Button title="Теория" size="m" outline delay/>
                    {levels}
                </View>
            </ScrollView>
        </View>
    );
};

export const TestInfo = connect(
    (state: IFulfilledStore, props: ITestInfoProps): IConnectProps => ({
        levels: props.test.levels.map(levelId => state.levels[levelId])
    })
)(TestInfoPresenter);

const styles = StyleSheet.create({
    scroll: {
        marginHorizontal: -margins.l,
        marginTop: margins.m
    },
    scrollContent: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: margins.l,
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
