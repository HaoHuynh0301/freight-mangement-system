/* eslint-disable no-dupe-keys */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {Component} from 'react';
import {SafeAreaView, View, Image, Alert, FlatList} from 'react-native';
import {
  xIcon,
  appFontSize,
  orangeColor,
  ipAddress,
  mapIcon,
} from '../../contants';
import {Button, Text} from 'react-native-ui-lib';
import styles from './orderDetail.style';
import {STATUS_CONSTANT, REQUEST_OPTIONS} from './orderDetail.constants';

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

class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      status: '',
      item: {},
      updateStatus: [],
      requests: [],
      instanceAddress: {},
      selectedFlatlist: 1,
      selectedFlatlist2: 1,
      isFetchingStatus: false,
    };
  }

  async setStatusName(id) {
    let status = STATUS_CONSTANT.find(item => id === item.id);
    await this.setState({
      status: status.name,
    });
  }

  async getStatusUpdate() {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(`${ipAddress}/api/status-update/?order_id=${this.state.item.id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async response => {
        await this.setState({
          updateStatus: response.data,
        });
        var tmpList = [];
        tmpList = this.state.updateStatus;
        for (let i = 0; i < tmpList.length; i++) {
          var statusName = STATUS_CONSTANT.find(
            status => status.id === tmpList[i].status,
          );
          tmpList[i].status = statusName;
        }
        await this.setState({
          updateStatus: tmpList,
        });
      })
      .catch(error => {
        displayAlert('Error');
      });
  }

  async setItem() {
    await this.setState({
      item: this.props.route.params.order,
    });
  }

  async getRequest() {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(`${ipAddress}/api/list-request?orderId=${this.state.item.id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async response => {
        await this.setState({
          requests: response.data,
        });
        var tmpList = [];
        tmpList = this.state.requests;
        for (let i = 0; i < tmpList.length; i++) {
          var request = REQUEST_OPTIONS.find(
            // eslint-disable-next-line no-shadow
            request => tmpList[i].request_option === request.id,
          );
          tmpList[i].request_option = request.name;
        }
        await this.setState({
          requests: tmpList,
        });
      })
      .catch(error => {
        displayAlert('There are some errors! Please try again');
      });
  }

  async getInstanceAddress() {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(
        `${ipAddress}/api/cus-instance-address?order_id=${this.props.route.params.order.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => {
        this.setState({
          instanceAddress: response.data,
        });
      })
      .catch(error => {
        displayAlert('There are some errors! Please try again later!');
      });
  }

  oppenOrderMap() {
    this.props.navigation.navigate('OrderMap', {
      id: this.props.route.params.order.id,
      district: this.props.route.params.order.district,
      order: this.props.route.params.order,
    });
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      id: this.props.route.params.id,
    });
    this.setItem();
    this.setStatusName(this.props.route.params.id);
    this.getStatusUpdate();
    this.getRequest();
    this.getInstanceAddress();
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
          <Text style={styles.userInformationText}>CHÍ TIẾT ĐƠN HÀNG</Text>
        </View>
        <Button
          onPress={() => {
            this.oppenOrderMap();
          }}>
          <Image
            // eslint-disable-next-line react-native/no-inline-styles
            style={styles.mapIcon}
            source={mapIcon}
          />
        </Button>
      </View>
    );
  }

  onRefreshStatus() {
    this.setStatusName(this.props.route.params.id);
    this.getStatusUpdate();
  }

  renderMainView() {
    // eslint-disable-next-line no-shadow
    const item = item => {
      return (
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: appFontSize}}>
            {item.time}: {item.status}
          </Text>
        </View>
      );
    };

    const itemRequest = ({item}) => {
      return (
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: appFontSize}}>
            {item.time}: {item.request_option}
          </Text>
        </View>
      );
    };
    return (
      <View style={styles.mainViewStyle}>
        <View style={styles.basicInforWrapper}>
          <Text style={styles.fontSize}>Trạng thái: {this.state.status}</Text>
          <Text style={styles.fontSize}>Ghi chú: {this.state.item.note}</Text>
          <Text style={styles.fontSize}>
            Sản phẩm: {this.state.item.product_name}
          </Text>
        </View>
        <View style={styles.basicInforWrapper}>
          <Text
            style={{
              fontSize: appFontSize,
              color: orangeColor,
            }}>
            Cập nhật
          </Text>
        </View>
        <View style={styles.statusDetailWrapper}>
          <FlatList
            data={this.state.updateStatus}
            showsHorizontalScrollIndicator={false}
            // eslint-disable-next-line no-shadow
            keyExtractor={item => item.id}
            extraData={this.state.selectedFlatlist}
            renderItem={item}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{paddingTop: 5}}
            onRefresh={() => {
              this.onRefreshStatus();
            }}
            refreshing={this.state.isFetchingStatus}
          />
        </View>
        <View style={styles.basicInforWrapper}>
          <Text
            style={{
              fontSize: appFontSize,
              color: orangeColor,
            }}>
            Danh sách yêu cầu
          </Text>
        </View>
        <View style={styles.statusDetailWrapper}>
          <FlatList
            data={this.state.requests}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            extraData={this.state.selectedFlatlist2}
            renderItem={itemRequest}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{paddingTop: 5}}
            onRefresh={() => {
              this.onRefreshStatus();
            }}
            refreshing={this.state.isFetchingStatus}
          />
        </View>
      </View>
    );
  }

  render() {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <SafeAreaView style={{flex: 1}}>
        {this.renderHeader()}
        {this.renderMainView()}
      </SafeAreaView>
    );
  }
}

export default OrderDetail;
