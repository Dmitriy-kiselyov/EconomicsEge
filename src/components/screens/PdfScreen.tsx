import React from 'react';
import { StyleSheet, View } from 'react-native';
import PdfViewer from 'react-native-pdf';

import { colors, margins } from '../../lib/constants';
import { Loading } from '../construct/Loading';

interface IPdfScreenProps {
    path: string;
}

export const PdfScreen: React.FC<IPdfScreenProps> = props => {
    const { path } = props;
    const source = {
        uri: `bundle-assets://${path}`
    };

    return (
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
    );
}

const styles = StyleSheet.create({
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
