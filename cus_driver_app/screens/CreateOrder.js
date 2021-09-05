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
    orangeColor
} from '../contants';
import {Picker} from '@react-native-picker/picker';

class CreateOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderSize: this.props.route.params.status,

            // order size
            orderSizeSelected: '',
            orderSizes: [
                {
                    name: 'Siêu rẻ',
                    id: 1
                },
                {
                    name: 'Hàng nhỏ (<20kg)',
                    id: 2
                },
                {
                    name: 'Hàng lớn (>20kg)',
                    id: 3
                }
            ],

            // quantity
            quantitySelected: 1,

            // product information
            productName: '',
            quantity: 1,
            weight: 1,
        }
    }

    componentDidMount() {
        this.setState({
            orderSizeSelected: this.props.route.params.status
        });
        console.log(this.state.orderSizeSelected);
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
                            ></TextInput>
                        </View>
                    </View>
                    <View style={styles.locationPickerWrapper}>
                        <Image
                            source = {locationIcon}
                            style={styles.iconLocationInfor}
                        ></Image>
                    </View>
                    <View style={styles.chooseSizeWrapper}>
                        <Text style={styles.titleFontSize}>Lấy vào giao hàng tận nơi</Text>
                        <Picker
                            style = {styles.banksPicker}
                            selectedValue = {this.state.orderSizeSelected}
                            onValueChange = {(itemValue, itemIndex) => {
                                this.setState({
                                    orderSizeSelected: itemValue,
                                });
                            }}
                        >
                            {this.state.orderSizes.map((item, key) => {
                                return(
                                    <Picker.Item key = {key} label = {item.name} value = {item.name} />
                                );
                            })}
                        </Picker>
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
                                    value = {this.state.productName}
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
                                    value = {this.state.productName}
                                    onChangeText = {(text) => {
                                        this.setState({
                                            quantity: text
                                        })
                                    }}
                                ></TextInput>
                            </View>
                            <TouchableOpacity
                                style={styles.buttonCreateOrder}
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
            <SafeAreaView>
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
    }
});

export default CreateOrder;