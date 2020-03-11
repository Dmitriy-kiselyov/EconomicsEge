import React from 'react';
import { BackHandler, StyleSheet, View, FlatList, ListRenderItemInfo } from 'react-native';
import { connect, DispatchProp } from 'react-redux';

import { closeLevel } from '../store/closeLevel';
import { ILevel, ITask, ITest } from '../typings/tasks';
import { IStore } from '../typings/store';
import { Title } from './construct/Title';
import { margins } from '../lib/constants';
import { TaskCard } from './construct/TaskCard';

interface IConnectProps {
    level: ILevel;
    testName: string;
}

type ILevelScreenProps = IConnectProps & DispatchProp;

interface IEmptyCell {
    empty: true;
}

const columns = 2;

export class LevelScreenPresenter extends React.PureComponent<ILevelScreenProps> {
    componentDidMount(): void {
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    componentWillUnmount(): void {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

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
        const { item: task, index } = item;
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

        return (
            <TaskCard
                title={(task as ITask).title}
                text="У мальчика Пети было 2 яблока, а у девочки Наташи было 1 яблоко"
                style={style}
            />
        )
    };

    private handleBack = () => {
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
        const tests = state.tasks?.tests as ITest[];

        for (const test of tests) {
            for (const level of test.levels) {
                if (level.id === state.openedLevel) {
                    return {
                        level,
                        testName: test.title
                    };
                }
            }
        }

        // @ts-ignore невозможно
        return null;
    }
)(LevelScreenPresenter);
