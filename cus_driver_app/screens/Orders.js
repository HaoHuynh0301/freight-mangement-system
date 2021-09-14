import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Image,
    Alert
} from "react-native";
import {
    headerFontSize,
    backIcon,
    orangeColor
    ,greyColor,
    appFontSize,
    plusIcon,
    deliveryIcon,
    bycicleIcon,
    rightArrowIcon,
    xIcon,
    ipAddress
} from '../contants';
import Modal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
const axios = require('axios');

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

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [
                
            ],
            selectedData: '',

            // Modal
            isVisible: false,
            actionRequestSelected: '',
            actions: [
                {
                    name: 'Giục lấy',
                    id: 1
                },
                {
                    name: 'Giao',
                    id: 2
                },
                {
                    name: 'Trả hàng',
                    id: 3
                }
            ],

        }
    }

    async getOrderInformation() {
        const token = await AsyncStorage.getItem('token');
        axios.get(`${ipAddress}/api/order-information/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).
        then((resposne) => {
            this.setState({
                orders: resposne.data
            })
            console.log(this.state.orders);
        })
        .catch((error) => {
            displayAlert(error);
        });
    }

    renderHeader() {
        return(
            <View style={styles.headerContainer}>
                <Text style={styles.userInformationText}>Đơn hàng</Text>
            </View>
        );
    }

    handleRefreshOrders() {
        console.log('Refresh')
    }

    handleCreateOrderPressed(status) {
        this.props.navigation.navigate('CreateOrder', {
            status: status
        });
    }

    oppenOrderInformation() {
        this.props.navigation.navigate('OrderDetail', {
            
        });
    }

    handleAddStatus() {
        this.toggleModal();
    }

    toggleModal() {
        this.setState({
            isVisible: !this.state.isVisible
        });
        console.log(this.state.isVisible);
    }

    handleSendRequest() {
        console.log('Send request');
    }

    componentDidMount(){
        this.getOrderInformation();
    }

    renderModal() {
        return(
            <Modal isVisible={this.state.isVisible}>
                <View style={{
                    flexDirection: 'column',
                    height: 190,
                    backgroundColor: '#FFF',
                    // alignItems: 'center',
                    padding: 10
                }}>
                    <View style = {{
                        flexDirection: 'row',
                        // justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity
                            onPress = {() => {
                                this.toggleModal();
                            }}
                        >
                            <Image
                                source = {xIcon}
                                style={styles.xIconStyle}
                            ></Image>
                        </TouchableOpacity>
                        <View style={{
                            flex: 1,
                            paddingLeft: 80
                        }}>
                            <Text style={styles.userInformationText}>GỬI YÊU CẦU</Text>
                        </View>
                    </View>
                    <View
                        style = {{
                            flex: 1,
                            flexDirection: 'column',
                            marginTop: 10,
                        }}
                    >
                        <View style = {styles.statusDetailWrapper}>
                            <Picker
                                selectedValue = {this.state.actionRequestSelected}
                                onValueChange = {(itemValue, itemIndex) => {
                                    this.setState({
                                        actionRequestSelected: itemValue
                                    });
                                }}
                            >
                                {this.state.actions.map((item, key) => {
                                    return(
                                        <Picker.Item
                                             key = {key}
                                            value = {item.name}
                                            label = {item.name}
                                        />
                                    );
                                })}
                            </Picker>
                        </View>
                    </View>
                    <TouchableOpacity
                        style= {{
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: orangeColor,
                            borderRadius: 10
                        }}
                        onPress = {() => {
                            this.handleSendRequest()
                        }}
                    >
                        <Text style = {styles.appFontSize}>Gửi yêu cầu</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    }

    renderMainView() {
        const renderItem = ({item}) => {
            return(
                <View
                    style = {styles.productInformationDetailWrapper}
                >
                    <View style={styles.productInformationDetailTitle}>
                        <Image
                            source = {bycicleIcon}
                            style = {styles.iconStyle}
                        ></Image>
                        <Text style={styles.appFontSize}>{item.id}</Text>
                        <TouchableOpacity
                            onPress = {() => {
                                this.oppenOrderInformation(item.id)
                            }}
                            style = {{
                                paddingLeft: 280
                            }}
                        >
                            <Image
                                source = {rightArrowIcon}
                                style = {styles.rightArrowIconStyle}
                            ></Image>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.productInformationDetail}>
                        <Text style={styles.appFontSize}>Tên: {item.customer_name}/ {item.customer_phonenumber}</Text>
                        <Text style={styles.appFontSize}>Đại chỉ: {item.detail_address}</Text>
                        <Text style={styles.appFontSize}>Thu hộ: {item.cast} đ</Text>
                        <Text style={styles.appFontSize}>Ghi chú: {item.note}</Text>
                    </View>
                    <View style = {styles.orderStatusWrapper}>
                        <View style = {styles.orderStatusTitle}>
                            <Text style={styles.highlightText}>Trạng thái: </Text>
                            <Text style={styles.highlightText}>{item.status.name}</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style = {styles.buttonAddRequest}
                        onPress = {() => {
                            this.handleAddStatus(item.id);
                        }}
                    >
                        <Text style = {{
                            fontSize: appFontSize, 
                            alignSelf: 'center',
                        }}
                        >Gửi yêu cầu</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        const renderEmptyFavoriteProducts = () => {
            return(
                <View style={styles.emptyViewWrapper}>
                    <Text style={styles.textSize}>Không tìm thấy đơn hàng</Text>
                    <View style={styles.butonEmptyRefreshWrapper}>
                        <TouchableOpacity 
                            onPress = {() => {
                                this.handleRefreshOrders();
                            }}
                        >
                            <Text style={{alignSelf: 'center'}}>Bấm để thử lại</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }

        return(
            <View style={{flex: 1}}>
                <View style={styles.addNewOrderWrapper}>
                    <View style={styles.sizeChooseWrapper}>
                        <TouchableOpacity
                            style={styles.chooseDetail}
                            onPress = {() => {
                                this.handleCreateOrderPressed(1)
                            }}
                        >
                            <Text style={{fontSize: 15}}>XFAST</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.chooseDetail}
                            onPress = {() => {
                                this.handleCreateOrderPressed(2)
                            }}
                        >
                            <Text style={{fontSize: 15}}>EXPRESS</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.chooseDetail}
                            onPress = {() => {
                                this.handleCreateOrderPressed(3)
                            }}
                        >
                            <Text style={{fontSize: 15}}>BBS</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    data = {this.state.orders}
                    showsVerticalScrollIndicator = {false}
                    keyExtractor = {(item) => item.id}
                    renderItem = {renderItem}
                    extraData = {this.state.selectedData}
                    contentContainerStyle = {{padding: 10, marginTop: 0}}
                    ListEmptyComponent = {renderEmptyFavoriteProducts}
                />
            </View>
        );
    }

    render() {
        return(
            <SafeAreaView style={{flex: 1}}>
                {this.renderModal()}
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
        marginLeft: 10
    },
    addNewOrderWrapper: {
        flexDirection: 'row',
        // justifyContent: 'space-between'
    },
    sizeChooseWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FFF',
        width: '100%',
        height: 100
    },
    chooseDetail: {
        fontSize: 15,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        width: 80,
        backgroundColor: orangeColor,
        marginLeft: 10,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textSize: {
        fontSize: appFontSize
    },
    highlightText: {
        fontSize: appFontSize,
        fontWeight: 'bold'
    },  
    buttonAddNewOrder: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 40,
        color: orangeColor
    },
    plusIcon: {
        height: 40,
        width: 40
    },
    emptyViewWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingTop: 130
    },
    butonEmptyRefreshWrapper: {
        borderWidth: 1,
        borderColor: greyColor,
        height: 40,
        width: 250,
        marginTop: 10,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    productInformationDetailWrapper: {
        width: '95%',
        backgroundColor: '#FFF',
        marginTop: 10,
        alignSelf: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 10,
        borderRadius: 8,
    },
    productInformationDetailTitle: {
        flexDirection: 'row'
    },  
    iconStyle: {
        height: 20,
        width: 20,
        marginRight: 10
    },
    appFontSize: {
        fontSize: appFontSize
    },
    rightArrowIconStyle: {
        height: 20,
        width: 20,
    },
    productInformationDetail: {
        borderBottomWidth: 0.5,
        borderBottomColor: greyColor,
        paddingBottom: 5,
        marginBottom: 5
    },
    orderStatusWrapper: {
        flexDirection: 'column',
        borderBottomColor: greyColor,
        borderBottomWidth: 0.5,
        paddingBottom: 5,
        marginBottom: 5
        // justifyContent: 'space-between'
    },
    orderStatusTitle: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center'
    },
    buttonAddRequest: {
        height: 30,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: orangeColor,
        borderRadius: 10
    },
    xIconStyle: {
        height: 20,
        width: 20
    },
    statusDetailWrapper: {
        borderBottomColor: greyColor,
        borderBottomWidth: 0.5,
        paddingBottom: 10,
        paddingTop: 10
    }
});

export default Orders;

