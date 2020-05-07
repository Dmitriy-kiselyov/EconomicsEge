import React from 'react';
import { StyleSheet } from 'react-native';
import { connect, DispatchProp } from 'react-redux';

import { FlatListFixed } from '../construct/FlatListFixed';
import { IFulfilledStore, IStoreExam, IStoreLevel } from '../../typings/store';
import { margins } from '../../lib/constants';
import { TaskCard } from '../TaskCard';

interface IConnectProps {
    tasks: string[];
}

type ITaskListScreenProps = IConnectProps & DispatchProp;

export class TaskListScreenPresenter extends React.PureComponent<ITaskListScreenProps> {
    render() {
        return (
            <FlatListFixed
                style={styles.list}
                data={this.props.tasks}
                renderItem={this.renderItem}
                cellMinWidth={180}
            />
        );
    }

    private renderItem = (item: string): React.ReactElement => {
        return (
            <TaskCard
                taskId={item}
            />
        )
    };
}

const styles = StyleSheet.create({
    list: {
        marginHorizontal: -margins.l,
        marginBottom: -margins.l,
        marginTop: margins.l,
    }
});

export const TaskListScreen = connect(
    (state: IFulfilledStore): IConnectProps => {
        if (state.openedExam) {
            const exam = state.exams.find(exam => exam.title === state.openedExam) as IStoreExam;

            return {
                tasks: exam.tasks
            }
        }

        return {
            tasks: state.levels[state.openedLevel as string].tasks
        }
    }
)(TaskListScreenPresenter);
