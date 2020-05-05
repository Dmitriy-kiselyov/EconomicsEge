import React from 'react';
import { StyleSheet } from 'react-native';
import { connect, DispatchProp } from 'react-redux';

import { FlatListFixed } from '../construct/FlatListFixed';
import { IFulfilledStore, IStoreLevel } from '../../typings/store';
import { margins } from '../../lib/constants';
import { TaskCard } from '../TaskCard';

interface IConnectProps {
    level: IStoreLevel;
}

type ILevelScreenProps = IConnectProps & DispatchProp;

export class LevelScreenPresenter extends React.PureComponent<ILevelScreenProps> {
    render() {
        return (
            <FlatListFixed
                style={styles.list}
                data={this.props.level.tasks}
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

export const LevelScreen = connect(
    (state: IFulfilledStore): IConnectProps => ({
        level: state.levels[state.openedLevel as string]
    })
)(LevelScreenPresenter);
