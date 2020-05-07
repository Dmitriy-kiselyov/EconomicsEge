import React from 'react';
import ViewPager, { ViewPagerOnPageSelectedEventData } from '@react-native-community/viewpager';
import { Text, StyleSheet, View, ScrollView, NativeSyntheticEvent } from 'react-native';
import { connect, DispatchProp } from 'react-redux';
import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker';

import { colors, margins } from '../../lib/constants';
import { IFulfilledStore, IStoreExam, IStoreTask } from '../../typings/store';
import { openTask } from '../../store/openTask';
import { Button } from '../construct/Button';
import { setTaskState } from '../../store/setTaskState';
import { ClickableIcon } from '../construct/ClickableIcon';
import { getStyleWithMod } from '../../lib/getStyleWithMod';

interface IConnectProps {
    initialIndex: number;
    tasks: IStoreTask[];
}

type ITaskScreenProps = IConnectProps & DispatchProp;

class TaskScreenPresenter extends React.PureComponent<ITaskScreenProps> {
    render() {
        const { tasks } = this.props;

        return (
            <>
                <ViewPager
                    style={styles.pager}
                    initialPage={this.props.initialIndex}
                    onPageSelected={this.handlePageChange}
                >
                    {
                        tasks.map(task => this.renderTask(task))
                    }
                </ViewPager>
                {this.renderFooter()}
            </>
        );
    }

    private renderFooter(): React.ReactElement {
        const { state } = this.getCurrentTask();
        const footerStyle = getStyleWithMod(styles, 'footer', { status: state });

        return (
            <View style={footerStyle}>
                {
                    state !== 'none' &&
                    <ClickableIcon
                        size={45}
                        type={state === 'wrong' ? 'wrongActive' : 'wrong'}
                        onClick={this.handleWrongClick}
                    />
                }
                {this.renderStatus()}
                {
                    state !== 'none' &&
                    <ClickableIcon
                        size={45}
                        type={state === 'correct' ? 'correctActive' : 'correct'}
                        onClick={this.handleCorrectClick}
                    />
                }
            </View>
        );
    }

    private renderStatus(): React.ReactElement {
        const { state } = this.getCurrentTask();

        switch (state) {
            case 'none':
                return <Button title="Сфотографировать и отправить" size="s" delay onClick={this.handleOpenCamera} />;
            case 'wrong':
                return <Button title="Попробовать еще раз" size="s" delay onClick={this.handleOpenCamera} />;
            case 'correct':
                return <Text style={styles.statusText}>Верное решение</Text>;
            case 'sent':
                return <Text style={styles.statusText}>Отправлено учителю</Text>;
        }
    }

    private handleCorrectClick = () => {
        const { state } = this.getCurrentTask();
        const status = state === 'correct' ? 'sent' : 'correct';

        this.props.dispatch(setTaskState(this.getCurrentTask().path, status));
    }

    private handleWrongClick = () => {
        const { state } = this.getCurrentTask();
        const status = state === 'wrong' ? 'sent' : 'wrong';

        this.props.dispatch(setTaskState(this.getCurrentTask().path, status));
    }

    private handleOpenCamera = () => {
        ImagePicker.launchCamera({}, (response: ImagePickerResponse) => {
            if (response.didCancel) {
                return;
            }

            //TODO: SEND PHOTO
            this.props.dispatch(setTaskState(this.getCurrentTask().path, 'sent'));
        });
    }

    private handlePageChange = (e: NativeSyntheticEvent<ViewPagerOnPageSelectedEventData>) => {
        const taskPosition = e.nativeEvent.position;
        const task = this.props.tasks[taskPosition];

        if (this.getCurrentTask() !== task) { // вызывает событие при первом рендере
            this.props.dispatch(openTask(task));
        }
    }

    private renderTask(task: IStoreTask): React.ReactElement {
        return (
            <ScrollView key={task.path} style={styles.task}>
                <Text style={styles.text}>{task.text}</Text>
            </ScrollView>
        )
    }

    private getCurrentTask(): IStoreTask {
        return this.props.tasks[this.props.initialIndex];
    }
}

export const TaskScreen = connect(
    (state: IFulfilledStore): IConnectProps => {
        const openedTask = state.openedTask as string;

        if (state.openedExam) {
            const exam = state.exams.find(exam => exam.title === state.openedExam) as IStoreExam;

            return {
                initialIndex: exam.tasks.indexOf(openedTask),
                tasks: exam.tasks.map(taskId => state.tasks[taskId])
            }
        }

        // openedLevel
        const openedLevel = state.openedLevel as string;
        const level = state.levels[openedLevel];
        const taskIndex = level.tasks.indexOf(openedTask);

        return {
            initialIndex: taskIndex,
            tasks: level.tasks.map(taskId => state.tasks[taskId])
        };
    }
)(TaskScreenPresenter);

const styles = StyleSheet.create({
    pager: {
        flex: 1,
        marginHorizontal: -margins.l,
        marginTop: margins.l,
        marginBottom: -margins.l,
    },
    task: {
        paddingHorizontal: margins.l,
        paddingBottom: margins.l,
    },
    footer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        width: '100%',
        height: 55
    },
    footerStatusNone: {
        justifyContent: 'center',
    },
    statusText: {
        fontSize: 15,
        textTransform: 'uppercase',
        fontWeight: '700',
        color: colors.primary,
        margin: margins.m,
    },
    text: {
        fontSize: 17,
    }
});
