import React, { Component } from 'react';
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
    ipAddress
} from '../contants';
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

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false,

            email: '',
            password: '',

            // User information
            userInformation: '',
            passwordValid: '',
        }
    }

    async middleWare() {
        const token = await AsyncStorage.getItem('token');
        axios.get(`${ipAddress}/api/middleware/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                this.setState({
                    isSignedIn: true
                });
            })
            .catch((error) => {
                this.setState({
                    isSignedIn: false
                });
            });
    }

    handleSignInPressed() {
        console.log('OK')
        axios.post(`${ipAddress}/api/sign-in/`, {
            email: this.state.email,
            password: this.state.password
        })
        .then(async (response) => {
            await AsyncStorage.setItem('token', response.data.access_token);
            this.setState({
                email: '',
                password: ''
            })
            this.props.navigation.navigate('Tabs', {});
        })
        .catch((error) => {
            displayAlert("Email or password is invalid!");
        });
    }

    handleRegisterPressed() {
        this.props.navigation.navigate('Register')
    }

    componentDidMount() {
        this.middleWare();
    }

    render() {
        return(
            <View style={styles.signInWrapper}>
                <Text style={styles.impText}>Vui lòng đăng nhập</Text>
                <View style={styles.inputWrapper}>
                    <View style={styles.inputDetailWrapper}>
                        <TextInput
                            style={styles.textInput}
                            placeholder = 'Email'
                            onChangeText = {(text) => {
                                this.setState({
                                    email: text
                                });
                            }}
                            value = {this.state.email}
                        ></TextInput>
                    </View>
                    <View style={styles.inputDetailWrapper}>
                        <TextInput
                            style={styles.textInput}
                            placeholder = 'Mật khẩu'
                            secureTextEntry = {true}
                            onChangeText = {(text) => {
                                this.setState({
                                    password: text
                                });
                            }}
                            value = {this.state.password}
                        ></TextInput>
                    </View>
                </View>
                <TouchableOpacity 
                    style = {styles.buttonLogin}
                    onPress = {() => {
                        this.handleSignInPressed()
                    }}
                >
                    <Text style = {{fontSize: 20, fontWeight: 'bold'}}>Đăng nhập</Text>
                </TouchableOpacity>
                <View style = {styles.registerWrapper}>
                    <Text style = {styles.registerText}>Bạn chưa có tài khoản ? </Text>
                    <TouchableOpacity
                        onPress = {() => {this.handleRegisterPressed()}}
                    >
                        <Text style = {styles.registerText}>Đăng ký tài khoản</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {},
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
        width: '92%',
        backgroundColor: '#FFF',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 10
    },
    locationInforWrapper: {
        height: 140,
        flexDirection: 'column',
        width: '92%',
        backgroundColor: '#FFF',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 10
    }
});

export default SignIn;
