import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Image
} from "react-native";
import {
    headerFontSize,
    backIcon,
    orangeColor
    ,greyColor,
    appFontSize,
    plusIcon,
} from '../contants';

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [
                // {
                //     name: 'One',
                //     id: 1
                // },
                // {
                //     name: 'Two',
                //     id: 2
                // }
            ],
            selectedData: ''
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

    renderMainView() {
        const renderItem = ({item}) => {
            return(
                <View>
                    <Text>{item.name}</Text>
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
            <View>
                <View style={styles.addNewOrderWrapper}>
                    <View style={styles.sizeChooseWrapper}>
                        <TouchableOpacity
                            style={styles.chooseDetail}
                            onPress = {() => {

                            }}
                        >
                            <Text style={styles.textSize}>XFAST</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.chooseDetail}
                            onPress = {() => {

                            }}
                        >
                            <Text style={styles.textSize}>EXPRESS</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.chooseDetail}
                            onPress = {() => {

                            }}
                        >
                            <Text style={styles.textSize}>BBS</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    data = {this.state.orders}
                    showsVerticalScrollIndicator = {false}
                    keyExtractor = {(item) => item.id}
                    renderItem = {renderItem}
                    extraData = {this.state.selectedData}
                    contentContainerStyle = {{padding: 10, marginTop: 15}}
                    ListEmptyComponent = {renderEmptyFavoriteProducts}
                />
            </View>
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
        height: 70,
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
        paddingTop: 100
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
    }
});

export default Orders;

