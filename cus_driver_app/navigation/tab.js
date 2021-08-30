import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import {
    createBottomTabNavigator,
    BottomTabBar
} from "@react-navigation/bottom-tabs";
import {
    overViewIcon,
    accountIcon,
    moneyIcon,
    orderIcon
} from '../contants';
import {
    MonenyFlow,
    Orders,
    OverView,
    User
} from '../screens';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator
            style = {styles.tabBottom}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Overview') {
                        iconName  = overViewIcon;
                    } else if (route.name === 'Orders') {
                        iconName = orderIcon;
                    } else if (route.name === 'MonenyFlow') {
                        iconName = moneyIcon;
                    } else if (route.name === 'User') {
                        iconName = accountIcon;
                    }
                    return <Image source = { iconName } style = {styles.tabIcon} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen
                name = 'Overview'
                component = {OverView}
                options={{header: () => null}}
            ></Tab.Screen>
            <Tab.Screen
                name = 'MonenyFlow'
                component = {MonenyFlow}
                options={{header: () => null}}
            ></Tab.Screen>
            <Tab.Screen
                name = 'Orders'
                component = {Orders}
                options={{header: () => null}}
            ></Tab.Screen>
            <Tab.Screen
                name = 'User'
                component = {User}
                options={{header: () => null}}
            ></Tab.Screen>
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabIcon: {
        width: 30,
        height: 30
    },
    tabBottom: {
        backgroundColor: "transparent",
        borderTopWidth: 0,
        elevation: 0
    }
});

export default Tabs;
