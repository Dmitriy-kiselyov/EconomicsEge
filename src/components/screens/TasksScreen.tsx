import React from 'react';
import ViewPager, { ViewPagerOnPageSelectedEventData } from '@react-native-community/viewpager';
import { Text, StyleSheet, View, ScrollView, NativeSyntheticEvent } from 'react-native';
import { connect, DispatchProp } from 'react-redux';

import { margins } from '../../lib/constants';
import { IFulfilledStore, IStoreTask } from '../../typings/store';
import { openTasks } from '../../store/openTask';
import { NavigationExtended } from '../NavigationExtended';

interface IConnectProps {
    initialIndex: number;
    tasks: IStoreTask[];
}

type ITasksScreenProps = IConnectProps & DispatchProp;

class TasksScreenPresenter extends React.PureComponent<ITasksScreenProps> {
    private currentTask = this.props.tasks[this.props.initialIndex];

    render() {
        const { tasks } = this.props;

        return (
            <ViewPager
                style={styles.pager}
                initialPage={this.props.initialIndex}
                onPageSelected={this.handlePageChange}
            >
                {
                    tasks.map(task => this.renderTask(task))
                }
            </ViewPager>
        );
    }

    private handlePageChange = (e: NativeSyntheticEvent<ViewPagerOnPageSelectedEventData>) => {
        const taskPosition = e.nativeEvent.position;
        const task = this.props.tasks[taskPosition];

        if (this.currentTask !== task) { // вызывает событие при первом рендере
            this.currentTask = task;

            this.props.dispatch(openTasks(task));
        }
    }

    private renderTask(task: IStoreTask): React.ReactElement {
        return (
            <ScrollView key={task.path} style={styles.task}>
                <Text style={styles.text}>{task.text}</Text>
            </ScrollView>
        )
    }
}

export const TasksScreen = connect(
    (state: IFulfilledStore): IConnectProps => {
        const openedTask = state.openedTask as string;
        const openedLevel = state.openedLevel as string;
        const level = state.levels[openedLevel];
        const taskIndex = level.tasks.indexOf(openedTask);

        return {
            initialIndex: taskIndex,
            tasks: level.tasks.map(taskId => state.tasks[taskId])
        };
    }
)(TasksScreenPresenter);

const styles = StyleSheet.create({
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
