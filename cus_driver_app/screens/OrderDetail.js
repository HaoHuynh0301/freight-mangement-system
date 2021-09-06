import React, { Component } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet
} from 'react-native';
import {
    headerFontSize,
    backIcon
} from '../contants';

class OrderDetail extends Component {
    constructor(props) {
        super(props);
    }

    renderHeader() {
        <View style={styles.headerContainer}>
            <Text style={styles.userInformationText}>ITH - S312379</Text>
        </View>
    }

    render() {
        return(
            <SafeAreaView style = {{flex: 1}}>
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
    }
});

export default OrderDetail;