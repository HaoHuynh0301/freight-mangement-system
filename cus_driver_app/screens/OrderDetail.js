import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
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
    FlatList,
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

class OrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            status: '',
            item: {},
            updateStatus: [],
            selectedFlatlist: 1,
            isFetchingStatus: false,
        }
    }

    async setStatusName(id) {
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
        await this.setState({
            status: statusName
        });
    }

    async getStatusUpdate() {
        const token = await AsyncStorage.getItem('token')
        axios.get(`${ipAddress}/api/status-update/?order_id=${this.state.item.id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(async (response) => {
            await this.setState({
                updateStatus: response.data
            });
            var tmpList = []
            tmpList = this.state.updateStatus;
            for(let i=0; i<tmpList.length; i++) {
                var statusName = '';
                if(tmpList[i].status == 1) {
                    statusName = 'Đang xử lý';
                } else if(tmpList[i].status == 2) {
                    statusName = 'Đã tiếp nhận';
                } else if(tmpList[i].status == 3) {
                    statusName = 'Đang giao';
                } else if(tmpList[i].status == 4) {
                    statusName = 'Đã giao, đang đối soát';
                } else if(tmpList[i].status == 5) {
                    statusName = 'Đã đối soát';
                } else if(tmpList[i].status == 6) {
                    statusName = 'Không giao được';
                }
                tmpList[i].status = statusName;
            }
            await this.setState({
                updateStatus: tmpList
            });
        })
        .catch((error) => {
            displayAlert('Error');
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
        this.getStatusUpdate();
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

    onRefreshStatus() {
        this.setStatusName(this.props.route.params.id);
        this.getStatusUpdate();
    }

    renderMainView() {
        const item = ({item}) => {
            return(
                <View style = {{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center'
                }}>
                    <Text style = {{fontSize: appFontSize}}>{item.time}: {item.status}</Text>
                </View>
            );
        }
        return(
            <View style = {styles.mainViewStyle}>
                <View style = {styles.basicInforWrapper}>
                    <Text style = {styles.fontSize}>Trạng thái: {this.state.status}</Text>
                    <Text style = {styles.fontSize}>Ghi chú: {this.state.item.note}</Text>
                    <Text style = {styles.fontSize}>Sản phẩm: {this.state.item.product_name}</Text>
                </View>
                <View style = {styles.basicInforWrapper}>
                    <Text style = {{
                        fontSize: appFontSize,
                        color: orangeColor
                    }}>Cập nhật</Text>
                </View>
                <View style = {styles.statusDetailWrapper}>
                    <FlatList
                        data = {this.state.updateStatus}
                        showsHorizontalScrollIndicator = {false}
                        keyExtractor = {(item) => item.id}
                        extraData = {this.state.selectedFlatlist}
                        renderItem = {item}
                        style = {{paddingTop: 5}}
                        onRefresh = {() => {
                            this.onRefreshStatus()
                        }}
                        refreshing = {this.state.isFetchingStatus}
                    ></FlatList>
                </View>
                <View style = {styles.basicInforWrapper}>
                    <Text style = {{
                        fontSize: appFontSize,
                        color: orangeColor
                    }}>Danh sách yêu cầu</Text>
                </View>
            </View>
        );
    }

    render() {
        return(
            <SafeAreaView style = {{flex: 1}}>
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
        // marginTop: 65
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
        
    },
    statusDetailWrapper: {
        width: '90%',
        borderBottomWidth: 0.5,
        borderBottomColor: greyColor,
        paddingBottom: 10
    }
});

export default OrderDetail;