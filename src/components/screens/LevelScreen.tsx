import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect, DispatchProp } from 'react-redux';

import { FlatListFixed } from '../construct/FlatListFixed';
import { closeLevel } from '../../store/closeLevel';
import { IFulfilledStore, IStoreLevel } from '../../typings/store';
import { margins } from '../../lib/constants';
import { TaskCard } from '../TaskCard';
import { BackListener } from '../construct/BackListener';
import { ScreenTitle } from '../construct/ScreenTitle';
import { openTheory } from '../../store/openTheory';

interface IConnectProps {
    level: IStoreLevel;
}

type ILevelScreenProps = IConnectProps & DispatchProp;

export class LevelScreenPresenter extends BackListener<ILevelScreenProps> {
    render() {
        const { level } = this.props;
        const { theory } = level;

        return (
            <View style={styles.screen}>
                <ScreenTitle
                    title={level.testTitle}
                    subtitle={level.title}

                    left={theory ? 'Теория' : undefined}
                    onLeftClick={this.handleOpenTheory}
                />
                <FlatListFixed
                    style={styles.list}
                    data={this.props.level.tasks}
                    renderItem={this.renderItem}
                    cellMinWidth={180}
                />
            </View>
        );
    }

    private handleOpenTheory = () => {
        this.props.dispatch(openTheory(this.props.level.theory as string, this.props.level.id));
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
