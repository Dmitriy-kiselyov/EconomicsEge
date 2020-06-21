import React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { StyleSheet, View } from 'react-native';

import { MainScreen } from './screens/MainScreen';
import { TaskListScreen } from './screens/TaskListScreen';
import { IStore } from '../typings/store';
import { TaskScreen } from './screens/TaskScreen';
import { PdfScreen } from './screens/PdfScreen';
import { margins } from '../lib/constants';
import { NavigationExtended } from './NavigationExtended';
import { SettingsScreen } from './screens/SettingsScreen';
//import { ExampleScreen } from './screens/ExampleScreen';

interface IConnectProps {
    openedLevel: string | null;
    openedExam: string | null;
    openedTask: string | null;
    openedTheory: string | null;
    openedSample: string | null;
    openedSettings: boolean;
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
    if (props.openedSettings) {
        return { element: <SettingsScreen />, navigation: true };
    }

    if (props.openedTheory) {
        return { element: <PdfScreen path={props.openedTheory} />, navigation: true };
    }

    if (props.openedSample) {
        return { element: <PdfScreen path={props.openedSample} />, navigation: true };
    }

    if (props.openedTask) {
        return { element: <TaskScreen/>, navigation: true };
    }

    if (props.openedLevel || props.openedExam) {
        return { element: <TaskListScreen/>, navigation: true };
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
        openedTheory: state.openedTheory,
        openedSample: state.openedSample,
        openedSettings: state.openedSettings,
        openedExam: state.openedExam
    })
)(RootPresenter);
