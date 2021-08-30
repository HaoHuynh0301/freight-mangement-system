import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
} from "react-native";

class OverView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <SafeAreaView>
                <Text>Overview</Text>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({

});

export default OverView;

