import React, { useRef, useEffect } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';

import { Touchable } from './construct/Touchable';
import { colors, margins } from '../lib/constants';
import { fetchTaskText } from '../lib/fetchTaskText';
import { IFulfilledStore, IStoreTask } from '../typings/store';
import { openTasks } from '../store/openTask';

export interface ITaskCardProps {
    taskId: string;
}

interface IConnectProps {
    task: IStoreTask;
}

type ITaskCardPropsWithConnect = ITaskCardProps & IConnectProps & DispatchProp;

const numberOfLines = 3;

export const TaskCardPresenter: React.FC<ITaskCardPropsWithConnect> = props => {
    const { task } = props;
    const { title, text, path } = task;

    const placeholderOpacity = useRef(new Animated.Value(0));

    function animatePlaceholder() {
        placeholderOpacity.current.setValue(0);
        Animated.loop(
            Animated.timing(placeholderOpacity.current, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear
            })
        ).start();
    }

    useEffect(() => {
        animatePlaceholder();

        if (text === null) {
            fetchTaskText(props.dispatch, path);
        }
    }, []);

    return (
        <View style={styles.card}>
            <Touchable delay onClick={() => props.dispatch(openTasks(task))}>
                <View style={styles.padding}>
                    <Text style={styles.title}>
                        {title}
                    </Text>
                    {
                        text ?
                            <Text
                                style={styles.text}
                                numberOfLines={numberOfLines}
                            >
                                {text}
                            </Text> :
                        <>
                            {
                                new Array(numberOfLines).fill(0).map((_, i) => (
                                    <Animated.View
                                        key={i}
                                        style={[
                                            styles.textPlaceholder,
                                            { opacity: placeholderOpacity.current.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 0.5, 1] }) }
                                        ]}
                                    />
                                ))
                            }
                        </>
                    }
                </View>
            </Touchable>
        </View>
    )
};

export const TaskCard = connect(
    (state: IFulfilledStore, props: ITaskCardProps): IConnectProps => ({
        task: state.tasks[props.taskId]
    })
)(React.memo(TaskCardPresenter));

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderColor: colors.primary,
        borderWidth: 3,
        borderRadius: 10,
        elevation: 5,
        height: 110
    },
    padding: {
        paddingHorizontal: margins.m,
        paddingBottom: margins.m,
    },
    title: {
        color: colors.black,
        fontSize: 20,
        fontWeight: 'bold'
    },
    text: {
        color: colors.grey,
        fontSize: 15,
    },
    textPlaceholder: {
        backgroundColor: colors.lightGrey,
        height: 17,
        borderRadius: 100,
        marginVertical: 2,
    }
});
