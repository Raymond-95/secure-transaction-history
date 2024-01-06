import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from 'features/auth/Login'
import HistoryScreen from 'features/history/History'

const Stack = createNativeStackNavigator();

/**
 * Hide header
 */
const hideHeader = {
    headerShown: false
}

const Navigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} options={hideHeader}/>
                <Stack.Screen name="History" component={HistoryScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigator;