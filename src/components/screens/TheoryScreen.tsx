import React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import PdfViewer from 'react-native-pdf';

import { BackListener } from '../construct/BackListener';
import { closeTheory } from '../../store/closeTheory';
import { colors, margins } from '../../lib/constants';
import { ScreenTitle } from '../construct/ScreenTitle';
import { IFulfilledStore } from '../../typings/store';
import { Loading } from '../construct/Loading';

interface IConnectProps {
    theoryPath: string;
    testTitle: string;
    levelTitle: string;
}

type ITheoryScreenPropsWithConnect = IConnectProps & DispatchProp;

class TheoryScreenPresenter extends BackListener<ITheoryScreenPropsWithConnect> {
    render() {
        const { theoryPath, testTitle, levelTitle } = this.props;
        const source = {
            uri: `bundle-assets://${theoryPath}`
        };

        return (
            <View style={styles.screen}>
                <ScreenTitle
                    title={testTitle}
                    subtitle="Теория"

                    right={levelTitle}
                    onRightClick={this.handleOpenLevel}
                />
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

    protected handleOpenLevel = () => {
        this.props.dispatch(closeTheory());
    }

    protected handleBack = () => {
        this.props.dispatch(closeTheory(true));

        return true;
    };
}

export const TheoryScreen = connect(
    (store: IFulfilledStore): IConnectProps => ({
        theoryPath: store.openedTheory as string,
        testTitle: store.openedTest as string,
        levelTitle: store.levels[store.openedLevel as string].title,
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
