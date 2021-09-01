import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image
} from "react-native";
import {
    impText,
    appFontSize,
    headerFontSize,
    settingIcon,
    accountIcon,
    homeIcon,
    messageIcon,
    callIcon,
    cartIcon
} from '../contants';
import {
    Header
} from '../components';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuth: false,
            username: '',
            password: ''
        }
    }

    handleSignInPressed() {
        this.setState({
            username: '',
            password: ''
        })
        this.props.navigation.navigate('Register', {

        });
    }

    handleRegisterPressed() {
        this.props.navigation.navigate('Register', {

        });
    }

    renderUserPage() {
        return(
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <Text style={styles.userInformationText}>Tài khoản</Text>
                    <TouchableOpacity>
                        <Image
                            source = {settingIcon}
                            style={styles.settingIcon}
                        ></Image>
                    </TouchableOpacity>
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
                        <Text style = {styles.norText}>IHT</Text>
                        <Text style = {styles.norText}>S321312</Text>
                    </View>
                </View>
                <View style={styles.basicInformationWrapper}>
                    <View style = {{
                        backgroundColor: '#E0E0E0',
                        height: 40,
                        width: 380,
                        justifyContent: 'center',
                        paddingLeft: 10
                        // borderRadius: 10
                    }}>
                        <Text style = {{fontSize: 17}}>Thông tin cơ bản</Text>
                    </View>
                    <View style={styles.basicInforDetail}>
                        <Image
                            source = {homeIcon}
                            style={styles.basicInforImage}
                        ></Image>
                        <Text style={styles.basicInforText}>ITH</Text>
                    </View>
                    <View style={styles.basicInforDetail}>
                        <Image
                            source = {callIcon}
                            style={styles.basicInforImage}
                        ></Image>
                        <Text style={styles.basicInforText}>0932843656</Text>
                    </View>
                    <View style={styles.basicInforDetail}>
                        <Image
                            source = {messageIcon}
                            style={styles.basicInforImage}
                        ></Image>
                        <Text style={styles.basicInforText}>hao152903@gmail.com</Text>
                    </View>
                    <View style={styles.basicInforDetail}>
                        <Image
                            source = {cartIcon}
                            style={styles.basicInforImage}
                        ></Image>
                    </View>
                </View>
            </ScrollView>
        );
        
    }

    renderSignInPage() {
        return(
            <View style={styles.signInWrapper}>
                <Text style={styles.impText}>Vui lòng đăng nhập</Text>
                <View style={styles.inputWrapper}>
                    <View style={styles.inputDetailWrapper}>
                        <TextInput
                            style={styles.textInput}
                            placeholder = 'Tên đăng nhập'
                            onChangeText = {(text) => {
                                this.setState({
                                    username: text
                                });
                            }}
                            value = {this.state.username}
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
                    <Text style = {{fontSize: 20, fontWeight: 'bold'}}>Sign in</Text>
                </TouchableOpacity>
                <View style = {styles.registerWrapper}>
                    <Text style = {styles.registerText}>Don't have any accounts ? </Text>
                    <TouchableOpacity
                        onPress = {() => {this.handleRegisterPressed()}}
                    >
                        <Text style = {styles.registerText}>Register an account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    renderMainView() {
        if(!this.state.isAuth) {
            return(
                this.renderUserPage()
            );
        } else {
            return(
                this.renderSignInPage()
            );
        }
    }

    render() {
        return(
            <SafeAreaView>
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
        fontSize: 16
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
        alignItems: 'center'
    },
    basicInforImage: {
        height: 30,
        width: 30
    },
    basicInforText: {
        fontSize: 17,
        marginLeft: 10
    }
});

export default User;

