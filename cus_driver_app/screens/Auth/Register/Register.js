/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, SafeAreaView, Image, Alert} from 'react-native';
import {backIcon, greyColor, ipAddress} from '../../../contants';
import {Button, TextField} from 'react-native-ui-lib';
import {Picker} from '@react-native-picker/picker';
import styles from './register.style';
const axios = require('axios');

const displayAlert = message => {
  Alert.alert('Notification', message, [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Bank picker
      selectedProvine: '',
      selectedBank: '',
      banks: [],
      provinces: [],

      // Register information
      customerName: '',
      phoneNumber: '',
      email: '',
      password: '',
      address: '',
      bankUsername: '',
      bankNumber: '',
    };
  }

  getListOfBankds() {
    axios
      .get('https://api.vietqr.io/v1/banks/')
      .then(response => {
        this.setState({
          banks: response.data.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getListOfProvinces() {
    axios
      .get('https://provinces.open-api.vn/api/')
      .then(response => {
        this.setState({
          provinces: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleRegisterButtomPressed() {
    axios
      .post(`${ipAddress}/api/register/`, {
        customer_name: this.state.customerName,
        phone_numner: this.state.phoneNumber,
        address: this.state.address,
        bank_name: this.state.selectedBank,
        bank_number: this.state.bankNumber,
        bank_provine: this.state.selectedProvine,
        bank_username: this.state.bankUsername,
        password: this.state.password,
        email: this.state.email,
      })
      .then(response => {
        displayAlert('Created new account successfully!');
        this.setState({
          customer_name: '',
          phone_numner: '',
          address: '',
          bank_name: '',
          bank_number: '',
          bank_provine: '',
          bank_username: '',
          password: '',
          email: '',
        });
        this.props.navigation.navigate('SignIn', {});
      })
      .catch(error => {
        displayAlert('Account information is invalid! Try again!');
      });
  }

  componentDidMount() {
    this.getListOfBankds();
    this.getListOfProvinces();
  }

  renderHeader() {
    return (
      <View style={styles.container}>
        <Button
          style={styles.iconBackWrapper}
          onPress={() => {
            this.props.navigation.goBack();
          }}>
          <Image
            source={backIcon}
            resizeMode="contain"
            style={styles.backIcon}
          />
        </Button>
        <Text style={styles.nameWrapper}>Đăng ký tài khoản</Text>
      </View>
    );
  }

  renderRegisterView() {
    return (
      <View style={styles.registerWrapper}>
        <View style={styles.appInforTitleWapper}>
          <Text style={styles.appInforTitle}>Thông tin cửa hàng</Text>
        </View>
        <View style={styles.inputsWrapper}>
          <TextField
            style={styles.textInput}
            placeholder="Tên cửa hàng/shop"
            onChangeText={text => {
              this.setState({
                customerName: text,
              });
            }}
            value={this.state.customerName}
          />
          <TextField
            style={styles.textInput}
            placeholder="Điện thoại liên hệ"
            onChangeText={text => {
              this.setState({
                phoneNumber: text,
              });
            }}
            value={this.state.phoneNumber}
          />
          <TextField
            style={styles.textInput}
            placeholder="Email"
            onChangeText={text => {
              this.setState({
                email: text,
              });
            }}
            value={this.state.email}
          />
          <TextField
            style={styles.textInput}
            placeholder="Mật khẩu"
            onChangeText={text => {
              this.setState({
                password: text,
              });
            }}
            value={this.state.password}
          />
          <TextField
            style={styles.textInput}
            placeholder="Số nhà, hẻm, ngỏ, ngách, tòa nhà"
            onChangeText={text => {
              this.setState({
                address: text,
              });
            }}
            value={this.state.address}
          />
        </View>
        <View style={styles.paymentInforWrapper}>
          <Text style={styles.appInforTitle}>Thông tin đối soát</Text>
        </View>
        <View style={styles.inputsWrapper}>
          <TextField
            style={styles.textInput}
            placeholder="Chủ tài khoản ngân hàng"
            onChangeText={text => {
              this.setState({
                bankUsername: text,
              });
            }}
            value={this.state.bankUsername}
          />
          <TextField
            style={styles.textInput}
            placeholder="Số tài khoản ngân hàng"
            onChangeText={text => {
              this.setState({
                bankNumber: text,
              });
            }}
            value={this.state.bankNumber}
          />
        </View>
        <View style={styles.editBakingDetailWrapper}>
          <Text style={{fontSize: 17}}>Bấm để chọn ngân hàng</Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: greyColor,
              marginTop: 5,
              borderRadius: 10,
            }}>
            <Picker
              style={styles.banksPicker}
              selectedValue={this.state.selectedBank}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({
                  selectedBank: itemValue,
                });
              }}>
              {this.state.banks.map((item, key) => {
                return (
                  <Picker.Item key={key} label={item.name} value={item.name} />
                );
              })}
            </Picker>
          </View>
        </View>
        <View style={styles.editBakingDetailWrapper}>
          <Text style={{fontSize: 17}}>Bấm để chọn chi nhánh</Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: greyColor,
              marginTop: 5,
              borderRadius: 10,
            }}>
            <Picker
              style={styles.banksPicker}
              selectedValue={this.state.selectedProvine}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({
                  selectedProvine: itemValue,
                });
              }}>
              {this.state.provinces.map((item, key) => {
                return (
                  <Picker.Item key={key} label={item.name} value={item.name} />
                );
              })}
            </Picker>
          </View>
        </View>
        <View style={styles.confirmationWrapper} />
        <View style={{alignItems: 'center'}}>
          <Button
            style={styles.buttonRegister}
            onPress={() => {
              this.handleRegisterButtomPressed();
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Đăng ký</Text>
          </Button>
        </View>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView>
        {this.renderHeader()}
        {this.renderRegisterView()}
      </SafeAreaView>
    );
  }
}

export default Register;
