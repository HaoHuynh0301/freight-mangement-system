import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image
} from 'react-native';
import {
    HeaderBackIcon,
} from '../components';
import {
    headerFontSize,
    backIcon,
    appFontSize
} from '../contants';


class AppInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headerTitle: ''
        }
    }

    componentDidMount() {
        this.setState({
            headerTitle: this.props.route.params.title
        });
    }

    renderHeader() {
        return(
            <View style={styles.container}>
                <TouchableOpacity
                    style = {styles.iconBackWrapper}
                    onPress={() => this.props.navigation.goBack()}
                >
                    <Image
                        source = {backIcon}
                        resizeMode = 'contain'
                        style = {styles.backIcon}
                    ></Image>
                </TouchableOpacity>
                <View style = {{alignItems: 'center', flex: 1}}>
                    <Text style = {styles.nameWrapper}>{this.props.route.params.title}</Text>
                </View>
            </View>
        );
    }

    renderDieuKhoanSuDung() {
        return(
            <View style={styles.dieuKhoanWrapper}>
                <Text style={styles.textInformation}>Công ty cổ phần Huỳnh Quan Nhật Hào: là một công ty công nghệ hoạt động kinh doanh trong lĩnh vực bưu chính</Text>
                <Text style={styles.textInformation}>Tên doanh nghiệp: CÔNG TY CỔ PHẦN GIAO HÀNG HUỲNH QUAN NHẬT HÀO</Text>
                <Text style={styles.textInformation}>Email: haob1809687@student.ctu.edu.vn</Text>
            </View>
        );
    }

    renderQuestions() {
        return(
            <View>
                <Text>Question</Text>
            </View>
        );
    }

    renderMainView() {
        const title = this.props.route.params.title;
        console.log(title);
        if(title === 'Điều khoản và quy định') {
            return(
                this.renderDieuKhoanSuDung()
            );
        } 
        else if(title === 'Những câu hỏi thường gặp') {
            return(
                this.renderQuestions()
            );
        }
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
    container: {
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
    headerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        height: 65
    },  
    nameWrapper: {
        // left: 140,
        fontSize: 22,
        color: '#000'
    },
    backIcon: {
        width: 25,
        height: 25
    },
    dieuKhoanWrapper: {
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10
    },
    textInformation: {
        fontSize: appFontSize
    }
});

export default AppInformation;