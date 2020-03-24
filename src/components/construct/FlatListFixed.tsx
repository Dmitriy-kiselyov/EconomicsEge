import React from 'react';
import { FlatList, FlatListProps, Dimensions, StyleSheet, ListRenderItemInfo, View, Text } from 'react-native';
import { margins } from '../../lib/constants';
import { getStyleWithMod } from '../../lib/getStyleWithMod';

type IFlatListFixedProps<ItemT> = Pick<FlatListProps<ItemT>, 'style' | 'data'> & {
    renderItem: (item: ItemT) => React.ReactElement;
    cellMinWidth: number;
}

interface IState {
    columns: number;
}

// FlatList говно, исправляю баги и недочеты
export class FlatListFixed<Item> extends React.PureComponent<IFlatListFixedProps<Item>, IState> {
    state = {
        columns: this.getColumnNumber()
    };

    componentDidMount(): void {
        Dimensions.addEventListener('change', this.onOrientationChanged);
    }

    componentWillUnmount(): void {
        Dimensions.removeEventListener('change', this.onOrientationChanged);
    }

    render() {
        return (
            <FlatList
                style={this.props.style}
                data={this.getRowData()}
                renderItem={this.renderRow}
                numColumns={1} // бажно, реализую сам
                keyExtractor={(item: unknown, index: number) => String(index)}
            />
        );
    }

    private onOrientationChanged = () => {
        this.setState({
            columns: this.getColumnNumber()
        });
    };

    private getColumnNumber(): number {
        const width = Dimensions.get('screen').width;

        return Math.floor(width / this.props.cellMinWidth);
    }

    private getRowData(): Array<Array<Item | false>> | null | undefined {
        const { data } = this.props;

        if (!data) {
            return data;
        }

        const rows = [];
        const { columns } = this.state;

        for (let i = 0; i < data.length; i += columns) {
            let row = data.slice(i, Math.min(i + columns, data.length));

            if (row.length < columns) {
                row = row.concat(new Array(columns - row.length).fill(false));
            }

            rows.push(row);
        }

        return rows;
    }

    private renderRow = (row: ListRenderItemInfo<Array<Item | false>>): React.ReactElement | null => {
        const { data } = this.props;

        if (!data) {
            return null;
        }

        const { item, index } = row;
        const rowsCount = Math.floor(data.length / this.state.columns);
        const style = getStyleWithMod(styles, 'row', {
            bottom: index === rowsCount
        });

        return (
            <View style={style}>
                {
                    item.map((item, i) => this.renderCell(item, i))
                }
            </View>
        )
    };

    private renderCell = (item: Item | false, index: number): React.ReactElement | null => {
        const { columns } = this.state;
        const style = getStyleWithMod(styles, 'cell', {
            left: index === 0,
            right: index === columns - 1
        });

        if (item === false) {
            style.push(styles.cellInvisible);

            return (
                <View style={style} key={index}/>
            );
        }

        return (
            <View style={style} key={index}>
                {this.props.renderItem(item)}
            </View>
        )
    };
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row'
    },
    rowBottom: {
        marginBottom: margins.l
    },
    cellLeft: {
        marginLeft: margins.l
    },
    cellRight: {
        marginRight: margins.l
    },
    cell: {
        margin: margins.s,
        flex: 1,
    },
    cellInvisible: {
        backgroundColor: 'transparent',
    }
});
