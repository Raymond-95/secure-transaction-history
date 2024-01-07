import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Alert } from 'react-native'

import { fonts, palettes } from 'common/theme'
import { maskedText, unlockWithBiometric, BiometricResponse } from 'utils'

const creditCardData = '1234 5678 9012 3456'
const clickToView = 'Click the card\nto view'
const clickToHide = 'Click the card\nto hide'

export const Card = () => {

    const [mask, maskCreditCardInfo] = useState(true)
    const [creditCardNo, setCreditCardNo] = useState(maskedText(creditCardData))

    useEffect(() => {
        if (mask) {
            setCreditCardNo(maskedText(creditCardData))
        }
        else {
            setCreditCardNo(creditCardData)
        }
    }, [mask])

    const viewCreditCardInfo = () => {
        // if the info is masked, trigger biomtric to un-mask the info
        if (mask) {
            unlockWithBiometric()
                .then((result: BiometricResponse) => {
                    if (result.biometricEnabled && result.verified) {
                        maskCreditCardInfo(false)
                    }
                    else if (result.biometricEnabled && !result.verified) {
                        throw new Error('You are not allowed to view the info')
                    }
                    else {
                        throw new Error('Please enable biometric to view this info')
                    }
                })
                .catch(error => {
                    maskCreditCardInfo(true)
                    Alert.alert(error.message)
                })
        }
        // mask the info
        else {
            maskCreditCardInfo(true)
        }
    }

    return (
        <TouchableOpacity style={styles.cardContainer} onPress={viewCreditCardInfo}>
            <Text style={[fonts.heading1, fonts.whiteFont]}>RM 45,000</Text>
            <View style={styles.cardNoContainer}>
                <Text style={[fonts.heading2, fonts.whiteFont]}>{creditCardNo}</Text>
            </View>
            <View style={styles.cardFooter}>
                <View>
                    <Text style={[fonts.regular, fonts.whiteFont]}>VALID THRU</Text>
                    <Text style={[fonts.regularBoldTitle, fonts.whiteFont]}>12/25</Text>
                </View>
                <View style={styles.cardFooterRight}>
                    <Text style={[fonts.whiteFont, styles.instruction]}>{mask ? clickToView : clickToHide}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 0.3,
        backgroundColor: palettes.salmon,
        borderRadius: 30,
        padding: 20
    },
    cardNoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardFooter: {
        flexDirection: 'row'
    },
    cardFooterRight: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    instruction: {
        textAlign: 'center',
        fontSize: 10
    }
})
