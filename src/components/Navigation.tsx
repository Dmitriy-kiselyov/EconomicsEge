import React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

import { EIconTypes, Icon } from './construct/Icon/Icon';
import { colors, margins } from '../lib/constants';
import { getStyleWithMod } from '../lib/getStyleWithMod';
import { Touchable } from './construct/Touchable';
import { IFulfilledStore } from '../typings/store';

const fontL = 35;
const fontM = 20;
const iconSize = 16;

interface IConnectProps {
    test: string | null;
    level: string | null;
    task: string | null;
    theory?: boolean;
}

type INavigationPropsWithConnect = IConnectProps & DispatchProp;

class NavigationPresenter extends React.PureComponent<INavigationPropsWithConnect> {
    private scrollRef = React.createRef<ScrollView>();

    componentDidMount(): void {
        Dimensions.addEventListener('change', this.scrollRight);
        this.scrollRight();
    }

    componentWillUnmount(): void {
        Dimensions.removeEventListener('change', this.scrollRight);
    }

    componentDidUpdate() {
        this.scrollRight();
    }

    private scrollRight = () => {
        requestAnimationFrame(() => this.scrollRef.current?.scrollToEnd({ animated: true }));
    }

    render() {
        const { test, level, task, theory } = this.props;
        const siblings: string[] = [];
        const content: React.ReactElement[] = [];

        test && siblings.push(test);
        level && siblings.push(level);
        task && siblings.push(task);
        theory && siblings.push('Теория');

        if (!siblings.length) {
            return null;
        }

        for (let i = 0; i < siblings.length; i++) {
            const text = siblings[i];

            if (i === 0) {
                content.push(this.renderMain(text));
            } else if (i === siblings.length - 1) {
                content.push(this.renderNext(text, true));
            } else {
                content.push(this.renderNext(text));
            }
        }

        return (
            <View style={styles.navigation}>
                <ScrollView
                    ref={this.scrollRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={styles.scrollContent}>
                        {content}
                    </View>
                </ScrollView>
            </View>
        )
    }

    private renderMain(text: string): React.ReactElement {
        const textStyle = getStyleWithMod(styles, 'text', { main: true });

        return (
            <React.Fragment key="main">
                {this.renderSibling(text, textStyle)}
            </React.Fragment>
        );
    }

    private renderNext(text: string, last?: boolean): React.ReactElement {
        const textStyle = getStyleWithMod(styles, 'text', { last });

        return (
            <React.Fragment key={text}>
                <Icon type={EIconTypes.arrowRight} size={iconSize} />
                {this.renderSibling(text, textStyle, !last)}
            </React.Fragment>
        )
    }

    private renderSibling(text: string, textStyle: object, clickable = true): React.ReactElement {
        let content = (
            <View style={styles.buttonPadding}>
                <Text style={textStyle}>{text}</Text>
            </View>
        );

        if (clickable) {
            content = <Touchable delay>{content}</Touchable>;
        }

        return <View style={styles.button}>{content}</View>;
    }
}

export const Navigation = connect(
    (state: IFulfilledStore): IConnectProps => ({
        test: state.openedTest,
        level: state.openedLevel ? state.levels[state.openedLevel].title : null,
        task: state.openedTask ? 'Задача ' + state.tasks[state.openedTask].title : null,
        theory: Boolean(state.openedTheory),
    })
)(NavigationPresenter);

const styles = StyleSheet.create({
    navigation: {
        marginHorizontal: -margins.l,
    },
    scrollContent: {
        paddingHorizontal: margins.m,
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        alignSelf: 'flex-start',
        borderRadius: 50,
        overflow: 'hidden',
    },
    buttonPadding: {
        paddingHorizontal: margins.s,
    },
    text: {
        fontSize: fontM,
        lineHeight: fontL, // чтобы оставались на одной линии
        padding: margins.s,
        fontWeight: '700'
    },
    textMain: {
        fontSize: fontL,
    },
    textLast: {
        color: colors.primaryDark
    }
});
