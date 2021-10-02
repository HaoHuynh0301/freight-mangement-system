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
    mapIcon,
    carIcon
} from '../contants';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
// import Routing from 'react-native-leaflet-routing';

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

            },
            latitudeDelta: 0,
            longitudeDelta: 0
        }
    }

    componentDidMount() {
        
    }

    getCoordinate(directionName) {

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

    
    render() {
        return(
            <View style = {{flex: 1}}>
                {this.renderHeader()}
                <MapView
                    style = {{flex:1}}
                    provider = {PROVIDER_GOOGLE}
                    showsUserLocation
                    region = {{
                        latitude: 21.732568,
                        longitude: 105.396672,
                        latitudeDelta: 1,
                        longitudeDelta: 1
                    }}
                >
                    <Marker
                        coordinate = {{
                            latitude: 21.0245,
                            longitude: 105.84117,
                        }}
                        // image = {xIcon}
                        title = 'Test title'
                        description = 'This is a description'
                    ></Marker>
                    <Marker
                        coordinate = {{
                            latitude: 20.45,
                            longitude: 106.33333,
                        }}
                        anchor = {{x: 0.5, y: 0.5}}
                        flat = {true}
                    >
                        <Image
                            source = {carIcon}
                            style = {{
                                height: 50,
                                width: 50
                            }}
                        ></Image>
                    </Marker>
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