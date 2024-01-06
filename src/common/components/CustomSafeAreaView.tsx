import React from "react"
import { SafeAreaView } from 'react-native'

export const CustomSafeAreaView = ({ children }: { children: React.ReactNode }) => {
    return (
        <SafeAreaView style={{
            flex: 1,
            padding: 20
        }}>
            {children}
        </SafeAreaView>
    )
}