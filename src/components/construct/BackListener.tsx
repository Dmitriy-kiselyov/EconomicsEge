import React from 'react';
import { BackHandler } from 'react-native';

export abstract class BackListener<P> extends React.PureComponent<P> {
    componentDidMount(): void {
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    componentWillUnmount(): void {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    protected abstract handleBack: () => boolean;
}
