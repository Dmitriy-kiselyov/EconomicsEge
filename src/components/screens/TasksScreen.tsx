import React from 'react';
import ViewPager from '@react-native-community/viewpager';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import { connect, DispatchProp } from 'react-redux';

import { BackListener } from '../construct/BackListener';
import { closeTask } from '../../store/closeTask';
import { margins } from '../../lib/constants';
import { IFulfilledStore, IStoreTask } from '../../typings/store';
import { Title } from '../construct/Title';

interface IConnectProps {
    levelTitle: string;
    testTitle: string;
    initialIndex: number;
    tasks: IStoreTask[];
}

type ITasksScreenProps = IConnectProps & DispatchProp;

class TasksScreenPresenter extends BackListener<ITasksScreenProps> {
    render() {
        const { testTitle, levelTitle, tasks } = this.props;

        return (
            <View style={styles.screen}>
                <Title size="l" title={testTitle} center />
                <Title size="m" title={levelTitle} center />
                <ViewPager
                    style={styles.pager}
                    initialPage={this.props.initialIndex}
                >
                    {
                        tasks.map(task => this.renderTask(task))
                    }
                </ViewPager>
            </View>
        );
    }

    private renderTask(task: IStoreTask): React.ReactElement {
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
            initialIndex: taskIndex,
            testTitle: level.testTitle,
            levelTitle: level.title,
            tasks: level.tasks.map(taskId => state.tasks[taskId])
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
