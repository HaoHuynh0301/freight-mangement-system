/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {
  backIcon,
  locationIcon,
  accountIcon,
  messageIcon,
  callIcon,
  keyIcon,
  appFontSize,
  greyColor,
  ipAddress,
  xIcon,
} from '../../contants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-ui-lib';
import styles from './editInfor.style';
import Modal from 'react-native-modal';
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

class EditInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // User information
      shopName: '',
      phoneNumber: '',
      email: '',
      password: '',

      // array got from API
      banks: [],
      provinces: [],
      provincesDetail: [],

      // Banking information
      accountName: '',
      stk: '',
      bankName: '',
      bankLocation: '',

      // Banking Picker
      bankSelectedValue: '',
      bankSelectedIndex: '',

      // Provinces Pick
      provinceSelectedValue: '',

      // axios information
      userInformation: {},

      updated: false,

      // Modal
      isVisible: false,
      locaProvince: '',
      locaProvinceCode: '',
      localDistrict: '',
      localDistrictCode: '',
      localWard: '',
      districts: [],
      wards: [],
      new_name: '',
      new_phonenumber: '',
      new_address: '',
    };
  }

  async getListOfBankds() {
    await axios
      .get('https://api.vietqr.io/v1/banks/')
      .then(async response => {
        await this.setState({
          banks: response.data.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getListOfProvinces() {
    axios
      .get('https://provinces.open-api.vn/api/')
      .then(response => {
        this.setState({
          provinces: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getListOfDistrict() {
    axios
      .get(
        `https://vapi.vnappmob.com/api/province/district/${this.state.locaProvinceCode}`,
      )
      .then(async response => {
        await this.setState({
          districts: response.data.results,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getListOfProvincesDetail() {
    axios
      .get('https://provinces.open-api.vn/api/?depth=2')
      .then(async response => {
        await this.setState({
          provincesDetail: response.data,
        });
      })
      .catch(error => {
        displayAlert(error);
      });
  }

  getListOfWard() {
    axios
      .get(
        `https://vapi.vnappmob.com/api/province/ward/${this.state.localDistrictCode}`,
      )
      .then(async response => {
        await this.setState({
          wards: response.data.results,
        });
      })
      .catch(error => {
        console.log(error);
      });
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
      .then(response => response.data)
      .then(async data => {
        await this.setState({
          userInformation: data,
        });
      })
      .catch(error => {
        displayAlert(error);
      });
  }

  componentDidMount() {
    this.getListOfBankds();
    this.getListOfProvinces();
    this.getUserInformation();
    this.getListOfProvincesDetail();
  }

  async saveButtonPressed() {
    const token = await AsyncStorage.getItem('token');
    axios
      .post(
        `${ipAddress}/api/user-information/`,
        {
          customer_name: this.state.shopName,
          phone_numner: this.state.phoneNumber,
          password: this.state.password,
          email: this.state.email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => {
        displayAlert('Update user information successfully!');
        this.props.navigation.navigate('User', {
          updated: true,
        });
      })
      .catch(error => {
        displayAlert('We have some errors! Please try again later!');
      });
  }

  async bankingSaveButtonPressed() {
    const token = await AsyncStorage.getItem('token');
    axios
      .post(
        `${ipAddress}/api/bank-information/`,
        {
          bank_username: this.state.accountName,
          bank_number: this.state.stk,
          bank_name: this.state.bankSelectedValue,
          bank_provine: this.state.provinceSelectedValue,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(async response => {
        this.getUserInformation();
        await this.setState({
          bank_username: '',
          bank_number: '',
          bank_name: '',
        });
        displayAlert('Your information was updated!');
      })
      .catch(error => {
        displayAlert('Your input information is invalid! Please try again!');
      });
  }

  async saveLocation() {
    const token = await AsyncStorage.getItem('token');
    axios
      .post(
        `${ipAddress}/api/location-information/`,
        {
          customer_name: this.state.new_name,
          phone_numner: this.state.new_phonenumber,
          address: this.state.new_address,
          province: this.state.locaProvince,
          district: this.state.localDistrict,
          ward: this.state.localWard,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => {
        displayAlert('Updated location information successfully!');
        this.setState({
          new_name: '',
          new_phonenumber: '',
          new_address: '',
          locaProvince: '',
          localDistrict: '',
          localWard: '',
        });
        this.toggleModal();
      })
      .catch(error => {
        displayAlert(error);
      });
  }

  renderHeader() {
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

  toggleModal() {
    this.getUserInformation();
    this.setState({
      isVisible: !this.state.isVisible,
    });
  }

  edtiLocation() {
    this.toggleModal();
  }

  renderModal() {
    return (
      <Modal isVisible={this.state.isVisible}>
        <View
          style={{
            flexDirection: 'column',
            backgroundColor: '#FFF',
            padding: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Button
              onPress={() => {
                this.toggleModal();
              }}>
              <Image source={xIcon} style={styles.xIconStyle} />
            </Button>
            <Text
              style={{
                left: 90,
                fontSize: appFontSize,
              }}>
              Cập nhật địa chỉ
            </Text>
          </View>
          <View>
            <View style={styles.modalLocationEditDetailWrapper}>
              <TextInput
                placeholder={this.state.userInformation.customer_name}
                style={styles.inputText}
                value={this.state.new_name}
                onChangeText={text => {
                  this.setState({
                    new_name: text,
                  });
                }}
              />
            </View>
            <View style={styles.modalLocationEditDetailWrapper}>
              <TextInput
                placeholder={String(this.state.userInformation.phone_numner)}
                style={styles.inputText}
                value={String(this.state.new_phonenumber)}
                onChangeText={text => {
                  this.setState({
                    new_phonenumber: text,
                  });
                }}
              />
            </View>
            <View style={styles.modalLocationEditDetailWrapper}>
              <TextInput
                placeholder={String(this.state.userInformation.address)}
                style={styles.inputText}
                value={String(this.state.new_address)}
                onChangeText={text => {
                  this.setState({
                    new_address: text,
                  });
                }}
              />
            </View>
            <View>
              <Picker
                style={styles.banksPicker}
                selectedValue={this.state.locaProvince}
                onValueChange={async (itemValue, itemIndex) => {
                  await this.setState({
                    locaProvince: itemValue,
                    locaProvinceCode: this.state.provinces[itemIndex].code,
                  });
                  console.log(
                    this.state.provinces[itemIndex].code +
                      'daasdasd ' +
                      itemValue,
                  );
                  this.getListOfDistrict();
                }}>
                {this.state.provinces.map((item, key) => {
                  return (
                    <Picker.Item
                      key={key}
                      label={item.name}
                      value={item.name}
                    />
                  );
                })}
              </Picker>
              <Picker
                style={styles.banksPicker}
                selectedValue={this.state.localDistrict}
                onValueChange={async (itemValue, itemIndex) => {
                  await this.setState({
                    localDistrict: itemValue,
                    localDistrictCode:
                      this.state.districts[itemIndex].district_id,
                  });
                  this.getListOfWard();
                }}>
                {this.state.districts.map((item, key) => {
                  return (
                    <Picker.Item
                      key={key}
                      label={item.district_name}
                      value={item.district_name}
                    />
                  );
                })}
              </Picker>
              <Picker
                style={styles.banksPicker}
                selectedValue={this.state.localDistrict}
                onValueChange={async (itemValue, itemIndex) => {
                  await this.setState({
                    localWard: itemValue,
                  });
                }}>
                {this.state.wards.map((item, key) => {
                  return (
                    <Picker.Item
                      key={key}
                      label={item.ward_name}
                      value={item.ward_name}
                    />
                  );
                })}
              </Picker>
            </View>
            <Button
              style={styles.btnSaveLocation}
              onPress={() => {
                this.saveLocation();
              }}>
              <Text style={{fontSize: appFontSize}}>Lưu</Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  }

  renderEditInformationView() {
    return (
      <ScrollView>
        <View style={styles.bankingInforWrapper}>
          <View style={styles.basicInforWrapper}>
            <Text style={{fontSize: 17}}>Thông tin cơ bản</Text>
          </View>
          <View style={styles.basicInforDetail}>
            <Image source={accountIcon} style={styles.basicInforImage} />
            <TextInput
              onChangeText={text => {
                this.setState({
                  shopName: text,
                });
              }}
              value={this.state.shopName}
              placeholder={this.state.userInformation.customer_name}
              style={styles.inputText}
            />
          </View>
          <View style={styles.basicInforDetail}>
            <Image source={callIcon} style={styles.basicInforImage} />
            <TextInput
              onChangeText={text => {
                this.setState({
                  phoneNumber: text,
                });
              }}
              value={this.state.phoneNumber}
              placeholder={String(this.state.userInformation.phone_numner)}
              style={styles.inputText}
            />
          </View>
          <View style={styles.basicInforDetail}>
            <Image source={messageIcon} style={styles.basicInforImage} />
            <TextInput
              onChangeText={text => {
                this.setState({
                  email: text,
                });
              }}
              value={this.state.email}
              placeholder={this.state.userInformation.email}
              style={styles.inputText}
            />
          </View>
          <View style={styles.basicInforDetail}>
            <Image source={keyIcon} style={styles.basicInforImage} />
            <TextInput
              onChangeText={text => {
                this.setState({
                  password: text,
                });
              }}
              placeholder="Mật khẩu"
              style={styles.inputText}
              secureTextEntry={true}
            />
          </View>
        </View>
        <Button
          style={styles.btnSave}
          onPress={() => {
            this.saveButtonPressed();
          }}>
          <Text style={{fontSize: appFontSize}}>Lưu</Text>
        </Button>
      </ScrollView>
    );
  }

  renderEditBakingInformationView() {
    return (
      <ScrollView>
        <View style={styles.bankingEditInforWrapper}>
          <View style={styles.btnBankEdit}>
            <Text style={styles.font17}>Sửa thông tin ngân hàng, đối soát</Text>
          </View>
          <View style={styles.editBakingDetailWrapper}>
            <Text style={styles.font17}>Chủ tài khoản</Text>
            <TextInput
              onChangeText={text => {
                this.setState({
                  accountName: text,
                });
              }}
              value={this.state.accountName}
              placeholder={this.state.userInformation.bank_username}
              style={styles.bankingEditInput}
            />
          </View>
          <View style={styles.editBakingDetailWrapper}>
            <Text style={styles.font17}>Số tài khoản</Text>
            <TextInput
              onChangeText={text => {
                this.setState({
                  stk: text,
                });
              }}
              value={this.state.stk}
              placeholder={String(this.state.userInformation.bank_number)}
              style={styles.bankingEditInput}
            />
          </View>
          <View style={styles.editBakingDetailWrapper}>
            <Text style={styles.font17}>Bấm để chọn ngân hàng</Text>
            <View
              style={{
                borderWidth: 0.3,
                borderColor: greyColor,
                marginTop: 5,
                borderRadius: 10,
              }}>
              <Picker
                style={styles.banksPicker}
                selectedValue={this.state.bankSelectedValue}
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({
                    bankSelectedValue: itemValue,
                    bankSelectedIndex: itemIndex,
                  });
                }}>
                {this.state.banks.map((item, key) => {
                  return (
                    <Picker.Item
                      key={key}
                      label={item.name}
                      value={item.name}
                    />
                  );
                })}
              </Picker>
            </View>
          </View>
          <View style={styles.editBakingDetailWrapper}>
            <Text style={styles.font17}>Bấm để chọn chi nhánh</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                style={styles.banksPicker}
                selectedValue={this.state.provinceSelectedValue}
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({
                    provinceSelectedValue: itemValue,
                  });
                }}>
                {this.state.provinces.map((item, key) => {
                  return (
                    <Picker.Item
                      key={key}
                      label={item.name}
                      value={item.name}
                    />
                  );
                })}
              </Picker>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.btnBankEditedSave}
          onPress={() => {
            this.bankingSaveButtonPressed();
          }}>
          <Text style={{fontSize: appFontSize}}>Lưu</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  renderLocationEditView() {
    return (
      <View style={styles.locaInforContainer}>
        <View style={styles.addressTitleWrapper}>
          <Text
            style={{
              fontSize: appFontSize,
            }}>
            Địa chỉ
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <View style={styles.khoDoInforDetail}>
            <Image source={accountIcon} style={styles.basicInforImage} />
            <Text
              style={{
                marginLeft: 10,
                fontSize: appFontSize,
              }}>
              {this.state.userInformation.customer_name}
            </Text>
          </View>
          <View style={styles.khoDoInforDetail}>
            <Image source={callIcon} style={styles.basicInforImage} />
            <Text
              style={{
                marginLeft: 10,
                fontSize: appFontSize,
              }}>
              {String(this.state.userInformation.phone_numner)}
            </Text>
          </View>
          <View
            style={{
              padding: 10,
              borderBottomWidth: 0.8,
              borderBottomColor: greyColor,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: 385,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
              }}
              onPress={() => {
                this.edtiLocation();
              }}>
              <Image source={locationIcon} style={styles.basicInforImage} />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: appFontSize,
                }}>
                {this.state.userInformation.province} /{' '}
                {this.state.userInformation.district} /{' '}
                {this.state.userInformation.ward}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.khoDoInforDetail}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
              }}
              onPress={() => {
                this.edtiLocation();
              }}>
              <Image source={locationIcon} style={styles.basicInforImage} />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: appFontSize,
                }}>
                {this.state.userInformation.address}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  renderMainEditInformation() {
    const status = this.props.route.params.status;
    if (status === 'Sửa thông tin cơ bản') {
      return this.renderEditInformationView();
    } else if (status === 'Sửa thông tin ngân hàng') {
      return this.renderEditBakingInformationView();
    }
    return this.renderLocationEditView();
  }

  render() {
    return (
      <SafeAreaView>
        {this.renderHeader()}
        {this.renderMainEditInformation()}
        {this.renderModal()}
      </SafeAreaView>
    );
  }
}

export default EditInformation;
