import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {ipAddress} from '../../../contants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, TextField} from 'react-native-ui-lib';
import {LOGIN_CONTSTANT} from '../../../contants/auth.constants';
import styles from './signin.style';
import AuthForm from '../AuthForm.js';
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
    };
  }

  async middleWare() {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(`${ipAddress}/api/middleware/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        this.setState({
          isSignedIn: true,
        });
      })
      .catch(error => {
        this.setState({
          isSignedIn: false,
        });
      });
  }

  handleSignInPressed() {
    axios
      .post(`${ipAddress}/api/sign-in/`, {
        email: this.state.email,
        password: this.state.password,
      })
      .then(async response => {
        await AsyncStorage.setItem('token', response.data.access_token);
        this.setState({
          email: '',
          password: '',
        });
        this.props.navigation.navigate('Tabs', {});
      })
      .catch(error => {
        displayAlert('Email or password is invalid!');
      });
  }

  handleRegisterPressed() {
    this.props.navigation.navigate('Register');
  }

  componentDidMount() {
    this.middleWare();
  }

  render() {
    return (
      <AuthForm
        title="Vui lòng đăng nhập"
        logInButton="Đăng nhập"
        subFooter
        handleLogIn={this.handleSignInPressed}
      />
    );
  }
}

// <View style={styles.signInWrapper}>
//   <Text style={styles.impText}>Vui lòng đăng nhập</Text>
//   <View style={styles.inputWrapper}>
//     <View style={styles.inputDetailWrapper}>
//       {LOGIN_CONTSTANT.map((item, index) => {
//         const changeTextValue = text => {
//           if (item.value === 'password') {
//             this.setState({password: text});
//           } else {
//             this.setState({email: text});
//           }
//         };
//         return (
//           <TextField
//             key={index}
//             style={styles.textInput}
//             placeholder={item.placeholder}
//             secureTextEntry={item.value === 'password' ? true : false}
//             onChangeText={text => changeTextValue(text)}
//             value={
//               item.value === 'password'
//                 ? this.state.password
//                 : this.state.email
//             }
//             floatingPlaceholder
//             showCharCounter
//           />
//         );
//       })}
//     </View>
//   </View>
//   <Button
//     label={'Đăng nhập'}
//     style={styles.buttonLogin}
//     onPress={() => {
//       this.handleSignInPressed();
//     }}
//   />
//   <View style={styles.registerWrapper}>
//     <Text style={styles.registerText}>Bạn chưa có tài khoản ? </Text>
//     <TouchableOpacity
//       onPress={() => {
//         this.handleRegisterPressed();
//       }}>
//       <Text style={styles.registerText}>Đăng ký tài khoản</Text>
//     </TouchableOpacity>
//   </View>
// </View>

export default SignIn;
