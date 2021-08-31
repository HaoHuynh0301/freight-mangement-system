import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    ScrollView,
    TouchableOpacity
} from "react-native";
import {
    impText,
    appFontSize
} from '../contants';

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
        this.props.navigation.navigate('Register', {

        });
    }

    handleRegisterPressed() {
        this.props.navigation.navigate('Register', {

        });
    }

    renderUserPage() {
        <ScrollView style={styles.scrollView}>
            <Text>Hello</Text>
        </ScrollView>
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
        if(this.state.isAuth) {
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
});

export default User;

