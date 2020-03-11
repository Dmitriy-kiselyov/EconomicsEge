import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect, DispatchProp } from 'react-redux';

import { Button } from './construct/Button';
import { Title } from './construct/Title';
import { TestSnippet } from './TestSnippet';
import { getTasks } from '../lib/getTasks';
import { ITasksCollection } from '../typings/tasks';
import { setTasks } from '../store/setTasks';
import { IStore } from '../typings/store';

interface IConnectProps {
    tasks: ITasksCollection | null;
}

type IAppProps = IConnectProps & DispatchProp;

export class AppPresenter extends React.PureComponent<IAppProps> {
    componentDidMount(): void {
        if (this.props.tasks == null) {
            getTasks().then(tasks => this.props.dispatch(setTasks(tasks)));
        }
    }

    render() {
        const { tasks } = this.props;

        return (
            <View style={styles.app}>
                {
                    // @ts-ignore Ты че сука пишешь
                    tasks ? this.renderTasks(tasks) : null
                }
            </View>
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
                        <TestSnippet
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
    app: {
        flex: 1,
        margin: 16,
    },
    margin: {
        marginTop: 16,
    },
    topButtons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
});

export const App = connect(
    (state: IStore): IConnectProps => ({
        tasks: state.tasks,
    })
)(AppPresenter);
