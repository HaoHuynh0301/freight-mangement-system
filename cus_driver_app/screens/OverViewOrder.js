import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    TouchableOpacity,
    Alert,
    FlatList
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";
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

class OverViewOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 1,
            orders: [],
            isFetching: false
        }
    }

    renderHeader() {
        return(
            <View style={styles.headerContainer}>
                <Text style={styles.userInformationText}>{this.props.route.params.title}</Text>
            </View>
        );
    }

    handleRefreshOrders() {

    }

    renderMainView() {
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

        return(
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
        );
    }

    async getListOrders() {
        const token = await AsyncStorage.getItem('token');
        axios.get(`${ipAddress}/api/specific-order?status=${this.state.status}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            this.setState({
                orders: response.data
            });
        })
        .catch((error) => {
            displayAlert('There are some errors! Please try again later!');
        });
    }

    componentDidMount() {
        this.setState({
            status: this.props.route.params.id
        });
        this.getListOrders();
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
        height: 70,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#ff7733',
        justifyContent: 'flex-start',
        alignItems: 'center'
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

export default OverViewOrder;