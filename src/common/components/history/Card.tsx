import * as React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'

import { fonts, palettes } from 'common/theme'

export const Card = () => {
    return (
        <TouchableOpacity style={styles.cardContainer}>
            <Text style={[fonts.heading1, fonts.whiteFont]}>RM 45,000</Text>
            <View style={styles.cardNoContainer}>
                <Text style={[fonts.heading2, fonts.whiteFont]}>****************123</Text>
            </View>
            <View style={styles.cardFooter}>
                <View>
                    <Text style={[fonts.regular, fonts.whiteFont]}>VALID THRU</Text>
                    <Text style={[fonts.regularBoldTitle, fonts.whiteFont]}>12/23</Text>
                </View>
                <View style={styles.cardFooterRight}>
                    <Text style={[fonts.whiteFont, styles.instruction]}>{'Click the card \n to view'}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 0.3,
        backgroundColor: 'salmon',
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
