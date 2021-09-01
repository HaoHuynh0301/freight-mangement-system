import { extend } from 'lodash';
import React, { Component } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    StyleSheet
} from 'react-native';

class EditInformation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View>
                <Text>{this.props.route.params.status}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});

export default EditInformation;