import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

import { TextField  } from '../construct/TextField';
import { margins } from '../../lib/constants';

export const SettingsScreen: React.FC<{}> = () => {
    return (
        <>
            <Text style={styles.hint}>Представься, пожалуйста</Text>
            <View style={styles.studentInfo}>
                <View style={styles.studentName}>
                    <TextField
                        label='Имя / Фамилия'
                    />
                </View>
                <View style={styles.studentClass}>
                    <TextField
                        label='Класс'
                        maxLength={6}
                    />
                </View>
            </View>
            <Text style={styles.hint}>Для отправки сообщения учителю необходимо указать его почту</Text>
            <TextField
                label='Почта учителя'
                type='email'
            />
            <Text style={styles.hint}>Для загрузки заданий учитель должен отправить ссылку на папку в Яндекс.Диске. Укажи её сюда</Text>
            <TextField
                label='Ссылка на диск'
            />
        </>
    )
};

const styles = StyleSheet.create({
    studentInfo: {
        flexDirection: 'row',
    },
    studentName: {
        flex: 1,
        marginRight: margins.l,
    },
    studentClass: {
        flexBasis: 100,
    },
    hint: {
        fontSize: 16,
        fontStyle: 'italic',
        marginTop: margins.l,
    }
});
