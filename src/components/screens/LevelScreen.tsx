import React from 'react';
import { StyleSheet, View, FlatList, ListRenderItemInfo } from 'react-native';
import { connect, DispatchProp } from 'react-redux';

import { closeLevel } from '../../store/closeLevel';
import { IFulfilledStore, IStoreLevel } from '../../typings/store';
import { Title } from '../construct/Title';
import { margins } from '../../lib/constants';
import { TaskCard } from '../TaskCard';
import { BackListener } from '../construct/BackListener';

interface IConnectProps {
    level: IStoreLevel;
}

type ILevelScreenProps = IConnectProps & DispatchProp;

const columns = 2;

export class LevelScreenPresenter extends BackListener<ILevelScreenProps> {
    render() {
        const { level } = this.props;

        return (
            <View style={styles.screen}>
                <Title size="l" title={level.testTitle} center />
                <Title size="m" title={level.title} center />
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

    private getFilledWithEmptyData(): Array<string | false> {
        const { level } = this.props;
        const length = level.tasks.length;
        const rest = new Array(this.getDivisibleLength() - length).fill(false);

        return level.tasks.concat(rest);
    }

    private getDivisibleLength(): number {
        const length = this.props.level.tasks.length;

        if (length % columns === 0) {
            return length;
        }

        return Math.ceil(length / columns) * columns;
    }

    private renderCell = (item: ListRenderItemInfo<string | false>): React.ReactElement => {
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

        if (task === false) {
            style.push(styles.cellInvisible);

            return (
                <View style={style}/>
            );
        }

        return (
            <View style={style}>
                <TaskCard
                    taskId={task}
                />
            </View>
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
    (state: IFulfilledStore): IConnectProps => ({
        level: state.levels[state.openedLevel as string]
    })
)(LevelScreenPresenter);
