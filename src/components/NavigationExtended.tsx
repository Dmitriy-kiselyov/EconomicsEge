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

    const buttons: React.ReactElement[] = [];

    if (level && level.theory && !openedTheory) {
        const handleOpenTheory = () => dispatch(openTheory(level.id));

        buttons.push(<Button key="Теория" title="Теория" size="s" delay onClick={handleOpenTheory} />);
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
    }
});
