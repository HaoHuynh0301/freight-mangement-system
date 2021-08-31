import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image
} from "react-native";
import { Header } from "../components";
import {
    appFontSize,
    rightArrowIcon
} from '../contants';

class OverView extends Component {
    constructor(props) {
        super(props);
    }

    renderAppInformation() {
        return(
            <View style={styles.appInforWapper}>
                <View style={styles.appInforTitleWapper}>
                    <Text style={styles.appInforTitle}>Thông tin ứng dụng</Text>
                </View>
                <View style={styles.appInforDetailWrapper}>
                    <Text style={styles.appInforDetail}>Điều khoản và quy định</Text>
                    <TouchableOpacity>
                        <Image
                            source={rightArrowIcon}
                            style={styles.rightIcon}
                        ></Image>
                    </TouchableOpacity>
                </View>
                <View style={styles.appInforDetailWrapper}>
                    <Text style={styles.appInforDetail}>Những câu hỏi thường gặp</Text>
                    <TouchableOpacity>
                        <Image
                            source={rightArrowIcon}
                            style={styles.rightIcon}
                        ></Image>
                    </TouchableOpacity>
                </View>
                <View style={styles.appInforDetailWrapper}>
                    <Text style={styles.appInforDetail}>Tin tức</Text>
                    <TouchableOpacity>
                        <Image
                            source={rightArrowIcon}
                            style={styles.rightIcon}
                        ></Image>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    renderOrderInformation() {
        return(
            <View style={styles.orderInformationWrapper}>
                <View style={styles.orderInforTitleWapper}>
                    <Text style={styles.appInforDetail}>Thông tin đơn hàng</Text>
                </View>
                <View style={styles.appInforDetailWrapper}>
                    <Text style={styles.appInforDetail}>Phát sinh và đã lấy</Text>
                    <TouchableOpacity>
                        <Image
                            source={rightArrowIcon}
                            style={styles.rightIcon}
                        ></Image>
                    </TouchableOpacity>
                </View>
                <View style={styles.appInforDetailWrapper}>
                    <Text style={styles.appInforDetail}>Delay và hủy lấy</Text>
                    <TouchableOpacity>
                        <Image
                            source={rightArrowIcon}
                            style={styles.rightIcon}
                        ></Image>
                    </TouchableOpacity>
                </View>
                <View style={styles.appInforDetailWrapper}>
                    <Text style={styles.appInforDetail}>Giao thành công</Text>
                    <Text style={styles.numberOfOrderText}>0-ĐH</Text>
                </View>
                <View style={styles.appInforDetailWrapper}>
                    <Text style={styles.appInforDetail}>Không giao được/ Lưu kho</Text>
                    <Text style={styles.numberOfOrderText}>0-ĐH</Text>
                </View>
                <View style={styles.appInforDetailWrapper}>
                    <Text style={styles.appInforDetail}>Đơn hàng đổi trả</Text>
                    <Text style={styles.numberOfOrderText}>0-ĐH</Text>
                </View>
                <View style={styles.appInforDetailWrapper}>
                    <Text style={styles.appInforDetail}>Tiền trả</Text>
                    <Text style={styles.numberOfOrderText}>0-ĐH</Text>
                </View>
                <View style={styles.appInforDetailWrapper}>
                    <Text style={styles.appInforDetail}>Yêu cầu đổi trả</Text>
                    <Text style={styles.numberOfOrderText}>0-ĐH</Text>
                </View>
            </View>
        );
    }

    render() {
        return(
            <SafeAreaView>
                <Header />
                {this.renderAppInformation()}
                {this.renderOrderInformation()}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    appInforWapper: {
        flexDirection: 'column',
        height: 190
    },
    appInforTitle: {
        fontSize: appFontSize
    },
    appInforDetail: {
        fontSize: appFontSize
    },
    appInforTitleWapper: {
        backgroundColor: '#E8E8E8',
        height: 40,
        justifyContent: 'center',
        paddingLeft: 10
    },
    appInforDetailWrapper: {
        height: 50,
        alignItems: 'center',
        borderWidth: 0.2,
        borderColor: '#E8E8E8',
        marginLeft: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 5
    },
    rightIcon: {
        width: 20,
        height: 20   
    },
    orderInformationWrapper: {
        flex: 1,
        flexDirection: 'column',
        height: 600,
        marginTop: 20,
    },
    orderInforTitleWapper: {
        backgroundColor: '#E8E8E8',
        height: 40,
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 10
    },
    numberOfOrderText: {
        color: '#ff7733'
    }
});

export default OverView;

