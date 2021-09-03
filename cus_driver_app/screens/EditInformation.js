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
    TextInput,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
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
    appFontSize,
    greyColor
} from '../contants';
const axios = require('axios');

class EditInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // User information
            shopName: '',
            phoneNumber: '',
            email: '',
            password: '',

            // array got from API
            banks: [],
            provinces: [],

            // Banking information
            accountName: '',
            stk: '',
            bankName: '',
            bankLocation: '',

            // Banking Picker
            bankSelectedValue: '',
            bankSelectedIndex: '',

            // Provinces Pick
            provinceSelectedValue: ''
        }
    }

    getListOfBankds() {
        axios.get(`https://api.vietqr.io/v1/banks/`)
            .then((response) => {
                // console.log(response.data);
                this.setState({
                    banks: response.data.data
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getListOfProvinces() {
        axios.get('https://provinces.open-api.vn/api/')
            .then((response) => {
                this.setState({
                    provinces: response.data
                });
                // console.log(this.state.provinces);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidMount() {
        this.getListOfBankds();
        this.getListOfProvinces();
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
            <ScrollView>
                <View style={styles.bankingEditInforWrapper}>
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
                        <Text style = {{fontSize: 17}}>Sửa thông tin ngân hàng, đối soát</Text>
                    </View>
                    <View style={styles.editBakingDetailWrapper}>
                        <Text style = {{fontSize: 17}}>Chủ tài khoản</Text>
                        <TextInput
                            onChangeText = {(text) => {
                                this.setState({
                                    accountName: text
                                });
                            }}
                            value = {this.state.accountName}
                            placeholder = 'HUYNH QUAN NHAT HAO'
                            style={styles.bankingEditInput}
                        ></TextInput>
                    </View>
                    <View style={styles.editBakingDetailWrapper}>
                        <Text style = {{fontSize: 17}}>Số tài khoản</Text>
                        <TextInput
                            onChangeText = {(text) => {
                                this.setState({
                                    stk: text
                                });
                            }}
                            value = {this.state.stk}
                            placeholder = '0701219318'
                            style={styles.bankingEditInput}
                        ></TextInput>
                    </View>
                    <View style={styles.editBakingDetailWrapper}>
                        <Text style = {{fontSize: 17}}>Bấm để chọn ngân hàng</Text>
                        <View style = {{
                            borderWidth: 0.3,
                            borderColor: greyColor,
                            marginTop: 5,
                            borderRadius: 10
                        }}>
                            <Picker
                                style = {styles.banksPicker}
                                selectedValue = {this.state.bankSelectedValue}
                                onValueChange = {(itemValue, itemIndex) => {
                                    console.log(itemValue)
                                    this.setState({
                                        bankSelectedValue: itemValue,
                                        bankSelectedIndex: itemIndex
                                    });
                                    console.log(this.state.bankSelectedValue);
                                }}
                            >
                                {this.state.banks.map((item) => {
                                    return(
                                        <Picker.Item label = {item.name} value = {item.name} />
                                    );
                                })}
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.editBakingDetailWrapper}>
                        <Text style = {{fontSize: 17}}>Bấm để chọn chi nhánh</Text>
                        <View style = {{
                            borderWidth: 0.3,
                            borderColor: greyColor,
                            marginTop: 5,
                            borderRadius: 10
                        }}>
                            <Picker
                                style = {styles.banksPicker}
                                selectedValue = {this.state.bankSelectedValue}
                                onValueChange = {(itemValue, itemIndex) => {
                                    console.log(itemValue)
                                    this.setState({
                                        bankSelectedValue: itemValue,
                                        bankSelectedIndex: itemIndex
                                    });
                                }}
                            >
                                {this.state.provinces.map((item) => {
                                    return(
                                        <Picker.Item label = {item.name} value = {item.name} />
                                    );
                                })}
                            </Picker>
                        </View>
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

    renderLocationEditView() {
        return(
            <View>
                <Text>Location</Text>
            </View>
        );
    }

    renderMainEditInformation() {
        console.log(this.props.route.params.status);
        const status = this.props.route.params.status;
        if(status === 'Sửa thông tin cơ bản') {
            return(
                this.renderEditInformationView()
            );
        } else if(status === 'Sửa thông tin ngân hàng') {
            return(
                this.renderEditBakingInformationView()
            );
        }
        return(
            this.renderLocationEditView()
        );
    } 

    render() {
        return(
            <SafeAreaView>
                {this.renderHeader()}
                {this.renderMainEditInformation()}
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
    },
    bankingEditInforWrapper: {
        height: 400,
        flexDirection: 'column',
        // alignItems: 'center',
        width: '92%',
        backgroundColor: '#FFF',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 10,
    },
    editBakingDetailWrapper: {
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
    },
    bankingEditInput: {
        fontSize: 17,
        borderWidth: 0.3,
        borderRadius: 10,
        marginTop: 5,
        height: 40,
        fontSize: 17,
        paddingLeft: 10
    },
    banksPicker: {
        borderWidth: 0.3,
        borderColor: greyColor,
    }
});

export default EditInformation;