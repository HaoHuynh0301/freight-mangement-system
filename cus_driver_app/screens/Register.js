import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    TextInput,
} from 'react-native';
import {
    HeaderBackIcon
} from '../components';
import {
    headerFontSize,
    backIcon,
    appFontSize
} from '../contants';
import RadioGroup from 'react-native-radio-buttons-group';

class Register extends Component {
    constructor(props) {
        super(props);
    }

    renderHeader() {
        return(
            <View style={styles.container}>
                <TouchableOpacity
                    style = {styles.iconBackWrapper}
                    onPress={() => this.props.navigation.goBack()}
                >
                    <Image
                        source = {backIcon}
                        resizeMode = 'contain'
                        style = {styles.backIcon}
                    ></Image>
                </TouchableOpacity>
                <Text style = {styles.nameWrapper}>Đăng ký tài khoản</Text>
            </View>
        );
    }

    renderRegisterView() {
        return(
            <View style={styles.registerWrapper}>
                <View style={styles.appInforTitleWapper}>
                    <Text style={styles.appInforTitle}>Thông tin cửa hàng</Text>
                </View>
                <View style={styles.inputsWrapper}>
                    <TextInput
                        style={styles.textInput}
                        placeholder = 'Tên cửa hàng/shop'
                    ></TextInput>
                    <TextInput
                        style={styles.textInput}
                        placeholder = 'Điện thoại liên hệ'
                    ></TextInput>
                    <TextInput
                        style={styles.textInput}
                        placeholder = 'Email'
                    ></TextInput>
                    <TextInput
                        style={styles.textInput}
                        placeholder = 'Mật khẩu'
                    ></TextInput>
                    <TextInput
                        style={styles.textInput}
                        placeholder = 'Xác nhận mật khẩu'
                    ></TextInput>
                    <TextInput
                        style={styles.textInput}
                        placeholder = 'Số nhà, hẻm, ngỏ, ngách, tòa nhà'
                    ></TextInput>
                </View>
                <View style={styles.paymentInforWrapper}>
                    <Text style={styles.appInforTitle}>Thông tin đối soát</Text>
                </View>
                <View style={styles.inputsWrapper}>
                    <TextInput
                        style={styles.textInput}
                        placeholder = 'Chủ tài khoản ngân hàng'
                    ></TextInput>
                    <TextInput
                        style={styles.textInput}
                        placeholder = 'Số tài khoản ngân hàng'
                    ></TextInput>
                </View>
                <View style={styles.confirmationWrapper}>
                    <RadioGroup 
                        radioButtons = {['1']}
                        onPress = {(key) => {
                            console.log(key[0])
                        }}
                    />
                    <Text>Tôi đã đọc và đồng ý với điều khoản</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity 
                        style = {styles.buttonRegister}
                        onPress = {() => {
                            console.log('ok');
                        }}
                    >
                        <Text style = {{fontSize: 20, fontWeight: 'bold'}}>Sign in</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    render() {
        return(
            <SafeAreaView>
                {this.renderHeader()}
                {this.renderRegisterView()}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
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
    headerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        height: 65
    },  
    nameWrapper: {
        left: 100,
        fontSize: 22,
        color: '#000'
    },
    backIcon: {
        width: 25,
        height: 25
    },
    registerWrapper: {
        flexDirection: 'column'
    },
    appInforTitle: {
        fontSize: appFontSize,
        fontWeight: 'bold',
        paddingLeft: 25
    },
    appInforTitleWapper: {
        height: 40,
        justifyContent: 'center',
        paddingLeft: 10
    },
    textInput: {
        borderWidth: 0.8,
        borderRadius: 10,
        width: 350,
        height: 36,
        marginTop: 8,
        paddingLeft: 10,
    },
    inputsWrapper: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    paymentInforWrapper: {
        marginTop: 20,
        marginLeft: 10
    },
    confirmationWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
    },
    buttonRegister: {
        backgroundColor: '#ff7733',
        width: 350,
        height: 40,
        marginTop: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default Register;

