import React, { ComponentType } from 'react';
import { View, StyleSheet } from 'react-native';

import { Button } from './construct/Button';
import { Title } from './construct/Title';
import { TestSnippet } from './TestSnippet';
import { getTasks } from '../lib/getTasks';
import { IAllTasks } from '../typings/tasks';

interface IState {
    tasks: IAllTasks | null;
}

export class App extends React.PureComponent<{}, IState> {
    public state = {
        tasks: null,
    };

    componentDidMount(): void {
        getTasks().then(tasks => this.setState({ tasks }));
    }

    render() {
        const { tasks } = this.state;

        return (
            <View style={styles.app}>
                {
                    // @ts-ignore Ты че сука пишешь
                    tasks ? this.renderTasks(tasks) : null
                }
            </View>
        );
    }

    private renderTasks(tasks: IAllTasks): React.ReactElement {
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
