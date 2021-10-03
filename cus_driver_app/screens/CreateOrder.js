import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    TextInput,
    ScrollView,
    Alert
} from 'react-native';
import {
    greyColor,
    headerFontSize,
    xIcon,
    appFontSize,
    callIcon, 
    homeIcon,
    accountIcon,
    locationIcon,
    orangeColor,
    ipAddress
} from '../contants';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const displayAlert = (message) => {
    Alert.alert(
        "Notification",
        message,
        [
            {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
        ])
}

class CreateOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderSize: this.props.route.params.status,

            cusInfor: [],

            // order size
            orderSizeSelected: 1,
            orderSizes: [
                {
                    name: 'Siêu rẻ',
                    id: 1,
                    fee: 10000
                },
                {
                    name: 'Hàng nhỏ (<20kg)',
                    id: 2,
                    fee: 20000
                },
                {
                    name: 'Hàng lớn (>20kg)',
                    id: 3,
                    fee: 30000
                }
            ],

            // quantity
            quantitySelected: 1,

            // product information
            productName: '',
            quantity: '',
            weight: '',
            cast: '',
            shippingFee: '',
            totalCast: '',

            // customer information
            cus_phone_number: '',
            cus_name: '',
            cus_address: '',
            order_size: '',
            note: 'Không có ghi chú',

            // array got from API
            provinces: [],
            provincesDetail: [],

            // Provinces Pick
            provinceSelectedValue: '',

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
            new_address: ''
        }
    }

    haversine(coords1, coords2) {
        const R = 6371e3; // metres
        const φ1 = coords1.lat * Math.PI/180; // φ, λ in radians
        const φ2 = coords2.lat * Math.PI/180;
        const Δφ = (coords2.lat-coords1.lat) * Math.PI/180;
        const Δλ = (coords2.lon-coords1.lon) * Math.PI/180;
      
        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      
        return R * c; // in metres
    }

    async getCustomerInformation() {
        const token = await AsyncStorage.getItem('token');
        axios.get(`${ipAddress}/api/user-information/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).
        then((resposne) => {
            this.setState({
                cusInfor: resposne.data
            });
        })
        .catch((error) => {
            displayAlert(error);
        });
    }


    async getCoordinate(provinceName) {
        console.log(provinceName);
        await axios.get(`http://api.positionstack.com/v1/forward?access_key=ee95aa7c3e382e9aa806014b08955f13&query=1600 ${provinceName}`)
        .then(async (response) => {
            var data = response.data.data[0];
            await axios.get(`http://api.positionstack.com/v1/forward?access_key=ee95aa7c3e382e9aa806014b08955f13&query=1600 ${this.state.cusInfor['province']}`)
            .then((response) => {
                console.log(response.data.data[0]);
            })
            .catch((error) => {
                displayAlert('There are some errors! Please try again later!');
            });
        })
        .catch((error) => {
            displayAlert('There are some errors! Please try again later!');
        });
    }

    getTotalDistance(loca1, loca2) {
        pass
    }

    getListOfProvinces() {
        console.log('OK')
        axios.get('https://provinces.open-api.vn/api/')
            .then(async (response) => {
                await this.setState({
                    provinces: response.data
                });
                // console.log(this.state.provinces);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getListOfDistrict() {
        axios.get(`https://vapi.vnappmob.com/api/province/district/${this.state.locaProvinceCode}`)
            .then(async (response) => {
                await this.setState({
                    districts: response.data.results
                });
                // console.log(response.data.results);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    
    getListOfProvincesDetail() {
        axios.get(`https://provinces.open-api.vn/api/?depth=2`)
        .then(async (response) => {
            await this.setState({
                provincesDetail: response.data
            });
        })
        .catch((error) => {
            displayAlert(error);
        })
    }

    getListOfWard() {
        axios.get(`https://vapi.vnappmob.com/api/province/ward/${this.state.localDistrictCode}`)
            .then(async (response) => {
                await this.setState({
                    wards: response.data.results
                });
                console.log(this.state.wards);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidMount() {
        this.getListOfProvinces();
        this.getCustomerInformation();
        this.getListOfProvincesDetail();
    }

    renderHeader() {
        return(
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    onPress = {() => {
                        this.props.navigation.goBack();
                    }}
                >
                    <Image
                        source = {xIcon}
                        style={styles.xIconStyle}
                    ></Image>
                </TouchableOpacity>
                <View style={styles.titleWrapper}>
                    <Text style={styles.userInformationText}>TẠO ĐƠN HÀNG</Text>
                </View>
            </View>
        );
    }

    handleAddProductImage() {
        console.log('Add image for product')
    }

    async handleCreateOrder() {
        const token = await AsyncStorage.getItem('token');
        axios.post(`${ipAddress}/api/order-information/`, {
            cus_phonenumber: this.state.cus_phone_number,
            cus_name: this.state.cus_name,
            product_name: this.state.productName,
            product_weight: Number(this.state.weight),
            product_quantity: Number(this.state.quantity),
            shipOptionId: this.state.orderSizeSelected,
            statusId: 1,
            cast: this.state.totalCast,
            note: this.state.note,
            province: this.state.locaProvince,
            district: this.state.localDistrict,
            ward: this.state.localWard,
            address: this.state.cus_address
        },
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            displayAlert('Created new order successfully!');
            this.props.navigation.goBack();
        })
        .catch((error) => {
            displayAlert('Your information is invalid! Please try again!');
        });
    }

    renderMainView() {
        return(
            <ScrollView>
                <View style={styles.createOrderMainView}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start'
                    }}>
                        <Text style={styles.titleFontSize}>NGƯỜI NHẬN</Text>
                    </View>
                    <View style={styles.shippingLocationInforWrapper}>
                        <View style={styles.locationInforDetail}>
                            <Image
                                source = {callIcon}
                                style={styles.iconLocationInfor}
                            ></Image>
                            <TextInput
                                placeholder = 'Nhập số điện thoại khách hàng'
                                style={styles.inputStyle}
                                value = {this.state.cus_phone_number}
                                onChangeText = {(text) => {
                                    this.setState({
                                        cus_phone_number: text
                                    });
                                }}
                            ></TextInput>
                        </View>
                        <View style={styles.locationInforDetail}>
                            <Image
                                source = {accountIcon}
                                style={styles.iconLocationInfor}
                            ></Image>
                            <TextInput
                                placeholder = 'Tên khách hàng'
                                style={styles.inputStyle}
                                value = {this.state.cus_name}
                                onChangeText = {(text) => {
                                    this.setState({
                                        cus_name: text
                                    });
                                }}
                            ></TextInput>
                        </View>
                        <View style={styles.locationInforDetail}>
                            <Image
                                source = {homeIcon}
                                style={styles.iconLocationInfor}
                            ></Image>
                            <TextInput
                                placeholder = 'Địa chỉ chi tiết (nhà/ngõ/ngách)'
                                style={styles.inputStyle}
                                value = {this.state.cus_address}
                                onChangeText = {(text) => {
                                    this.setState({
                                        cus_address: text
                                    });
                                }}
                            ></TextInput>
                        </View>
                    </View>
                    <View>
                        {/* <Image
                            source = {locationIcon}
                            style={styles.iconLocationInfor}
                        ></Image> */}
                        <View style = {{
                        }}>
                            <Picker
                                style = {styles.banksPicker}
                                selectedValue = {this.state.locaProvince}
                                onValueChange = {async (itemValue, itemIndex) => {
                                    await this.setState({
                                        locaProvince: itemValue,
                                        locaProvinceCode: this.state.provinces[itemIndex].code
                                    });
                                    this.getListOfDistrict();
                                    this.getCoordinate(itemValue);
                                }}
                            >
                                {this.state.provinces.map((item, key) => {
                                    return(
                                        <Picker.Item key = {key} label = {item.name} value = {item.name} />
                                    );
                                })}
                            </Picker>
                            <Picker
                                style = {styles.banksPicker}
                                selectedValue = {this.state.localDistrict}
                                onValueChange = {async (itemValue, itemIndex) => {
                                    await this.setState({
                                        localDistrict: itemValue,
                                        localDistrictCode: this.state.districts[itemIndex].district_id
                                    });
                                    this.getListOfWard();
                                }}
                            >
                                {this.state.districts.map((item, key) => {
                                    console.log(item.name);
                                    return(
                                        <Picker.Item key = {key} label = {item.district_name} value = {item.district_name} />
                                    );
                                })}
                            </Picker>
                            <Picker
                                style = {styles.banksPicker}
                                selectedValue = {this.state.localDistrict}
                                onValueChange = {async (itemValue, itemIndex) => {
                                    await this.setState({
                                        localWard: itemValue,
                                    });
                                }}
                            >
                                {this.state.wards.map((item, key) => {
                                    return(
                                        <Picker.Item key = {key} label = {item.ward_name} value = {item.ward_name} />
                                    );
                                })}
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.chooseSizeWrapper}>
                        <Text style={styles.titleFontSize}>Lấy vào giao hàng tận nơi</Text>
                        <Picker
                            style = {styles.banksPicker}
                            selectedValue = {this.state.orderSizeSelected}
                            onValueChange = {async (itemValue, itemIndex) => {
                                await this.setState({
                                    orderSizeSelected: itemValue,
                                });
                                await this.setState({
                                    totalCast: Number(this.state.cast) + (this.state.orderSizes[this.state.orderSizeSelected-1].fee)
                                });
                            }}
                        >
                            {this.state.orderSizes.map((item, key) => {
                                return(
                                    <Picker.Item key = {key} label = {item.name} value = {item.id} />
                                );
                            })}
                        </Picker>
                    </View>
                    <View style={styles.locationInforDetail}>
                        <Text
                            style = {{
                                flex: 1,
                                alignItems: 'flex-start',
                                fontSize: appFontSize,
                                marginTop: 10,
                                borderBottomWidth: 0.6,
                                borderBottomColor: greyColor,
                                paddingBottom: 10
                            }}
                        >
                            Phí ship: {this.state.orderSizes[this.state.orderSizeSelected-1].fee}đ
                        </Text>
                    </View>
                    <View style={styles.productInformationDetail}>
                        <View style={styles.productTitleInformationDetail}>
                            <Text style={styles.titleFontSize}>Sản phẩm</Text>
                            <TouchableOpacity
                                style={styles.buttonAddProduct}
                                onPress = {() => {
                                    this.handleAddProductImage()
                                }}
                            >
                                <Text style={styles.appFontSize}>Thêm hình ảnh</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            // flexDirection: 'row',
                            // paddingLeft: 10,
                            // paddingRight: 10
                        }}>
                            <View style={styles.locationInforDetail}>
                                <TextInput
                                    placeholder = '1. Nhập tên sản phẩm'
                                    style={styles.productInputStyle}
                                    value = {this.state.productName}
                                    onChangeText = {(text) => {
                                        this.setState({
                                            productName: text
                                        })
                                    }}
                                ></TextInput>
                            </View>
                            <View style={styles.locationInforDetail}>
                                <TextInput
                                    placeholder = '2. Khối lượng'
                                    style={styles.productInputStyle}
                                    value = {String(this.state.weight)}
                                    onChangeText = {(text) => {
                                        this.setState({
                                            weight: text
                                        })
                                    }}
                                ></TextInput>
                            </View>
                            <View style={styles.locationInforDetail}>
                                <TextInput
                                    placeholder = '3. Số lượng'
                                    style={styles.productInputStyle}
                                    value = {String(this.state.quantity)}
                                    onChangeText = {(text) => {
                                        this.setState({
                                            quantity: text
                                        })
                                    }}
                                ></TextInput>
                            </View>
                            <View style={styles.locationInforDetail}>
                                <TextInput
                                    placeholder = '4. Tiền thu hộ'
                                    style={styles.productInputStyle}
                                    value = {String(this.state.cast)}
                                    onChangeText = {async (text) => {
                                        await this.setState({
                                            cast: text
                                        });
                                        await this.setState({
                                            totalCast: Number(this.state.cast) + (this.state.orderSizes[this.state.orderSizeSelected-1].fee)
                                        });
                                    }}
                                ></TextInput>
                            </View>
                            <View style={styles.locationInforDetail}>
                                <Text
                                    style = {{
                                        flex: 1,
                                        alignItems: 'flex-start',
                                        fontSize: appFontSize,
                                        marginTop: 10,
                                        borderBottomWidth: 0.6,
                                        borderBottomColor: greyColor,
                                        paddingBottom: 10
                                    }}
                                >
                                    Tổng tiền: {this.state.totalCast} đ
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.buttonCreateOrder}
                                onPress = {() => {
                                    this.handleCreateOrder();
                                }}
                            >
                                <Text style={styles.appFontSize}>Tạo đơn hàng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }

    render() {
        return(
            <SafeAreaView style = {{flex: 1}}>
                {this.renderHeader()}
                {this.renderMainView()}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 60,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#FFF',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: greyColor
    },
    userInformationText: {
        fontSize: headerFontSize,
        fontWeight: 'bold',
        marginLeft: 10,
        alignSelf: 'center'
    },
    xIconStyle: {
        height: 20,
        width: 25,
        marginLeft: 10
    },
    titleWrapper: {
        paddingLeft: 90
    },
    createOrderMainView: {
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 15
    },
    titleFontSize: {
        fontSize: appFontSize,
        fontWeight: 'bold'
    },
    appFontSize: {
        fontSize: appFontSize
    },
    shippingLocationInforWrapper: {
        flexDirection: 'column',
        marginTop: 5,
        height: 150,
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10
    },
    iconLocationInfor: {
        height: 20,
        width: 20,
    },
    locationInforDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputStyle: {
        borderBottomWidth: 0.5,
        borderBottomColor: greyColor,
        width: '100%',
        paddingLeft: 10,
        fontSize: appFontSize
    },
    locationPickerWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10
    },
    chooseSizeWrapper: {
        marginTop: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: greyColor,
    },
    productInformationDetail: {
        marginTop: 20
    },
    productTitleInformationDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonAddProduct: {
        borderWidth: 0.5,
        padding: 5,
        borderColor: orangeColor,
        borderRadius: 10
    },
    productInputStyle: {
        borderBottomWidth: 0.5,
        borderBottomColor: greyColor,
        width: '100%',
        fontSize: appFontSize
    },
    buttonCreateOrder:  {
        width: '100%',
        marginTop: 10,
        borderWidth: 0.5,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: orangeColor
    },
    banksPicker: {
        borderWidth: 0.3,
        borderColor: greyColor,
    },
});

export default CreateOrder;