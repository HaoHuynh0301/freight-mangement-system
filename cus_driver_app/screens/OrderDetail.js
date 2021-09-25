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
            status: ''
        }
    }

    setStatusName() {
        var statusName = '';
        if(id == String(1)) {
            statusName = 'Đang xử lý';
        } else if(id == String(2)) {
            statusName = 'Đã tiếp nhận';
        } else if(id == String(3)) {
            statusName = 'Đang giao';
        } else if(id == String(4)) {
            statusName = 'Đã giao, đang đối soát';
        } else if(id == String(5)) {
            statusName = 'Đã đối soát';
        } else if(id == String(6)) {
            statusName = 'Không giao được';
        }
        this.setState({
            status: statusName
        });
        console.log(this.state.status)
    }

    componentDidMount() {
        this.setState({
            id: this.props.route.params.id
        });
        console.log(this.state.id)
        this.setStatusName(this.state.id);
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
            <View style = {styles.mainViewStyle}>
                <View style = {styles.basicInforWrapper}>
                    <Text>Trạng thái: {this.state.status}</Text>
                </View>
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
        paddingLeft: 70
    },
    mainViewStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    basicInforWrapper: {
        width: '90%'
    }
});

export default OrderDetail;