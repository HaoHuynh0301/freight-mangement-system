import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {Component} from 'react';
import {Text, Image, Alert} from 'react-native';
import {xIcon, ipAddress, carIcon} from '../../contants';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {Button, View} from 'react-native-ui-lib';
import styles from './orderMap.style';

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

class OrderMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {},
      latitudeDelta: 0,
      longitudeDelta: 0,
      orderId: '',

      // Instance Address
      instanceProvince: '',
      insLatitude: '',
      insLongitude: '',

      // Delivered Address
      deliveredLatitude: '',
      deliveredLongitude: '',
    };
  }

  async getInstanceAddress() {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(
        `${ipAddress}/api/cus-instance-address?order_id=${this.props.route.params.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => {
        axios
          .get(
            `http://api.positionstack.com/v1/forward?access_key=ee95aa7c3e382e9aa806014b08955f13&query=1600 ${response.data.province}`,
          )
          // eslint-disable-next-line no-shadow
          .then(async response => {
            var datas = response.data.data;
            await this.setState({
              deliveredLatitude: datas[0].latitude,
              deliveredLongitude: datas[0].longitude,
            });
          })
          .catch(error => {
            displayAlert(String(error));
          });
      })
      .catch(error => {
        displayAlert('There are some errors! Please try again later!');
      });
  }

  getDriverAddress = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log('INSTANCE: ' + this.props.route.params.id);
    axios
      .get(
        `${ipAddress}/api/driver-address?order_id=${this.props.route.params.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => {
        this.setState({
          insLatitude: response.data.latitude,
          insLongitude: response.data.longitude,
        });
      })
      .catch(error => {
        displayAlert('There are some errors! Please try again later!');
      });
  };

  componentDidMount() {
    this.getInstanceAddress();
    this.getDriverAddress();
  }

  renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <Button
          onPress={() => {
            this.props.navigation.goBack();
          }}>
          <Image source={xIcon} style={styles.xIconStyle} />
        </Button>
        <View style={styles.titleWrapper}>
          <Text style={styles.userInformationText}>BẢN ĐỒ</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.flex}>
        {this.renderHeader()}
        <MapView
          style={styles.flex}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          region={{
            latitude: Number(this.state.insLatitude),
            longitude: Number(this.state.insLongitude),
            latitudeDelta: 12,
            longitudeDelta: 6,
          }}>
          <Marker
            coordinate={{
              latitude: Number(this.state.deliveredLatitude),
              longitude: Number(this.state.deliveredLongitude),
            }}
            anchor={{x: 0.5, y: 0.5}}
            flat={true}
            title="Địa chỉ vận chuyển của đơn hàng"
          />
          <Marker
            coordinate={{
              latitude: Number(this.state.insLatitude),
              longitude: Number(this.state.insLongitude),
            }}
            anchor={{x: 0.5, y: 0.5}}
            flat={true}
            title="Vị trí hiện tại của đơn hàng">
            <Image source={carIcon} style={styles.carIcon} />
          </Marker>
        </MapView>
      </View>
    );
  }
}

export default OrderMap;
