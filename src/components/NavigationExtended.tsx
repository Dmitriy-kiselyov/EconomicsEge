import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from './construct/Button';
import { Navigation } from './Navigation';
import { margins } from '../lib/constants';
import { openTheory } from '../store/openTheory';
import { IFulfilledStore } from '../typings/store';

export const NavigationExtended: React.FC<{}> = () => {
    const dispatch = useDispatch();
    const level = useSelector((state: IFulfilledStore) => state.openedLevel && state.levels[state.openedLevel]);
    const openedTheory = useSelector((state: IFulfilledStore) => state.openedTheory);
    const openedTask = useSelector((state: IFulfilledStore) => state.openedTask);

    const buttons: React.ReactElement[] = [];
    let first = true;
    const pushButton = (title: string, onClick: () => void) => {
        const style = first ? undefined : styles.marginLeft;
        const button = <Button style={style} key={title} title={title} size="s" delay onClick={onClick} />;

        buttons.push(button);
        first = false;
    }

    if (level && level.theory && !openedTheory) {
        const handleOpenTheory = () => dispatch(openTheory(level.id));

        pushButton("Теория", handleOpenTheory);
    }

    if (level && !openedTask && !openedTheory) {
        pushButton('Самостоятельная работа', () => {});
    }

    let buttonsElement = null;
    if (buttons.length) {
        buttonsElement = (
            <View style={styles.buttons}>
                {buttons}
            </View>
        )
    }

    return (
        <>
            <Navigation />
            { buttonsElement }
        </>
    )
};

const styles = StyleSheet.create({
    buttons: {
        marginTop: margins.m,
        flexDirection: 'row'
    },
    marginLeft: {
        marginLeft: margins.s,
    }
});
