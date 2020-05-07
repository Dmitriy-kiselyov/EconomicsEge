import React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

import { Icon } from './construct/Icon/Icon';
import { colors, margins } from '../lib/constants';
import { getStyleWithMod } from '../lib/getStyleWithMod';
import { Touchable } from './construct/Touchable';
import { IFulfilledStore } from '../typings/store';
import { BackListener } from './construct/BackListener';
import { closeLevel } from '../store/closeLevel';
import { closeTask } from '../store/closeTask';
import { closeTheory } from '../store/closeTheory';
import { IActions } from '../typings/actions';
import { closeSettings } from '../store/closeSettings';
import { closeExam } from '../store/closeExam';

const fontL = 35;
const fontM = 20;
const iconSize = 16;

interface IConnectProps {
    test: string | null;
    exam: string | null;
    level: string | null;
    task: string | null;
    theory: boolean;
    settings: boolean;
}

type INavigationPropsWithConnect = IConnectProps & DispatchProp;

interface ISibling {
    text: string;
    onClose: () => IActions;
}

class NavigationPresenter extends BackListener<INavigationPropsWithConnect> {
    private scrollRef = React.createRef<ScrollView>();
    private siblings: ISibling[] = [];

    componentDidMount(): void {
        super.componentDidMount();

        Dimensions.addEventListener('change', this.scrollRight);
        this.scrollRight();
    }

    componentWillUnmount(): void {
        super.componentWillUnmount();

        Dimensions.removeEventListener('change', this.scrollRight);
    }

    componentDidUpdate() {
        this.scrollRight();
    }

    private scrollRight = () => {
        requestAnimationFrame(() => this.scrollRef.current?.scrollToEnd({ animated: true }));
    }

    private getSiblings(): ISibling[] {
        const { test, exam, level, task, theory, settings } = this.props;
        const siblings: ISibling[] = [];

        test && siblings.push({
            text: test,
            onClose: closeLevel
        });

        exam && siblings.push({
            text: exam,
            onClose: closeExam
        });

        level && siblings.push({
            text: level,
            onClose: closeLevel
        });

        task && siblings.push({
            text: task,
            onClose: closeTask
        });

        theory && siblings.push({
            text: 'Теория',
            onClose: closeTheory
        });

        settings && siblings.push({
            text: 'Настройки',
            onClose: closeSettings
        })

        return siblings;
    }

    render() {
        const siblings = this.getSiblings();
        this.siblings = siblings; // remember for back action

        if (!siblings.length) {
            return null;
        }

        const content: React.ReactElement[] = [];

        for (let i = 0; i < siblings.length; i++) {
            const sibling = siblings[i];

            if (i === 0) {
                content.push(this.renderMain(sibling));
            } else if (i === siblings.length - 1) {
                content.push(this.renderNext(sibling, true));
            } else {
                content.push(this.renderNext(sibling));
            }
        }

        return (
            <View style={styles.navigation}>
                <ScrollView
                    ref={this.scrollRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {content}
                </ScrollView>
            </View>
        )
    }

    private renderMain(sibling: ISibling): React.ReactElement {
        const textStyle = getStyleWithMod(styles, 'text', { main: true });

        return (
            <React.Fragment key="main">
                {this.renderSibling(sibling, textStyle)}
            </React.Fragment>
        );
    }

    private renderNext(sibling: ISibling, last?: boolean): React.ReactElement {
        const textStyle = getStyleWithMod(styles, 'text', { last });

        return (
            <React.Fragment key={sibling.text}>
                <Icon type="arrowRight" size={iconSize} />
                {this.renderSibling(sibling, textStyle, !last)}
            </React.Fragment>
        )
    }

    private renderSibling(sibling: ISibling, textStyle: object, clickable = true): React.ReactElement {
        const { text } = sibling;

        let content = (
            <View style={styles.buttonPadding}>
                <Text style={textStyle}>{text}</Text>
            </View>
        );

        if (clickable) {
            content = <Touchable onClick={() => this.onSiblingClick(sibling)} delay>{content}</Touchable>;
        }

        return <View style={styles.button}>{content}</View>;
    }

    private onSiblingClick(sibling: ISibling): void {
        const { siblings } = this;

        if (siblings.length === 1) {
            this.props.dispatch(siblings[0].onClose());

            return;
        }

        let i = siblings.length - 1;

        while (i > 0 && siblings[i] !== sibling) {
            this.props.dispatch(siblings[i].onClose());

            i--;
        }
    }

    protected handleBack = () => {
        const { siblings } = this;

        if (!siblings.length) {
            return false;
        }

        const last = siblings.length - 1;

        this.props.dispatch(siblings[last].onClose());

        return true;
    }
}

export const Navigation = connect(
    (state: IFulfilledStore): IConnectProps => ({
        test: state.openedTest,
        exam: state.openedExam,
        level: state.openedLevel ? state.levels[state.openedLevel].title : null,
        task: state.openedTask ? 'Задача ' + state.tasks[state.openedTask].title : null,
        theory: Boolean(state.openedTheory),
        settings: state.openedSettings
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
