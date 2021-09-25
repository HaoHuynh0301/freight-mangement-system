import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    TouchableOpacity,
    Alert,
    FlatList
} from "react-native";
import {
    headerFontSize,
    backIcon,
    appFontSize,
    greyColor,
    rightArrowIcon,
    ipAddress
} from '../contants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";
const axios = require('axios');

const displayAlert = (message) => {
    Alert.alert(
        "Notification",
        message,
        [
            {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
        ])
}

class OverViewOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 1,
            orders: []
        }
    }

    renderHeader() {
        return(
            <View style={styles.headerContainer}>
                <Text style={styles.userInformationText}>{this.props.route.params.title}</Text>
            </View>
        );
    }

    renderMainView() {

    }

    async getListOrders() {
        const token = await AsyncStorage.getItem('token');
        axios.get(`${ipAddress}/api/specific-order?status=${this.state.status}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            this.setState({
                orders: response.data
            });
        })
        .catch((error) => {
            displayAlert('There are some errors! Please try again later!');
        });
    }

    componentDidMount() {
        this.setState({
            status: this.props.route.params.id
        });
        this.getListOrders();
    }

    render() {
        return(
            <SafeAreaView>
                {this.renderHeader()}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 70,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#ff7733',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    userInformationText: {
        fontSize: headerFontSize,
        fontWeight: 'bold',
        marginLeft: 10
    },
});

export default OverViewOrder;