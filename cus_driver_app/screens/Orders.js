import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Image,
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
    xIcon
} from '../contants';
import Modal from "react-native-modal";

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [
                {
                    name: 'One',
                    id: 'WE213DSA89'
                },
                {
                    name: 'Two',
                    id: 'UW8973DQ98'
                },
                {
                    name: 'Two',
                    id: 'UW8993DQ98'
                }
            ],
            selectedData: '',

            // Modal
            isVisible: false
        }
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
        console.log('Open order detail');
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

    renderModal() {
        return(
            <Modal isVisible={this.state.isVisible}>
                <View style={{
                    flexDirection: 'column',
                    height: 400,
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
                                this.props.navigation.goBack();
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
                    <View>
                        
                    </View>
                    <TouchableOpacity
                        style = {{
                            backgroundColor: '#FFF'
                        }}
                        onPress = {() => {
                            this.toggleModal();
                        }}
                    >
                        <Text>Hide</Text>
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
                                paddingLeft: 190
                            }}
                        >
                            <Image
                                source = {rightArrowIcon}
                                style = {styles.rightArrowIconStyle}
                            ></Image>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.productInformationDetail}>
                        <Text style={styles.appFontSize}>Tên: Huỳnh Quan Nhật Hào/ 0932843656</Text>
                        <Text style={styles.appFontSize}>Đại chỉ: Quản Trọng Hoàng, Hưng Lợi, Ninh Kiều, Cần Thơ</Text>
                        <Text style={styles.appFontSize}>Thu hộ: 200000 đ</Text>
                        <Text style={styles.appFontSize}>Ghi chú: Hàng dễ vỡ, vui lòng nhẹ tay</Text>
                    </View>
                    <View style = {styles.orderStatusWrapper}>
                        <View style = {styles.orderStatusTitle}>
                            <Text style={styles.highlightText}>Trạng thái: </Text>
                            <Text style={styles.highlightText}>Đã tiếp nhận</Text>
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
    }
});

export default Orders;

