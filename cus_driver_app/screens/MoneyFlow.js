import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
} from "react-native";

class MonenyFlow extends Component {
    constructor(props) {
        super(props);
    }

    renderHeader() {
        return(
            <View>
                <View style={styles.container}>
                    <Text style={styles.userInformationText}>Tài khoản</Text>
                </View>
                <View style = {{
                    marginTop: 20,
                    paddingLeft: 10,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>
                    <Image
                        source = {accountIcon}
                        style = {{height: 60, width: 60}}
                    ></Image>
                    <View style = {{
                        marginLeft: 15,
                    }}>
                        <Text style = {styles.norText}>IHT</Text>
                        <Text style = {styles.norText}>S321312</Text>
                    </View>
                </View>
            </View>
        );
    }

    render() {
        return(
            <SafeAreaView>
                <Text>MoneyFlow</Text>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({

});

export default MonenyFlow;

