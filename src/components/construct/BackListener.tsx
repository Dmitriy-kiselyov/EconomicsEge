import React from 'react';
import { BackHandler } from 'react-native';

export abstract class BackListener<P, S = {}> extends React.PureComponent<P, S> {
    componentDidMount(): void {
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    componentWillUnmount(): void {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    protected abstract handleBack: () => boolean;
}
