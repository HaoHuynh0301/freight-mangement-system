import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    TextInput,
    ScrollView
} from 'react-native';
import {
    greyColor,
    headerFontSize,
    xIcon,
    appFontSize,
    callIcon, 
    homeIcon,
    accountIcon
} from '../contants';

class CreateOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderSize: this.props.route.params.status
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
                    <Text style={styles.userInformationText}>TẠO ĐƠN HÀNG</Text>
                </View>
            </View>
        );
    }

    renderMainView() {
        return(
            <ScrollView>
                <View style={styles.createOrderMainView}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start'
                    }}>
                        <Text style={styles.titleFontSize}>NGƯỜI NHẬN</Text>
                    </View>
                    <View style={styles.shippingLocationInforWrapper}>
                        <View style={styles.locationInforDetail}>
                            <Image
                                source = {callIcon}
                                style={styles.iconLocationInfor}
                            ></Image>
                            <TextInput
                                placeholder = 'Nhập số điện thoại khách hàng'
                                style={styles.inputStyle}
                            ></TextInput>
                        </View>
                        <View style={styles.locationInforDetail}>
                            <Image
                                source = {accountIcon}
                                style={styles.iconLocationInfor}
                            ></Image>
                            <TextInput
                                placeholder = 'Tên khách hàng'
                                style={styles.inputStyle}
                            ></TextInput>
                        </View>
                        <View style={styles.locationInforDetail}>
                            <Image
                                source = {homeIcon}
                                style={styles.iconLocationInfor}
                            ></Image>
                            <TextInput
                                placeholder = 'Địa chỉ chi tiết (nhà/ngõ/ngách)'
                                style={styles.inputStyle}
                            ></TextInput>
                        </View>
                    </View>
                    <View style={styles.locationPickerWrapper}>

                    </View>
                </View>
            </ScrollView>
        );
    }

    render() {
        return(
            <SafeAreaView>
                {this.renderHeader()}
                {this.renderMainView()}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 60,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#FFF',
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
        paddingLeft: 90
    },
    createOrderMainView: {
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 15
    },
    titleFontSize: {
        fontSize: appFontSize,
        fontWeight: 'bold'
    },
    appFontSize: {
        fontSize: appFontSize
    },
    shippingLocationInforWrapper: {
        flexDirection: 'column',
        marginTop: 5,
        height: 150,
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10
    },
    iconLocationInfor: {
        height: 20,
        width: 20,
    },
    locationInforDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputStyle: {
        borderBottomWidth: 0.5,
        borderBottomColor: greyColor,
        width: '100%',
        paddingLeft: 10,
        fontSize: appFontSize
    },
    locationPickerWrapper: {
        flexDirection: 'column',
        alignItems: 'center'
    }
});

export default CreateOrder;