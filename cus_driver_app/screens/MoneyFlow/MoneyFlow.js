/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import {appFontSize, rightArrowIcon, ipAddress} from '../../contants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './moneyFlow.style';
import axios from 'axios';

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

class MonenyFlow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Paid money
      paidMoney: 0.0,

      // Un-Paid money
      unPaidMoney: 0.0,

      // Shipping money
      shippingMoney: 0.0,

      isFetching: false,
    };
  }

  async getPaidMoney() {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(`${ipAddress}/api/paidmoney?money-status=1`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async response => {
        await this.setState({
          paidMoney: response.data.paid_money,
        });
      })
      .catch(error => {
        displayAlert('We have some errors! Please try again!');
      });
  }

  async getUnPaidMoney() {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(`${ipAddress}/api/paidmoney?money-status=2`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async response => {
        await this.setState({
          unPaidMoney: response.data.paid_money,
        });
      })
      .catch(error => {
        displayAlert('We have some errors! Please try agai!');
      });
  }

  async getShippingMoney() {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(`${ipAddress}/api/paidmoney?money-status=3`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async response => {
        await this.setState({
          shippingMoney: response.data.paid_money,
        });
      })
      .catch(error => {
        displayAlert('We have some errors! Please try agai!');
      });
  }

  componentDidMount() {
    this.getPaidMoney();
    this.getUnPaidMoney();
    this.getShippingMoney();
  }

  onRefresh() {
    this.setState({
      isFetching: true,
    });
    this.getPaidMoney();
    this.getUnPaidMoney();
    this.getShippingMoney();
    this.setState({
      isFetching: false,
    });
  }

  renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.userInformationText}>Dòng tiền</Text>
        <TouchableOpacity
          onPress={() => {
            //Sửa thông tin ngân hàng
            this.props.navigation.navigate('EditInformation', {
              status: 'Sửa thông tin ngân hàng',
            });
          }}
          style={{left: 230}}>
          <Text
            style={{
              fontSize: appFontSize,
            }}>
            Cài đặt
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderMainView() {
    const item = () => {
      return (
        <View style={styles.mainViewWrapper}>
          <View style={styles.flowMoneyDetail}>
            <Text style={styles.textAppFontSize}>Phí giao hàng: </Text>
            <Text style={styles.textHighlight}>
              {this.state.shippingMoney} đ
            </Text>
          </View>
          <View style={styles.flowMoneyDetail}>
            <Text style={styles.textAppFontSize}>Tiền chưa đối soát: </Text>
            <Text style={styles.textHighlight}>{this.state.unPaidMoney} đ</Text>
          </View>
          <View style={styles.flowMoneyDetail}>
            <Text style={styles.textAppFontSize}>Tiền đã đối soát: </Text>
            <Text style={styles.textHighlight}>{this.state.paidMoney} đ</Text>
          </View>
          <TouchableOpacity style={styles.btnVAT}>
            <Text style={styles.textHighlight}>Quản lý hóa đơn VAT</Text>
            <Image
              source={rightArrowIcon}
              style={{
                height: 20,
                width: 20,
              }}
            />
          </TouchableOpacity>
        </View>
      );
    };
    return (
      <FlatList
        data={[{id: 1}]}
        showsHorizontalScrollIndicator={false}
        // eslint-disable-next-line no-shadow
        keyExtractor={item => item.id}
        renderItem={item}
        onRefresh={() => {
          this.onRefresh();
        }}
        refreshing={this.state.isFetching}
      />
    );
  }

  render() {
    return (
      <SafeAreaView>
        {this.renderHeader()}
        {this.renderMainView()}
      </SafeAreaView>
    );
  }
}

export default MonenyFlow;
