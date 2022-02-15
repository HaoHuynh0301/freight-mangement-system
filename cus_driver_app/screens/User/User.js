/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {
  accountIcon,
  homeIcon,
  messageIcon,
  callIcon,
  cartIcon,
  bankIcon,
  locationIcon,
  moneyIcon,
  ipAddress,
  reloadIcon,
} from '../../contants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './user.style';
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

      updated: false,
    };
  }

  async getUserInformation() {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(`${ipAddress}/api/user-information/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        this.setState({
          userInformation: response.data,
        });
      })
      .catch(error => {
        displayAlert('We have some error! Please try again later!');
      });
  }

  static getDerivedStateFromProps(props, state) {
    state.updated = true;
    return true;
  }

  async getItemFromAsyncStorage(name) {
    const item = await AsyncStorage.getItem('customer_name', '');
    return item;
  }

  componentDidMount() {
    this.getUserInformation();
  }

  async signOutButtonPressed() {
    await AsyncStorage.setItem('token', '');
    this.setState({
      isAuth: false,
    });
    this.props.navigation.navigate('SignIn', {});
  }

  editButtonPressed(status) {
    this.props.navigation.navigate('EditInformation', {
      status: status,
    });
  }

  renderUserPage() {
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.userInformationText}>Tài khoản</Text>
        </View>
        <View style={styles.avtWrapper}>
          <Image source={accountIcon} style={{height: 60, width: 60}} />
          <View
            style={{
              marginLeft: 15,
            }}>
            <Text style={styles.norText}>
              {this.state.userInformation.customer_name}
            </Text>
            <Text style={styles.norText}>S321312</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.getUserInformation();
            }}
            style={{
              marginLeft: 50,
            }}>
            <Image
              source={reloadIcon}
              style={{
                height: 20,
                width: 20,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.basicInformationWrapper}>
          <View style={styles.basicInforContainer}>
            <Text style={{fontSize: 17}}>Thông tin cơ bản</Text>
            <TouchableOpacity
              onPress={() => {
                this.editButtonPressed('Sửa thông tin cơ bản');
              }}>
              <Text style={{fontSize: 17, color: '#ff7733'}}>Sửa</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.basicInforDetail}>
            <Image source={homeIcon} style={styles.basicInforImage} />
            <Text style={styles.basicInforText}>
              {this.state.userInformation.customer_name}
            </Text>
          </View>
          <View style={styles.basicInforDetail}>
            <Image source={callIcon} style={styles.basicInforImage} />
            <Text style={styles.basicInforText}>
              {this.state.userInformation.phone_numner}
            </Text>
          </View>
          <View style={styles.basicInforDetail}>
            <Image source={messageIcon} style={styles.basicInforImage} />
            <Text style={styles.basicInforText}>
              {this.state.userInformation.email}
            </Text>
          </View>
          <View style={styles.basicInforDetail}>
            <Image source={cartIcon} style={styles.basicInforImage} />
          </View>
        </View>

        <View style={styles.bankingInforWrapper}>
          <View style={styles.inforContainer}>
            <Text style={{fontSize: 17}}>Thông tin ngân hàng, đối soát</Text>
            <TouchableOpacity
              onPress={() => {
                this.editButtonPressed('Sửa thông tin ngân hàng');
              }}>
              <Text style={{fontSize: 17, color: '#ff7733'}}>Sửa</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.basicInforDetail}>
            <Image source={homeIcon} style={styles.basicInforImage} />
            <Text style={styles.basicInforText}>
              {this.state.userInformation.bank_username}
            </Text>
          </View>
          <View style={styles.basicInforDetail}>
            <Image source={cartIcon} style={styles.basicInforImage} />
            <Text style={styles.basicInforText}>
              {this.state.userInformation.bank_number}
            </Text>
          </View>
          <View style={styles.basicInforDetail}>
            <Image source={bankIcon} style={styles.basicInforImage} />
            <Text style={styles.basicInforText}>
              {this.state.userInformation.bank_name}
            </Text>
          </View>
          <View style={styles.basicInforDetail}>
            <Image source={locationIcon} style={styles.basicInforImage} />
            <Text style={styles.basicInforText}>
              {this.state.userInformation.bank_provine}
            </Text>
          </View>
          <View style={styles.basicInforDetail}>
            <Image source={moneyIcon} style={styles.basicInforImage} />
            <Text style={styles.basicInforText}>Đối soát 3 lần/tuần 2/4/6</Text>
          </View>
        </View>
        <View style={styles.locationInforWrapper}>
          <View style={styles.inforContainer}>
            <Text style={{fontSize: 17}}>Địa chỉ, thông tin lấy hàng</Text>
            <TouchableOpacity
              onPress={() => {
                this.editButtonPressed('Sửa địa chỉ');
              }}>
              <Text style={{fontSize: 17, color: '#ff7733'}}>Sửa</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.basicInforDetail}>
            <Text style={styles.basicInforText}>
              {this.state.userInformation.customer_name} /{' '}
              {this.state.userInformation.phone_numner}
            </Text>
          </View>
          <View style={styles.basicInforDetail}>
            <Text style={styles.basicInforText}>
              {this.state.userInformation.address} /{' '}
              {this.state.userInformation.province} /{' '}
              {this.state.userInformation.district}
            </Text>
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              this.signOutButtonPressed();
            }}>
            <Text
              style={{
                fontSize: 17,
                fontStyle: 'italic',
              }}>
              Đăng xuất
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  renderMainView() {
    return this.renderUserPage();
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>{this.renderMainView()}</SafeAreaView>
    );
  }
}

export default User;
