/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import {backIcon} from '../../contants';
import {Button} from 'react-native-ui-lib';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {styles} = this.props;
    return (
      <View style={styles.container}>
        <Button
          style={styles.iconBackWrapper}
          onPress={() => this.props.navigation.goBack()}>
          <Image
            source={backIcon}
            resizeMode="contain"
            style={styles.backIcon}
          />
        </Button>
        <View style={{alignItems: 'center', flex: 1}}>
          <Text style={styles.nameWrapper}>
            {this.props.route.params.status}
          </Text>
        </View>
      </View>
    );
  }
}

export default Header;
