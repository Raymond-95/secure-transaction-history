import { StyleSheet, View } from 'react-native'

import { CustomSafeAreaView, TransactionList } from 'common/components'

const History = ({ navigation }) => {

    return (
        <CustomSafeAreaView>
            <View>
                <TransactionList  />
            </View>
        </CustomSafeAreaView>
    )
}

const styles = StyleSheet.create({
})

export default History;