import React from 'react';
import { connect, DispatchProp } from 'react-redux';

import { MainScreen } from './screens/MainScreen';
import { LevelScreen } from './screens/LevelScreen';
import { IStore } from '../typings/store';
import { TasksScreen } from './screens/TasksScreen';

interface IConnectProps {
    openedLevel: string | null;
    openedTask: string | null;
}

type IRootProps = IConnectProps & DispatchProp;

const RootPresenter: React.FC<IRootProps> = props => {
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
    })
)(RootPresenter);
