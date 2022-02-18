import React, {Component} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {Button, TextField} from 'react-native-ui-lib';
import styles from './auth.style';

class AuthForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {classes, title, subFooter, logInButton} = this.props;
    return (
      <SafeAreaView>
        {title && <Text classes={classes.impText}>{title}</Text>}

        {logInButton && (
          <Button
            label={logInButton}
            style={classes.buttonLogin}
            onPress={() => {
              this.props.handleLogIn;
            }}
          />
        )}

        {subFooter && (
          <View style={classes.registerWrapper}>
            <Text style={classes.registerText}>Bạn chưa có tài khoản ? </Text>
            <TouchableOpacity
              onPress={() => {
                this.handleRegisterPressed();
              }}>
              <Text style={classes.registerText}>Đăng ký tài khoản</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

export default AuthForm;
