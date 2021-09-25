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
    Alert,
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

class OrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            status: '',
            item: {}
        }
    }

    async setStatusName(id) {
        console.log(id)
        var statusName = '';
        if(id == 1) {
            statusName = 'Đang xử lý';
        } else if(id == 2) {
            statusName = 'Đã tiếp nhận';
        } else if(id == 3) {
            statusName = 'Đang giao';
        } else if(id == 4) {
            statusName = 'Đã giao, đang đối soát';
        } else if(id == 5) {
            statusName = 'Đã đối soát';
        } else if(id == 6) {
            statusName = 'Không giao được';
        }
        console.log(statusName)
        await this.setState({
            status: statusName
        });
    }

    async setItem() {
        await this.setState({
            item: this.props.route.params.order
        });
    }

    componentDidMount() {
        this.setState({
            id: this.props.route.params.id,
        });
        this.setItem();
        this.setStatusName(this.props.route.params.id);
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
                    <Text style={styles.userInformationText}>CHÍ TIẾT ĐƠN HÀNG</Text>
                </View>
            </View>
        );
    }

    renderMainView() {
        return(
            <ScrollView>
                <View style = {styles.mainViewStyle}>
                    <View style = {styles.basicInforWrapper}>
                        <Text style = {styles.fontSize}>Trạng thái: {this.state.status}</Text>
                        <Text style = {styles.fontSize}>Ghi chú: {this.state.item.note}</Text>
                        <Text style = {styles.fontSize}>Sản phẩm: {this.state.item.note}</Text>
                    </View>
                    <View style = {styles.basicInforWrapper}>
                        <Text style = {{
                            fontSize: appFontSize,
                            color: orangeColor
                        }}>Cập nhật</Text>
                    </View>
                    <View style = {styles.statusDetailWrapper}>

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
        backgroundColor: orangeColor,
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
        paddingLeft: 70
    },
    mainViewStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    basicInforWrapper: {
        width: '90%',
        marginTop: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: greyColor,
        paddingBottom: 10
    },
    fontSize: {
        fontSize: appFontSize
    },
    titleWrapper: {
        
    }
});

export default OrderDetail;