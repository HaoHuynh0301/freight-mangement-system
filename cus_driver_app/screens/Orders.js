import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList
} from "react-native";
import {
    headerFontSize,
    backIcon
} from '../contants';

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [
                {
                    name: 'One',
                    id: 1
                },
                {
                    name: 'Two',
                    id: 2
                }
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
                <View>
                    <Text>Empty</Text>
                </View>
            );
        }

        return(
            <View>
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
        backgroundColor: '#ff7733',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    userInformationText: {
        fontSize: headerFontSize,
        fontWeight: 'bold',
        marginLeft: 10
    }
});

export default Orders;

