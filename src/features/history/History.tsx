import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamsList } from "features/navigation/Navigator"

import { StyleSheet, View, Text } from 'react-native'

import { CustomSafeAreaView, Card, TransactionList } from 'common/components'
import { fonts } from "common/theme"

interface Props {
    navigation: StackNavigationProp<RootStackParamsList, "History">
}

const History = ({ navigation }: Props) => {

    return (
        <CustomSafeAreaView>
            <Card />
            <View style={{flex: 0.7, marginTop: 20}}>
                <Text style={[fonts.heading2, { marginBottom: 20 }]}>Transaction</Text>
                <TransactionList />
            </View>
        </CustomSafeAreaView>
    )
}

export default History;