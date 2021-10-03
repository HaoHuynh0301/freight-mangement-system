import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert
} from "react-native";
import {
    impText,
    appFontSize,
    headerFontSize,
    accountIcon,
    homeIcon,
    messageIcon,
    callIcon,
    cartIcon,
    bankIcon,
    locationIcon,
    moneyIcon,
    ipAddress
} from '../contants';
import {
    Header
} from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuth: false,
            email: '',
            password: '',

            // User information
            userInformation: '',
            passwordValid: '',

            updated: false
        }
    }

    async getUserInformation() {
        const token = await AsyncStorage.getItem('token');
        axios.get(`${ipAddress}/api/user-information/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            this.setState({
                userInformation: response.data
            });
            console.log(response.data);
        })
        .catch((error) => {
            displayAlert('We have some error! Please try again later!');
        })
    }

    static getDerivedStateFromProps(props, state) {
        state.updated = true;
        return true;
    }

    async getItemFromAsyncStorage(name) {
        const item = await AsyncStorage.getItem('customer_name', '')
        console.log(await AsyncStorage.getItem('customer_name', ''));
        return item;
    }

    componentDidMount() {
        this.getUserInformation();
    }


    async signOutButtonPressed() {
        await AsyncStorage.setItem('token', '');
        this.setState({
            isAuth: false
        });
        this.props.navigation.navigate('SignIn', {

        });
    }

    editButtonPressed(status) {
        this.props.navigation.navigate('EditInformation', {
            status: status
        });
    }

    renderUserPage() {
        return(
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <Text style={styles.userInformationText}>Tài khoản</Text>
                </View>
                <View style = {{
                    marginTop: 20,
                    paddingLeft: 10,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>
                    <Image
                        source = {accountIcon}
                        style = {{height: 60, width: 60}}
                    ></Image>
                    <View style = {{
                        marginLeft: 15,
                    }}>
                        <Text style = {styles.norText}>{this.state.userInformation['customer_name']}</Text>
                        <Text style = {styles.norText}>S321312</Text>
                    </View>
                </View>
                <View style={styles.basicInformationWrapper}>
                    <View style = {{
                        backgroundColor: '#E0E0E0',
                        height: 40,
                        width: 380,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingLeft: 10,
                        paddingRight: 10,
                        flexDirection: 'row'
                        // borderRadius: 10
                    }}>
                        <Text style = {{fontSize: 17}}>Thông tin cơ bản</Text>
                        <TouchableOpacity
                             onPress = {() => {
                                this.editButtonPressed('Sửa thông tin cơ bản')
                            }}
                        >
                            <Text style = {{fontSize: 17, color: '#ff7733'}}>Sửa</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.basicInforDetail}>
                        <Image
                            source = {homeIcon}
                            style={styles.basicInforImage}
                        ></Image>
                        <Text style={styles.basicInforText}>{this.state.userInformation['customer_name']}</Text>
                    </View>
                    <View style={styles.basicInforDetail}>
                        <Image
                            source = {callIcon}
                            style={styles.basicInforImage}
                        ></Image>
                        <Text style={styles.basicInforText}>{this.state.userInformation['phone_numner']}</Text>
                    </View>
                    <View style={styles.basicInforDetail}>
                        <Image
                            source = {messageIcon}
                            style={styles.basicInforImage}
                        ></Image>
                        <Text style={styles.basicInforText}>{this.state.userInformation['email']}</Text>
                    </View>
                    <View style={styles.basicInforDetail}>
                        <Image
                            source = {cartIcon}
                            style={styles.basicInforImage}
                        ></Image>
                    </View>
                </View>

                <View style={styles.bankingInforWrapper}>
                    <View style = {{
                        backgroundColor: '#E0E0E0',
                        height: 40,
                        width: 380,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingLeft: 10,
                        paddingRight: 10,
                        flexDirection: 'row'
                        // borderRadius: 10
                    }}>
                        <Text style = {{fontSize: 17}}>Thông tin ngân hàng, đối soát</Text>
                        <TouchableOpacity
                            onPress = {() => {
                                this.editButtonPressed('Sửa thông tin ngân hàng')
                            }}
                        >
                            <Text style = {{fontSize: 17, color: '#ff7733'}}>Sửa</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.basicInforDetail}>
                        <Image
                            source = {homeIcon}
                            style={styles.basicInforImage}
                        ></Image>
                        <Text style={styles.basicInforText}>{this.state.userInformation['bank_username']}</Text>
                    </View>
                    <View style={styles.basicInforDetail}>
                        <Image
                            source = {cartIcon}
                            style={styles.basicInforImage}
                        ></Image>
                        <Text style={styles.basicInforText}>{this.state.userInformation['bank_number']}</Text>
                    </View>
                    <View style={styles.basicInforDetail}>
                        <Image
                            source = {bankIcon}
                            style={styles.basicInforImage}
                        ></Image>
                        <Text style={styles.basicInforText}>{this.state.userInformation['bank_name']}</Text>
                    </View>
                    <View style={styles.basicInforDetail}>
                        <Image
                            source = {locationIcon}
                            style={styles.basicInforImage}
                        ></Image>
                        <Text style={styles.basicInforText}>{this.state.userInformation['bank_provine']}</Text>
                    </View>
                    <View style={styles.basicInforDetail}>
                        <Image
                            source = {moneyIcon}
                            style={styles.basicInforImage}
                        ></Image>
                        <Text style={styles.basicInforText}>Đối soát 3 lần/tuần 2/4/6</Text>
                    </View>
                </View>
                <View style={styles.locationInforWrapper}>
                    <View style = {{
                        backgroundColor: '#E0E0E0',
                        height: 40,
                        width: 380,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingLeft: 10,
                        paddingRight: 10,
                        flexDirection: 'row'
                        // borderRadius: 10
                    }}>
                        <Text style = {{fontSize: 17}}>Địa chỉ, thông tin lấy hàng</Text>
                        <TouchableOpacity
                             onPress = {() => {
                                this.editButtonPressed('Sửa địa chỉ')
                            }}
                        >
                            <Text style = {{fontSize: 17, color: '#ff7733'}}>Sửa</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.basicInforDetail}>
                        <Text style={styles.basicInforText}>{this.state.userInformation['customer_name']} / {this.state.userInformation['phone_numner']}</Text>
                    </View>
                    <View style={styles.basicInforDetail}>
                        <Text style={styles.basicInforText}>{this.state.userInformation['address']} / {this.state.userInformation['province']} / {this.state.userInformation['district']}</Text>
                    </View>
                </View>
                <View style= {{
                    alignItems: 'center',
                    marginTop: 20,
                    marginBottom: 20
                }}>
                    <TouchableOpacity
                        onPress = {() => {
                            this.signOutButtonPressed()
                        }}
                    >
                        <Text style={{
                            fontSize: 17,
                            fontStyle: 'italic'
                        }}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
        
    }

    renderMainView() {
        return(
            this.renderUserPage()
        );
    }

    render() {
        return(
            <SafeAreaView style = {{flex: 1}}>
                {this.renderMainView()}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        
    },
    signInWrapper: {
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    impText: {
        fontSize: impText,
        fontWeight: 'bold',
    },
    inputDetailWrapper: {
        marginTop: 20,
    },
    norText: {
        fontSize: appFontSize
    },
    textInput: {
        borderWidth: 0.8,
        width: 250,
        height: 40,
        borderRadius: 10,
        fontSize: 16,
        paddingLeft: 10
    },
    buttonLogin: {
        backgroundColor: '#ff7733',
        width: 250,
        height: 40,
        marginTop: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    registerWrapper: {
        flexDirection: 'row',
        marginTop: 20
    },
    registerText: {
        fontSize: 15
    },
    container: {
        height: 70,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#FFF',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 0.5,
        paddingLeft: 10,
        paddingRight: 10
    },
    userInformationText: {
        fontSize: headerFontSize,
        fontWeight: 'bold',
        marginLeft: 10
    },
    settingIcon: {
        height: 30,
        width: 30
    },
    basicInformationWrapper: {
        height: 240,
        width: '92%',
        backgroundColor: '#FFF',
        flexDirection: 'column',
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 20,
        // paddingLeft: 10,
        // paddingRight: 10
    },
    basicInforDetail: {
        height: 50,
        flexDirection: 'row',
        paddingLeft: 10,
        alignItems: 'center',
        borderBottomWidth: 0.5,
    },
    basicInforImage: {
        height: 30,
        width: 30
    },
    basicInforText: {
        fontSize: 17,
        marginLeft: 10
    },
    bankingInforWrapper: {
        height: 290,
        flexDirection: 'column',
        // alignItems: 'center',
        width: '92%',
        backgroundColor: '#FFF',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 10
    },
    locationInforWrapper: {
        height: 140,
        flexDirection: 'column',
        // alignItems: 'center',
        width: '92%',
        backgroundColor: '#FFF',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 10
    }
});

export default User;

