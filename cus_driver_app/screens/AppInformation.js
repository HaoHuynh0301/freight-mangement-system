import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView
} from 'react-native';
import {
    HeaderBackIcon
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

    render() {
        return(
            <SafeAreaView>
                <HeaderBackIcon title={this.state.headerTitle}/>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({

});

export default AppInformation;