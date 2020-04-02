import React from 'react';
import { connect, DispatchProp } from 'react-redux';

import { MainScreen } from './screens/MainScreen';
import { LevelScreen } from './screens/LevelScreen';
import { IStore } from '../typings/store';
import { TasksScreen } from './screens/TasksScreen';
import { TheoryScreen } from './screens/TheoryScreen';

interface IConnectProps {
    openedLevel: string | null;
    openedTask: string | null;
    openedTheory: string | null;
}

type IRootProps = IConnectProps & DispatchProp;

const RootPresenter: React.FC<IRootProps> = props => {
    if (props.openedTheory) {
        return <TheoryScreen/>;
    }

    if (props.openedTask) {
        return <TasksScreen/>;
    }

    if (props.openedLevel) {
        return <LevelScreen/>;
    }

    return <MainScreen/>
};

export const Root = connect(
    (state: IStore): IConnectProps => ({
        openedLevel: state.openedLevel,
        openedTask: state.openedTask,
        openedTheory: state.openedTheory
    })
)(RootPresenter);
