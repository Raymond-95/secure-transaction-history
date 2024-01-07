import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamsList } from "features/navigation/Navigator"

import { StyleSheet, View } from 'react-native'

import { CustomSafeAreaView, TransactionList } from 'common/components'

interface Props {
    navigation: StackNavigationProp<RootStackParamsList, "History">
}

const History = ({ navigation }: Props) => {

    return (
        <CustomSafeAreaView>
            <View>
                <TransactionList />
            </View>
        </CustomSafeAreaView>
    )
}

const styles = StyleSheet.create({
})

export default History;