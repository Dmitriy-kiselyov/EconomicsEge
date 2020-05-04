import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Title } from './Title';
import { ArrowButton, IArrowButtonDirection } from './ArrowButton';
import { margins } from '../../lib/constants';

export interface IScreenTitleProps {
    title: string;
    subtitle: string;

    left?: string;
    onLeftClick?: () => void;
    right?: string;
    onRightClick?: () => void;
}

export const ScreenTitle: React.FC<IScreenTitleProps> = props => {
    const { left, right, onLeftClick, onRightClick } = props;

    return (
        <>
            <Title size="l" title={props.title} center />
            <View style={styles.subtitle}>
                <Title size="m" title={props.subtitle} center />
                {left && createArrowButton('left', left, onLeftClick)}
                {right && createArrowButton('right', right, onRightClick)}
            </View>
        </>
    )
};

function createArrowButton(direction: IArrowButtonDirection, text: string, onClick?: () => void) {
    return (
        <View style={styles[direction]}>
            <ArrowButton
                text={text}
                direction={direction}
                onClick={onClick}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    subtitle: {
        position: 'relative',
        marginHorizontal: -margins.m,
    },
    left: {
        position: 'absolute',
        left: 0
    },
    right: {
        position: 'absolute',
        right: 0
    }
});
