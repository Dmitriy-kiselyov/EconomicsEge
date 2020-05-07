import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from './construct/Button';
import { Navigation } from './Navigation';
import { margins } from '../lib/constants';
import { openTheory } from '../store/openTheory';
import { IFulfilledStore } from '../typings/store';
import { openSettings } from '../store/openSettings';

export const NavigationExtended: React.FC<{}> = () => {
    const dispatch = useDispatch();
    const level = useSelector((state: IFulfilledStore) => state.openedLevel && state.levels[state.openedLevel]);
    const openedTheory = useSelector((state: IFulfilledStore) => state.openedTheory);
    const openedSettings = useSelector((state: IFulfilledStore) => state.openedSettings);

    const buttons: React.ReactElement[] = [];
    let first = true;
    const pushButton = (title: string, onClick: () => void) => {
        const style = first ? undefined : styles.marginLeft;
        const button = <Button style={style} key={title} title={title} size="s" delay onClick={onClick} />;

        buttons.push(button);
        first = false;
    }

    if (level && level.theory && !openedTheory && !openedSettings) {
        const handleOpenTheory = () => dispatch(openTheory(level.id));

        pushButton("Теория", handleOpenTheory);
    }

    if (!openedTheory && !openedSettings) {
        pushButton('Настройки', () => dispatch(openSettings()));
    }

    let buttonsElement = null;
    if (buttons.length) {
        buttonsElement = (
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.scroll}
                contentContainerStyle={styles.buttons}
            >
                {buttons}
            </ScrollView>
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
    scroll: {
        marginHorizontal: -margins.l,
        marginTop: margins.m,
        marginBottom: -margins.s, // shadow compensation
        flexShrink: 0,
        flexGrow: 0,
    },
    buttons: {
        paddingBottom: margins.s, // shadow
        paddingHorizontal: margins.l,
        flexDirection: 'row'
    },
    marginLeft: {
        marginLeft: margins.s,
    }
});
