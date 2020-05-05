import React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import PdfViewer from 'react-native-pdf';

import { BackListener } from '../construct/BackListener';
import { closeTheory } from '../../store/closeTheory';
import { colors, margins } from '../../lib/constants';
import { IFulfilledStore } from '../../typings/store';
import { Loading } from '../construct/Loading';
import { NavigationExtended } from '../NavigationExtended';

interface IConnectProps {
    theoryPath: string;
}

type ITheoryScreenPropsWithConnect = IConnectProps & DispatchProp;

class TheoryScreenPresenter extends BackListener<ITheoryScreenPropsWithConnect> {
    render() {
        const { theoryPath } = this.props;
        const source = {
            uri: `bundle-assets://${theoryPath}`
        };

        return (
            <View style={styles.screen}>
                <NavigationExtended />
                <View style={styles.pdfWrap}>
                    <PdfViewer
                        style={styles.pdf}
                        source={source}
                        spacing={2}
                        fitPolicy={0}
                        maxScale={1}
                        activityIndicator={<Loading/>}
                    />
                </View>
            </View>
        );
    }

    protected handleBack = () => {
        this.props.dispatch(closeTheory(true));

        return true;
    };
}

export const TheoryScreen = connect(
    (store: IFulfilledStore): IConnectProps => ({
        theoryPath: store.openedTheory as string,
    })
)(TheoryScreenPresenter);

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        margin: margins.l
    },
    pdfWrap: {
        flex: 1,
        alignItems: 'center',
        marginTop: margins.l,
        backgroundColor: colors.lightGrey,
        marginHorizontal: -margins.l,
        marginBottom: -margins.l,
    },
    pdf: {
        flex: 1,
        width: 450,
        maxWidth: '100%',
        backgroundColor: colors.lightGrey,
    }
});
