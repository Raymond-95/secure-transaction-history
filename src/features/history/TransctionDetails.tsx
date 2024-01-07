import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamsList } from "features/navigation/Navigator"

import { StyleSheet, View, Text } from 'react-native'

import { CustomSafeAreaView } from 'common/components'
import { TransactionDataModel } from 'models'
import { palettes, fonts } from 'common/theme'

interface Props {
    navigation: StackNavigationProp<RootStackParamsList, "TransctionDetails">,
    route: {
        params: {
            details: TransactionDataModel
        }
    }
}

const currency = 'RM'
const debitText = 'You\'ve received'
const creditText = 'You\'ve transferred'

const transction_details_acc_no = 'Account Number: '
const transction_details_recipient_name = 'Recipient Name: '
const transction_details_transferor_name = 'Transferor Name: '
const transction_details_date = 'Date: '
const transction_details_description = 'Description: '

const TransactionDetails = ({ navigation, route }: Props) => {

    const { details } = route.params;

    return (
        <CustomSafeAreaView>
            <View style={styles.transactionContainer}>
                <Text style={fonts.regular}>{details.type === 'debit' ? debitText : creditText}</Text>
                <Text style={fonts.regularBoldTitle}>{currency + ' ' + details.amount.toFixed(2)}</Text>
            </View>

            <DetailItem title={transction_details_acc_no} text={details.acc_no} />
            <DetailItem title={details.type === 'debit' ? transction_details_transferor_name : transction_details_recipient_name} text={details.recipient_name} />
            <DetailItem title={transction_details_date} text={details.date} />
            <DetailItem title={transction_details_description} text={details.description} />
        </CustomSafeAreaView>
    )
}

const DetailItem = ({title, text}) => {
    return (
        <View style={styles.detailItemContainer}>
            <Text style={fonts.regular}>{title}</Text>
            <Text style={fonts.regularBoldTitle}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    transactionContainer: {
        flexDirection: 'column',
        backgroundColor: palettes.lightgrey,
        borderRadius: 20,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    detailItemContainer: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between'
    }
})

export default TransactionDetails;

