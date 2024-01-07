import * as React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, FlatList } from 'react-native'

import { TransactionData } from 'mock/transactionData'
import { TransctionType } from 'models'
import { palettes, fonts } from 'common/theme';

export const TransactionList = () => {
    return (
        <FlatList
            data={TransactionData}
            renderItem={({ item, index }) => <Item key={index} item={item} />}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={FlatListItemSeparator}
        />
    )
}

const Item = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => {}}>
        <View style={styles.leftContainer}>
            <Text style={fonts.regularBoldTitle}>{item.recipient_name}</Text>
            <View style={[styles.typeContainer, item.type === 'debit' ? { backgroundColor: palettes.red } : { backgroundColor: palettes.green }]}>
                <Text style={[fonts.regular, styles.typeStyle]}>{item.type}</Text>
            </View>
        </View>
        <View style={styles.rightContainer}>
            <Text style={fonts.regular}>{item.amount}</Text>
        </View>
    </TouchableOpacity>
);

const FlatListItemSeparator = () => {
    return (
        <View style={styles.separator} />
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        padding: 10
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    title: {
        fontSize: 32,
    },
    typeContainer: {
        padding: 5,
        borderRadius: 10,
        backgroundColor: palettes.silver,
        marginTop: 10
    },
    typeStyle: {
        color: palettes.white
    },
    rightContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    separator: {
        height: 1,
        backgroundColor: palettes.lightgrey
    }
})