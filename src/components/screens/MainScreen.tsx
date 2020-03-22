import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { connect, DispatchProp } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import { Button } from '../construct/Button';
import { Title } from '../construct/Title';
import { TestInfo } from '../TestInfo';
import { getTasks } from '../../lib/getTasks';
import { setTasks } from '../../store/setTasks';
import { IStore, IStoreExam, IStoreTest } from '../../typings/store';
import { margins } from '../../lib/constants';

interface IConnectProps {
    exams: IStoreExam[] | null;
    tests: IStoreTest[] | null;
}

type IAppProps = IConnectProps & DispatchProp;

export class MainActivityPresenter extends React.PureComponent<IAppProps> {
    componentDidMount(): void {
        if (this.props.exams == null) {
            getTasks().then(tasks => {
                this.props.dispatch(setTasks(tasks));

                SplashScreen.hide();
            });
        }
    }

    render() {
        const { exams, tests } = this.props;

        return (
            <ScrollView>
                <View style={styles.screen}>
                    {
                        exams && tests ? this.renderTasks(exams, tests) : null
                    }
                </View>
            </ScrollView>
        );
    }

    private renderTasks(exams: IStoreExam[], tests: IStoreTest[]): React.ReactElement {
        return (
            <>
                <Title size="l" title="Экзамены" center />
                <View style={[styles.topButtons, styles.margin]}>
                    {
                        exams.map(exam => (
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
                    tests.map(test => (
                        <TestInfo
                            style={styles.margin}
                            key={test.title}
                            test={test}
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
        exams: state.exams,
        tests: state.tests
    })
)(MainActivityPresenter);
