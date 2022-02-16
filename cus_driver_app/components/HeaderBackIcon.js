import React, {Component} from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {backIcon} from '../contants';
import styles from './styles';

class HeaderBackIcon extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.iconBackWrapper}
          onPress={() => this.props.navigation.goBack()}>
          <Image
            source={backIcon}
            resizeMode="contain"
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.nameWrapper}>{this.props.title}</Text>
      </View>
    );
  }
}

export default HeaderBackIcon;
