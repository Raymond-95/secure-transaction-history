import React from "react"
import { StyleSheet, SafeAreaView, View } from 'react-native'

import { palettes } from 'common/theme'

interface CustomSafeAreaViewProps {
    normalView?: boolean,
    children: React.ReactNode
}

export const CustomSafeAreaView = ({
    normalView = false,
    children
}: CustomSafeAreaViewProps) => {
    return (
        <SafeAreaView style={[styles.outerContainer, normalView && { padding: 20 }]}>
            {
                normalView ? children :
                    <View style={styles.backgroundContainer}>
                        <View style={styles.innerContainer}>
                            {children}
                        </View>
                    </View>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1
    },
    backgroundContainer: {
        flex: 1,
        backgroundColor: palettes.primaryColor
    },
    innerContainer: {
        flex: 1,
        backgroundColor: palettes.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20
    }
})