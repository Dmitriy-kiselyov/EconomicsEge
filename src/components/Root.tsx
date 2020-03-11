import React from 'react';
import { connect, DispatchProp } from 'react-redux';

import { MainScreen } from './MainScreen';
import { LevelScreen } from './LevelScreen';
import { IStore } from '../typings/store';

interface IConnectProps {
    openedLevel: string | null;
}

type IRootProps = IConnectProps & DispatchProp;

const RootPresenter: React.FC<IRootProps> = props => {
    if (props.openedLevel) {
        return <LevelScreen/>;
    }

    return <MainScreen/>
};

export const Root = connect(
    (state: IStore): IConnectProps => ({
        openedLevel: state.openedLevel,
    })
)(RootPresenter);
