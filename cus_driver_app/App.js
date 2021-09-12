/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {
    AppInformation,
    Register,
    EditInformation,
    CreateOrder,
    OrderDetail,
    User
} from './screens';
import Tabs from './navigation/tab.js';
const Stack = createNativeStackNavigator();

import AsyncStorage from '@react-native-async-storage/async-storage';
const axios = require('axios');

const middleWare = async () => {
    const token = await AsyncStorage.getItem('token')
    console.log(token)
    if(token !== null){
        return true
    } ;
    return false;
}

const App = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name = 'Tabs'
                    component = {Tabs}
                    options={{header: () => null}}
                ></Stack.Screen>
                <Stack.Screen
                    name = 'AppInformation'
                    component = {AppInformation}
                    options={{header: () => null}}
                ></Stack.Screen>
                <Stack.Screen
                    name = 'Register'
                    component = {Register}
                    options={{header: () => null}}
                ></Stack.Screen>
                <Stack.Screen
                    name = 'EditInformation'
                    component = {EditInformation}
                    options={{header: () => null}}
                ></Stack.Screen>
                <Stack.Screen
                    name = 'CreateOrder'
                    component = {CreateOrder}
                    options={{header: () => null}}
                ></Stack.Screen>
                <Stack.Screen
                    name = 'OrderDetail'
                    component = {OrderDetail}
                    options={{header: () => null}}
                ></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
const styles = StyleSheet.create({
   
});

export default App;
