import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    TextInput,
    ScrollView,
    Alert,
    FlatList,
} from 'react-native';
import {
    greyColor,
    headerFontSize,
    xIcon,
    appFontSize,
    orangeColor,
    ipAddress,
    mapIcon
} from '../contants';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

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

class OrderMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {

            }
        }
    }

    renderHeader() {
        return(
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    onPress = {() => {
                        this.props.navigation.goBack();
                    }}
                >
                    <Image
                        source = {xIcon}
                        style={styles.xIconStyle}
                    ></Image>
                </TouchableOpacity>
                <View style={styles.titleWrapper}>
                    <Text style={styles.userInformationText}>BẢN ĐỒ</Text>
                </View>
            </View>
        );
    }

    renderMainView() {
        return(
            <View>
                <MapView
                    style={{flex: 1}}
                    region={{
                      latitude: 42.882004,
                      longitude: 74.582748,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421
                    }}
                    showsUserLocation={true}
                ></MapView>
            </View>
        );
    }

    
    render() {
        return(
            <View style = {{flex: 1}}>
                {this.renderHeader()}
                <MapView
                    style = {{flex:1}}
                    provider = {PROVIDER_GOOGLE}
                    // showsUserLocation
                    region = {{
                        latitude: 10.03711,
                        longitude: 105.78825,
                        latitudeDelta: 0.004,
                        longitudeDelta: 0.004
                    }}
                >
                    {/* <Marker
                        coordinate = {{
                            latitude: 10.03333,
                            longitude: 105.78333,
                        }}
                        // image = {xIcon}
                        title = 'Test title'
                        description = 'This is a description'
                    ></Marker> */}
                </MapView>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 60,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: greyColor,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: greyColor
    },
    userInformationText: {
        fontSize: headerFontSize,
        fontWeight: 'bold',
        marginLeft: 10,
        alignSelf: 'center'
    },
    xIconStyle: {
        height: 20,
        width: 25,
        marginLeft: 10
    },
    titleWrapper: {
        paddingLeft: 120
    },
    // map: {
    //     ...StyleSheet.absoluteFillObject,
    // },
});

export default OrderMap;