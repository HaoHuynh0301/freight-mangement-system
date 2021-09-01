import { extend } from 'lodash';
import React, { Component } from 'react';
import {
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    ScrollView
} from 'react-native';
import {
    headerFontSize,
    bankIcon,
    homeIcon,
    cartIcon
} from '../contants';

class EditInformation extends Component {
    constructor(props) {
        super(props);
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
                    <Text style = {styles.nameWrapper}>{this.props.route.params.status}</Text>
                </View>
            </View>
        );
    }

    renderEditInformationView() {
        <ScrollView>
            <View style={styles.bankingInforWrapper}>
                <View style = {{
                    backgroundColor: '#E0E0E0',
                    height: 40,
                    width: 380,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingLeft: 10,
                    paddingRight: 10,
                    flexDirection: 'row'
                    // borderRadius: 10
                }}>
                    <Text style = {{fontSize: 17}}>Thông tin ngân hàng, đối soát</Text>
                    <TouchableOpacity
                        
                    >
                        <Text style = {{fontSize: 17, color: '#ff7733'}}>Sửa</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.basicInforDetail}>
                    <Image
                        source = {homeIcon}
                        style={styles.basicInforImage}
                    ></Image>
                    <Text style={styles.basicInforText}>HUYNH QUAN NHAT HAO</Text>
                </View>
                <View style={styles.basicInforDetail}>
                    <Image
                        source = {cartIcon}
                        style={styles.basicInforImage}
                    ></Image>
                    <Text style={styles.basicInforText}>070110470515</Text>
                </View>
                <View style={styles.basicInforDetail}>
                    <Image
                        source = {bankIcon}
                        style={styles.basicInforImage}
                    ></Image>
                    <Text style={styles.basicInforText}>STB - NGAN HANG TMCP</Text>
                </View>
                <View style={styles.basicInforDetail}>
                    <Image
                        source = {locationIcon}
                        style={styles.basicInforImage}
                    ></Image>
                    <Text style={styles.basicInforText}>SACOMBANK CAN THO</Text>
                </View>
                <View style={styles.basicInforDetail}>
                    <Image
                        source = {moneyIcon}
                        style={styles.basicInforImage}
                    ></Image>
                    <Text style={styles.basicInforText}>Đối soát 3 lần/tuần 2/4/6</Text>
                </View>
                </View>
        </ScrollView>
    }

    render() {
        return(
            <SafeAreaView>
                {this.renderHeader()}
                {this.renderEditInformationView()}
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
    bankingInforWrapper: {
        height: 290,
        flexDirection: 'column',
        // alignItems: 'center',
        width: '92%',
        backgroundColor: '#FFF',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 10
    },
    basicInforDetail: {
        height: 50,
        flexDirection: 'row',
        paddingLeft: 10,
        alignItems: 'center',
        borderBottomWidth: 0.5,
    },
    basicInforImage: {
        height: 30,
        width: 30
    },
    basicInforText: {
        fontSize: 17,
        marginLeft: 10
    },
});

export default EditInformation;