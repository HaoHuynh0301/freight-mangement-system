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
    appFontSize
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

    render() {
        return(
            <SafeAreaView>
                {this.renderHeader()}
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
    }
});

export default MonenyFlow;

