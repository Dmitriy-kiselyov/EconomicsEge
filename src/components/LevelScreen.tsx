import React from 'react';
import { StyleSheet, View, FlatList, ListRenderItemInfo } from 'react-native';
import { connect, DispatchProp } from 'react-redux';

import { closeLevel } from '../store/closeLevel';
import { ILevel, ITask } from '../typings/tasks';
import { IStore } from '../typings/store';
import { Title } from './construct/Title';
import { margins } from '../lib/constants';
import { TaskCard } from './construct/TaskCard';
import { findLevel, IFindLevelResult } from '../lib/storeHelpers';
import { fetchTaskText } from '../lib/fetchTaskText';
import { BackListener } from './construct/BackListener';
import { openTasks } from '../store/openTask';

interface IConnectProps {
    level: ILevel;
    testName: string;
}

type ILevelScreenProps = IConnectProps & DispatchProp;

interface IEmptyCell {
    empty: true;
}

const columns = 2;

export class LevelScreenPresenter extends BackListener<ILevelScreenProps> {
    render() {
        return (
            <View style={styles.screen}>
                <Title size="l" title={this.props.testName} center />
                <Title size="m" title={this.props.level.title} center />
                <FlatList
                    style={styles.list}
                    data={this.getFilledWithEmptyData()}
                    renderItem={this.renderCell}
                    numColumns={columns}
                    keyExtractor={(item: unknown, index: number) => String(index)}
                />
            </View>
        );
    }

    private getFilledWithEmptyData(): Array<ITask | IEmptyCell> {
        const length = this.props.level.tasks.length;
        const rest = new Array(this.getDivisibleLength() - length).fill({ empty: true });

        return this.props.level.tasks.concat(rest);
    }

    private getDivisibleLength(): number {
        const length = this.props.level.tasks.length;

        if (length % columns === 0) {
            return length;
        }

        return Math.ceil(length / columns) * columns;
    }

    private renderCell = (item: ListRenderItemInfo<ITask | IEmptyCell>): React.ReactElement => {
        let { item: task, index } = item;
        const style: object[] = [styles.cell];

        if (index % columns === 0) {
            style.push(styles.cellLeft);
        }
        if ((index + 1) % columns === 0) {
            style.push(styles.cellRight);
        }
        if (index === this.props.level.tasks.length - 1) {
            style.push(styles.cellBottom);
        }

        if ((task as IEmptyCell).empty) {
            style.push(styles.cellInvisible);

            return (
                <View style={style}/>
            );
        }

        task = task as ITask;

        if (!task.text) {
            fetchTaskText(this.props.dispatch, this.props.level.id, task.path);
        }

        return (
            <TaskCard
                title={task.title}
                text={task.text || 'Загрузка...'}
                style={style}
                onClick={() => this.props.dispatch(openTasks(task as ITask))}
            />
        )
    };

    protected handleBack = () => {
        this.props.dispatch(closeLevel());

        return true;
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        margin: margins.l,
    },
    list: {
        marginHorizontal: -margins.l,
        marginBottom: -margins.l,
        marginTop: margins.l,
    },
    cellLeft: {
        marginLeft: margins.l
    },
    cellRight: {
        marginRight: margins.l
    },
    cellBottom: {
        marginBottom: margins.l,
    },
    cell: {
        margin: margins.s,
        flex: 1,
    },
    cellInvisible: {
        backgroundColor: 'transparent',
    }
});

export const LevelScreen = connect(
    (state: IStore): IConnectProps => {
        const { test, level } = findLevel(state, state.openedLevel as string) as IFindLevelResult;

        return {
            level,
            testName: test.title
        };
    }
)(LevelScreenPresenter);
