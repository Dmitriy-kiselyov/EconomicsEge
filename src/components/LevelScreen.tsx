import React from 'react';
import { Text } from 'react-native';
import { useDispatch } from 'react-redux';

import { closeLevel } from '../store/closeLevel';

export const LevelScreen: React.FC<{}> = () => {
    const dispatch = useDispatch();

    return (
        <Text onPress={() => dispatch(closeLevel())}>
            Привет!!!
        </Text>
    );
};
