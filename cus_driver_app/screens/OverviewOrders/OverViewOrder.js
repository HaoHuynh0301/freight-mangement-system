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
import {
  orangeColor,
  appFontSize,
  bycicleIcon,
  xIcon,
  ipAddress,
} from '../../contants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import styles from './overviewOrder.style';
const axios = require('axios');
import {Picker} from '@react-native-picker/picker';
import {REQUEST_OPTIONS} from '../OrderDetail/orderDetail.constants';

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

class OverViewOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 1,
      orders: [],
      isFetching: false,
      isVisible: false,
      actions: REQUEST_OPTIONS,
      actionRequestSelected: '',
    };
  }

  renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.userInformationText}>
          {this.props.route.params.title}
        </Text>
      </View>
    );
  }

  onRefresh() {
    this.getListOrders();
  }

  oppenOrderInformation() {
    this.props.navigation.navigate('OrderDetail', {});
  }

  async handleSendRequest() {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(
        `${ipAddress}/api/request?orderId=${this.state.orderId}&rqId=${this.state.actionRequestSelected}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => {
        displayAlert('Request was sent!');
        this.toggleModal();
      })
      .catch(error => {
        displayAlert('Order or request option is invalid!');
      });
  }

  async handleAddStatus(orderId) {
    await this.setState({
      orderId: orderId,
    });
    this.toggleModal();
  }

  toggleModal() {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  }

  renderMainView() {
    const renderEmptyFavoriteProducts = () => {
      return (
        <View style={styles.emptyViewWrapper}>
          <Text style={styles.textSize}>Không tìm thấy đơn hàng</Text>
          <View style={styles.butonEmptyRefreshWrapper}>
            <TouchableOpacity
              onPress={() => {
                this.onRefresh();
              }}>
              <Text style={{alignSelf: 'center'}}>Bấm để thử lại</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    };

    const renderItem = ({item}) => {
      return (
        <View style={styles.productInformationDetailWrapper}>
          <View style={styles.productInformationDetailTitle}>
            <Image source={bycicleIcon} style={styles.iconStyle} />
            <Text style={styles.appFontSize}>{item.id}</Text>
          </View>
          <View style={styles.productInformationDetail}>
            <Text style={styles.appFontSize}>
              Tên: {item.customer_name}/ {item.customer_phonenumber}
            </Text>
            <Text style={styles.appFontSize}>
              Đại chỉ: {item.detail_address}
            </Text>
            <Text style={styles.appFontSize}>Thu hộ: {item.cast} đ</Text>
            <Text style={styles.appFontSize}>Ghi chú: {item.note}</Text>
          </View>
          <TouchableOpacity
            style={styles.buttonAddRequest}
            onPress={() => {
              this.handleAddStatus(item.id);
            }}>
            <Text
              style={{
                fontSize: appFontSize,
                alignSelf: 'center',
              }}>
              Gửi yêu cầu
            </Text>
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <FlatList
        data={this.state.orders}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        extraData={this.state.selectedData}
        contentContainerStyle={{padding: 10, marginTop: 0}}
        ListEmptyComponent={renderEmptyFavoriteProducts}
        onRefresh={() => {
          this.onRefresh();
        }}
        refreshing={this.state.isFetching}
      />
    );
  }

  async getListOrders() {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(`${ipAddress}/api/specific-order?status=${this.state.status}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        this.setState({
          orders: response.data,
        });
      })
      .catch(error => {
        displayAlert('There are some errors! Please try again later!');
      });
  }

  renderModal() {
    return (
      <Modal isVisible={this.state.isVisible}>
        <View
          style={{
            flexDirection: 'column',
            height: 190,
            backgroundColor: '#FFF',
            padding: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                this.toggleModal();
              }}>
              <Image source={xIcon} style={styles.xIconStyle} />
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                paddingLeft: 80,
              }}>
              <Text style={styles.userInformationText}>GỬI YÊU CẦU</Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              marginTop: 10,
            }}>
            <View style={styles.statusDetailWrapper}>
              <Picker
                selectedValue={this.state.actionRequestSelected}
                onValueChange={async (value, key) => {
                  await this.setState({
                    actionRequestSelected: value,
                  });
                }}>
                {this.state.actions.map((item, key) => {
                  return (
                    <Picker.Item key={key} value={item.id} label={item.name} />
                  );
                })}
              </Picker>
            </View>
          </View>
          <TouchableOpacity
            style={{
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: orangeColor,
              borderRadius: 10,
            }}
            onPress={() => {
              this.onRefresh();
            }}>
            <Text style={styles.appFontSize}>Gửi yêu cầu</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      status: this.props.route.params.id,
    });
    this.getListOrders();
  }

  render() {
    return (
      <SafeAreaView>
        {this.renderHeader()}
        {this.renderMainView()}
        {this.renderModal()}
      </SafeAreaView>
    );
  }
}

export default OverViewOrder;
