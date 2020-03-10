import React, { ComponentType } from 'react';
import { View, StyleSheet } from 'react-native';

import { Button } from './construct/Button';
import { Title } from './construct/Title';
import { TestSnippet } from './TestSnippet';

export const App: ComponentType = () => {
    return (
        <View style={styles.app}>
            <Title size="l" title="Экзамены" center />
            <View style={[styles.topButtons, styles.margin]}>
                <Button
                    onPress={() => console.log('BUTTON PRESS 1')}
                    title="ОГЭ"
                    size="l"
                />
                <Button
                    onPress={() => console.log('BUTTON PRESS 2')}
                    title="ЕГЭ"
                    size="l"
                />
            </View>
            <Title size="l" title="Тесты" style={styles.margin} center />
            <TestSnippet
                style={styles.margin}
                title="Проценты"
                levels={['Уровень 1', 'Уровень 2', 'Уровень 3']}
            />
            <TestSnippet
                style={styles.margin}
                title="Прогрессии"
                levels={['Уровень 1', 'Уровень 2']}
            />
            <TestSnippet
                style={styles.margin}
                title="Производные"
                levels={['Уровень 1', 'Уровень 2', 'Уровень 3']}
            />
        </View>
    );
};

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
