import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
} from "react-native";

class User extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <SafeAreaView>
                <Text>User</Text>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({

});

export default User;

