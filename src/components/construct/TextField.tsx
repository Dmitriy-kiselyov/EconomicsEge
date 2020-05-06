import React from 'react';
import { TextField as BaseField, TextFieldProps } from 'react-native-material-textfield';

import { colors } from '../../lib/constants';

export interface ITextFieldProps extends TextFieldProps {
    type?: 'email';
}

// https://www.npmjs.com/package/react-native-material-textfield
// https://react-native.org/doc/textinput.html
export const TextField: React.FC<ITextFieldProps> = props => (
    <BaseField
        {...props}
        tintColor={colors.primary}
        keyboardType={props.type === 'email' ? 'email-address' : 'default'}
        maxLength={props.maxLength || 50}
    />
);
