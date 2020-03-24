import React from 'react';
import { StyleSheet, View, ListRenderItemInfo, Dimensions } from 'react-native';
import { connect, DispatchProp } from 'react-redux';

import { FlatListFixed } from '../construct/FlatListFixed';
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

export class LevelScreenPresenter extends BackListener<ILevelScreenProps> {
    render() {
        const { level } = this.props;

        return (
            <View style={styles.screen}>
                <Title size="l" title={level.testTitle} center />
                <Title size="m" title={level.title} center />
                <FlatListFixed
                    style={styles.list}
                    data={this.props.level.tasks}
                    renderItem={this.renderItem}
                    cellMinWidth={200}
                />
            </View>
        );
    }

    private renderItem = (item: string): React.ReactElement => {
        return (
            <TaskCard
                taskId={item}
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
    }
});

export const LevelScreen = connect(
    (state: IFulfilledStore): IConnectProps => ({
        level: state.levels[state.openedLevel as string]
    })
)(LevelScreenPresenter);
