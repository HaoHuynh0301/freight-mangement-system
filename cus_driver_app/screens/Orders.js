import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Image,
    Alert,
} from "react-native";
import {
    headerFontSize,
    orangeColor
    ,greyColor,
    appFontSize,
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
            orderId: '',
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

            isFetching: false
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
        console.log('Refresh');
        this.getOrderInformation();
    }

    handleCreateOrderPressed(status) {
        this.props.navigation.navigate('CreateOrder', {
            status: status
        });
    }

    oppenOrderInformation(id, order) {
        this.props.navigation.navigate('OrderDetail', {
            'id': id,
            'order': order
        });
    }

    async handleAddStatus(orderId) {
        await this.setState({
            orderId: orderId
        });
        this.toggleModal();
    }

    toggleModal() {
        this.setState({
            isVisible: !this.state.isVisible
        });
        console.log(this.state.isVisible);
    }

    async handleSendRequest() {
        const token = await AsyncStorage.getItem('token');
        console.log(token)
        axios.get(`${ipAddress}/api/request?orderId=${this.state.orderId}&rqId=${this.state.actionRequestSelected}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            displayAlert('Request was sent!');
            this.toggleModal();
        })
        .catch((error) => {
            displayAlert('Order or request option is invalid!');
        });
    }

    componentDidMount(){
        this.getOrderInformation();
    }

    onRefresh() {
        this.setState({
            isFetching: true
        });
        this.getOrderInformation();
        this.setState({
            isFetching: false
        });
    }

    renderModal() {
        return(
            <Modal isVisible={this.state.isVisible}>
                <View style={{
                    flexDirection: 'column',
                    height: 190,
                    backgroundColor: '#FFF',
                    padding: 10
                }}>
                    <View style = {{
                        flexDirection: 'row',
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
                                onValueChange = {async (itemValue, itemIndex) => {
                                    await this.setState({
                                        actionRequestSelected: itemValue
                                    });
                                    console.log(this.state.actionRequestSelected);
                                }}
                            >
                                {this.state.actions.map((item, key) => {
                                    return(
                                        <Picker.Item
                                             key = {key}
                                            value = {item.id}
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
            var statusName = '';
            if(item.status == 1) {
                statusName = 'Đang xử lý';
            } else if(item.status == 2) {
                statusName = 'Đã tiếp nhận';
            } else if(item.status == 3) {
                statusName = 'Đang giao';
            } else if(item.status == 4) {
                statusName = 'Đã giao, đối soát';
            } else if(item.status == 5) {
                statusName = 'Đã đối soát';
            } else if(item.status == 6) {
                statusName = 'Không giao được';
            }
            else if(item.status == 7) {
                statusName = 'Đang vận chuyển';
            }
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
                                this.oppenOrderInformation(item.status, item)
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
                        
                    </View>
                    <View style = {styles.orderStatusWrapper}>
                        <View style = {styles.orderStatusTitle}>
                            <Text style={styles.highlightText}>Trạng thái: </Text>
                            <Text style={styles.highlightText}>{statusName}</Text>
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
                    onRefresh = {() => {
                        this.onRefresh()
                    }}
                    refreshing = {this.state.isFetching}
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
    },
    orderStatusTitle: {
        flexDirection: 'row',
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

