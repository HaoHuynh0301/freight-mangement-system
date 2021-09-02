import { extend } from 'lodash';
import React, { Component } from 'react';
import {
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    ScrollView,
    TextInput
} from 'react-native';
import {
    headerFontSize,
    backIcon,
    bankIcon,
    homeIcon,
    cartIcon,
    locationIcon,
    moneyIcon,
    accountIcon,
    messageIcon,
    callIcon,
    keyIcon,
    appFontSize
} from '../contants';
const axios = require('axios');

class EditInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shopName: '',
            phoneNumber: '',
            email: '',
            password: ''
        }
    }

    getListOfBankds() {
        axios.get(`https://api.vietqr.io/v1/banks`)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidMount() {
        this.getListOfBankds();
    }

    saveButtonPressed() {
        console.log('Save');
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
                <View style = {{alignItems: 'center', flex: 1}}>
                    <Text style = {styles.nameWrapper}>{this.props.route.params.status}</Text>
                </View>
            </View>
        );
    }

    renderEditInformationView() {
        return(
            <ScrollView>
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
                        <Text style = {{fontSize: 17}}>Thông tin cơ bản</Text>
                    </View>
                        <View style={styles.basicInforDetail}>
                            <Image
                                source = {accountIcon}
                                style={styles.basicInforImage}
                            ></Image>
                            <TextInput
                                onChangeText = {(text) => {
                                    this.setState({
                                        shopName: text
                                    });
                                }}
                                value = {this.state.shopName}
                                placeholder = 'ITH'
                                style={styles.inputText}
                            ></TextInput>
                        </View>
                        <View style={styles.basicInforDetail}>
                            <Image
                                source = {callIcon}
                                style={styles.basicInforImage}
                            ></Image>
                            <TextInput
                                onChangeText = {(text) => {
                                    this.setState({
                                        phoneNumber: text
                                    });
                                }}
                                value = {this.state.phoneNumber}
                                placeholder = '0932843656'
                                style={styles.inputText}
                            ></TextInput>
                        </View>
                        <View style={styles.basicInforDetail}>
                            <Image
                                source = {messageIcon}
                                style={styles.basicInforImage}
                            ></Image>
                            <TextInput
                                onChangeText = {(text) => {
                                    this.setState({
                                        email: text
                                    });
                                }}
                                value = {this.state.email}
                                placeholder = 'hao152903@gmail.com'
                                style={styles.inputText}
                            ></TextInput>
                        </View>
                        <View style={styles.basicInforDetail}>
                            <Image
                                source = {keyIcon}
                                style={styles.basicInforImage}
                            ></Image>
                            <TextInput
                                onChangeText = {(text) => {
                                    this.setState({
                                        password: text
                                    });
                                }}
                                placeholder = 'Mật khẩu'
                                style={styles.inputText}
                                secureTextEntry = {true}
                            ></TextInput>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={{
                            width: '92%',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            height: 40,
                            backgroundColor: '#ff7733',
                            marginTop: 10,
                            borderRadius: 10
                        }}
                        onPress = {() => {
                            this.saveButtonPressed()
                        }}
                    >
                        <Text style={{fontSize: appFontSize}}>Lưu</Text>
                    </TouchableOpacity>
            </ScrollView>
        );
    }

    renderEditBakingInformationView() {
        return(
            <View>

            </View>
        );
    }

    renderMainEditInformation() {

    }

    render() {
        return(
            <SafeAreaView>
                {this.renderHeader()}
                {this.renderEditInformationView()}
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
        // left: 140,
        fontSize: 22,
        color: '#000'
    },
    backIcon: {
        width: 25,
        height: 25
    },
    bankingInforWrapper: {
        height: 240,
        flexDirection: 'column',
        // alignItems: 'center',
        width: '92%',
        backgroundColor: '#FFF',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 10
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
    inputText: {
        marginLeft: 10,
        fontSize: appFontSize
    }
});

export default EditInformation;