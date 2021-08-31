import React, { Component } from 'react';
import {
    Text,
    SafeAreaView,
    StyleSheet,
    View
} from 'react-native';
import {
    headerFontSize,
    backIcon
} from '../contants';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.userInformationText}>ITH - S312379</Text>
            </View>
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
    }
});

export default Header;

