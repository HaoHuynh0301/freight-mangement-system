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
    backIcon
} from '../components';

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
                <Text style = {styles.nameWrapper}>{this.state.headerTitle}</Text>
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
    nameWrapper: {
        left: 140,
        fontSize: 22,
        color: '#000'
    },
    backIcon: {
        width: 25,
        height: 25
    },
    container: {
        height: 70,
        // width: '100%',
        flexDirection: 'row',
        backgroundColor: '#ff7733',
        // justifyContent: 'flex-start',
        alignItems: 'center'
    },
});

export default AppInformation;