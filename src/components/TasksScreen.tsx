import React from 'react';
import ViewPager from '@react-native-community/viewpager';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import { connect, DispatchProp } from 'react-redux';

import { BackListener } from './construct/BackListener';
import { closeTask } from '../store/closeTask';
import { margins } from '../lib/constants';
import { ILevel, ITask } from '../typings/tasks';
import { IFulfilledStore, IStoreLevel } from '../typings/store';
import { Title } from './construct/Title';
import { getLevelFromStore } from '../lib/getLevelFromStore';

interface IConnectProps {
    level: ILevel;
    initialIndex: number;
    testTitle: string;
}

type ITasksScreenProps = IConnectProps & DispatchProp;

class TasksScreenPresenter extends BackListener<ITasksScreenProps> {
    render() {
        return (
            <View style={styles.screen}>
                <Title size="l" title={this.props.testTitle} center />
                <Title size="m" title={this.props.level.title} center />
                <ViewPager
                    style={styles.pager}
                    initialPage={this.props.initialIndex}
                >
                    {
                        this.props.level.tasks.map(task => this.renderTask(task))
                    }
                </ViewPager>
            </View>
        );
    }

    private renderTask(task: ITask): React.ReactElement {
        return (
            <ScrollView key={task.path} style={styles.task}>
                <Title size="m" title={task.title}/>
                <Text style={styles.text}>{task.text}</Text>
            </ScrollView>
        )
    }

    protected handleBack = () => {
        this.props.dispatch(closeTask());

        return true;
    }
}

export const TasksScreen = connect(
    (state: IFulfilledStore): IConnectProps => {
        const openedTask = state.openedTask as string;
        const openedLevel = state.openedLevel as string;
        const level = state.levels[openedLevel];
        const taskIndex = level.tasks.indexOf(openedTask);

        return {
            level: getLevelFromStore(state, openedLevel) as ILevel,
            initialIndex: taskIndex,
            testTitle: level.testTitle,
        };
    }
)(TasksScreenPresenter);

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        margin: margins.l,
    },
    pager: {
        flex: 1,
        marginHorizontal: -margins.l,
        marginTop: margins.l,
        marginBottom: -margins.l,
    },
    task: {
        paddingHorizontal: margins.l,
        paddingBottom: margins.l,
    },
    text: {
        fontSize: 17,
    }
});
