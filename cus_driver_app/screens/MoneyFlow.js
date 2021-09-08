import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    TouchableOpacity
} from "react-native";
import {
    headerFontSize,
    backIcon,
    appFontSize,
    greyColor,
    rightArrowIcon
} from '../contants';

class MonenyFlow extends Component {
    constructor(props) {
        super(props);
    }

    renderHeader() {
        return(
            <View style={styles.headerContainer}>
                <Text style={styles.userInformationText}>Dòng tiền</Text>
                <TouchableOpacity
                    onPress = {() => {
                        //Sửa thông tin ngân hàng
                        this.props.navigation.navigate('EditInformation', {
                            status: 'Sửa thông tin ngân hàng'
                        });
                        
                    }}
                    style = {{left: 230}}
                >
                    <Text style = {{
                        fontSize: appFontSize,
                    }}>Cài đặt</Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderMainView() {
        return(
            <View style = {styles.mainViewWrapper}>
                <View style = {styles.flowMoneyDetail}>
                    <Text style = {styles.textAppFontSize}>Tiền CoD: </Text>
                    <Text style = {styles.textHighlight}>0đ</Text>
                </View>
                <View style = {styles.flowMoneyDetail}>
                    <Text style = {styles.textAppFontSize}>Phí giao hàng: </Text>
                    <Text style = {styles.textHighlight}>0đ</Text>
                </View>
                <View style = {styles.flowMoneyDetail}>
                    <Text style = {styles.textAppFontSize}>Phí hoàn hàng: </Text>
                    <Text style = {styles.textHighlight}>0đ</Text>
                </View>
                <View style = {styles.flowMoneyDetail}>
                    <Text style = {styles.textAppFontSize}>Tiền chưa đối soát: </Text>
                    <Text style = {styles.textHighlight}>0đ</Text>
                </View>
                <View style = {styles.flowMoneyDetail}>
                    <Text style = {styles.textAppFontSize}>Tiền đã đối soát: </Text>
                    <Text style = {styles.textHighlight}>0đ</Text>
                </View>
                <TouchableOpacity
                    style = {{
                        marginTop: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderBottomColor: greyColor,
                        borderBottomWidth: 1,
                        paddingBottom: 10
                    }}
                >
                    <Text style = {styles.textHighlight}>Quản lý hóa đơn VAT</Text>
                    <Image
                        source = {rightArrowIcon}
                        style = {{
                            height: 20,
                            width: 20
                        }}
                    ></Image>
                </TouchableOpacity>
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
    },
    appFontSize: {
        fontSize: appFontSize
    },
    mainViewWrapper: {
        flexDirection: 'column',
        // flex: 1,
        paddingLeft: 10,
        paddingRight: 10
    },
    flowMoneyDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: greyColor
    },
    textHighlight: {
        fontSize: appFontSize,
        fontWeight: 'bold'
    },
    textAppFontSize: {
        fontSize: appFontSize
    },
    totalMoney: {
        marginTop: 20,
        backgroundColor: '#FFF',
        flexDirection: 'column'
    }
});

export default MonenyFlow;

