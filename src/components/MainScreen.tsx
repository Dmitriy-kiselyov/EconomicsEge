import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { connect, DispatchProp } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import { Button } from './construct/Button';
import { Title } from './construct/Title';
import { TestInfo } from './TestInfo';
import { getTasks } from '../lib/getTasks';
import { ITasksCollection } from '../typings/tasks';
import { setTasks } from '../store/setTasks';
import { IStore } from '../typings/store';
import { margins } from '../lib/constants';

interface IConnectProps {
    tasks: ITasksCollection | null;
}

type IAppProps = IConnectProps & DispatchProp;

export class MainActivityPresenter extends React.PureComponent<IAppProps> {
    componentDidMount(): void {
        if (this.props.tasks == null) {
            getTasks().then(tasks => {
                this.props.dispatch(setTasks(tasks));

                SplashScreen.hide();
            });
        }
    }

    render() {
        const { tasks } = this.props;

        return (
            <ScrollView>
                <View style={styles.screen}>
                    {
                        tasks ? this.renderTasks(tasks) : null
                    }
                </View>
            </ScrollView>
        );
    }

    private renderTasks(tasks: ITasksCollection): React.ReactElement {
        return (
            <>
                <Title size="l" title="Экзамены" center />
                <View style={[styles.topButtons, styles.margin]}>
                    {
                        tasks.exams.map(exam => (
                            <Button
                                title={exam.title}
                                key={exam.title}
                                size="l"
                            />
                        ))
                    }
                </View>
                <Title size="l" title="Тесты" style={styles.margin} center />
                {
                    tasks.tests.map(test => (
                        <TestInfo
                            style={styles.margin}
                            title={test.title}
                            key={test.title}
                            levels={test.levels}
                        />
                    ))
                }
            </>
        );
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: margins.l,
    },
    margin: {
        marginTop: margins.l,
    },
    topButtons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
});

export const MainScreen = connect(
    (state: IStore): IConnectProps => ({
        tasks: state.tasks,
    })
)(MainActivityPresenter);
