/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {
  orangeColor,
  appFontSize,
  bycicleIcon,
  rightArrowIcon,
  xIcon,
  ipAddress,
} from '../../contants';
import Modal from 'react-native-modal';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STATUS_CONSTANT} from '../OrderDetail/orderDetail.constants';
import {SHIP_OPTIONS} from './orders.constants';
import styles from './order.style';
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

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      orderId: '',
      selectedData: '',

      // Modal
      isVisible: false,
      actionRequestSelected: '',
      actions: [
        {
          name: 'Giục lấy',
          id: 1,
        },
        {
          name: 'Giao',
          id: 2,
        },
        {
          name: 'Trả hàng',
          id: 3,
        },
      ],

      isFetching: false,
    };
  }

  async getOrderInformation() {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(`${ipAddress}/api/order-information/`, {
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
        displayAlert(error);
      });
  }

  renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.userInformationText}>Đơn hàng</Text>
      </View>
    );
  }

  handleRefreshOrders() {
    this.getOrderInformation();
  }

  handleCreateOrderPressed(status) {
    this.props.navigation.navigate('CreateOrder', {
      status: status,
    });
  }

  oppenOrderInformation(id, order) {
    this.props.navigation.navigate('OrderDetail', {
      id: id,
      order: order,
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

  componentDidMount() {
    this.getOrderInformation();
  }

  onRefresh() {
    this.setState({
      isFetching: true,
    });
    this.getOrderInformation();
    this.setState({
      isFetching: false,
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
                onValueChange={async (itemValue, itemIndex) => {
                  await this.setState({
                    actionRequestSelected: itemValue,
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
              this.handleSendRequest();
            }}>
            <Text style={styles.appFontSize}>Gửi yêu cầu</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  renderMainView() {
    const renderItem = ({item}) => {
      // eslint-disable-next-line no-shadow
      const status = STATUS_CONSTANT.find(status => (status.id = item.status));
      const statusName = status.name;
      return (
        <View style={styles.productInformationDetailWrapper}>
          <View style={styles.productInformationDetailTitle}>
            <Image source={bycicleIcon} style={styles.iconStyle} />
            <Text style={styles.appFontSize}>{item.id}</Text>
            <TouchableOpacity
              onPress={() => {
                this.oppenOrderInformation(item.status, item);
              }}
              style={{
                paddingLeft: 280,
              }}>
              <Image
                source={rightArrowIcon}
                style={styles.rightArrowIconStyle}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.productInformationDetail}>
            <Text style={styles.appFontSize}>
              Tên: {item.customer_name}/ {item.customer_phonenumber}
            </Text>
            <Text style={styles.appFontSize}>
              Đại chỉ: {item.detail_address}
            </Text>
            <Text style={styles.appFontSize}>Thu hộ: {item.cast} đ</Text>
          </View>
          <View style={styles.orderStatusWrapper}>
            <View style={styles.orderStatusTitle}>
              <Text style={styles.highlightText}>Trạng thái: </Text>
              <Text style={styles.highlightText}>{statusName}</Text>
            </View>
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

    const renderEmptyFavoriteProducts = () => {
      return (
        <View style={styles.emptyViewWrapper}>
          <Text style={styles.textSize}>Không tìm thấy đơn hàng</Text>
          <View style={styles.butonEmptyRefreshWrapper}>
            <TouchableOpacity
              onPress={() => {
                this.handleRefreshOrders();
              }}>
              <Text style={{alignSelf: 'center'}}>Bấm để thử lại</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    };

    return (
      <View style={{flex: 1}}>
        <View style={styles.addNewOrderWrapper}>
          <View style={styles.sizeChooseWrapper}>
            {SHIP_OPTIONS.map((option, index) => {
              return (
                <TouchableOpacity
                  style={styles.chooseDetail}
                  onPress={() => {
                    this.handleCreateOrderPressed(option.id);
                  }}>
                  <Text style={{fontSize: 15}}>{option.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
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
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        {this.renderModal()}
        {this.renderHeader()}
        {this.renderMainView()}
      </SafeAreaView>
    );
  }
}

export default Orders;
