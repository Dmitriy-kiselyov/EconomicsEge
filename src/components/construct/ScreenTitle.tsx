import React from 'react';

import { Title } from './Title';

export interface IScreenTitleProps {
    title: string;
    subtitle: string;
}

export const ScreenTitle: React.FC<IScreenTitleProps> = props => {
    return (
        <>
            <Title size="l" title={props.title} center />
            <Title size="m" title={props.subtitle} center />
        </>
    )
};
