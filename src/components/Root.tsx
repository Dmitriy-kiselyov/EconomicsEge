import React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { StyleSheet, View } from 'react-native';

import { MainScreen } from './screens/MainScreen';
import { LevelScreen } from './screens/LevelScreen';
import { IStore } from '../typings/store';
import { TasksScreen } from './screens/TasksScreen';
import { TheoryScreen } from './screens/TheoryScreen';
import { margins } from '../lib/constants';
import { NavigationExtended } from './NavigationExtended';
//import { ExampleScreen } from './screens/ExampleScreen';

interface IConnectProps {
    openedLevel: string | null;
    openedTask: string | null;
    openedTheory: string | null;
}

type IRootProps = IConnectProps & DispatchProp;

const RootPresenter: React.FC<IRootProps> = props => {
    //return <ExampleScreen />;

    const content = getContent(props);

    let root = content.element;
    if (content.navigation) {
        root = (
            <View style={styles.root}>
                <NavigationExtended />
                {root}
            </View>
        );
    }

    return root;
};

interface IContent {
    element: React.ReactElement;
    navigation?: boolean;
}

function getContent(props: IRootProps): IContent {
    if (props.openedTheory) {
        return { element: <TheoryScreen/>, navigation: true };
    }

    if (props.openedTask) {
        return { element: <TasksScreen/>, navigation: true };
    }

    if (props.openedLevel) {
        return { element: <LevelScreen/>, navigation: true };
    }

    return { element: <MainScreen/> };
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        margin: margins.l
    }
})

export const Root = connect(
    (state: IStore): IConnectProps => ({
        openedLevel: state.openedLevel,
        openedTask: state.openedTask,
        openedTheory: state.openedTheory
    })
)(RootPresenter);
