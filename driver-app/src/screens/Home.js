import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import *  as ReactBoostrap from 'react-bootstrap';
import './css/homeStyle.css';
import {
    backgroundImage,
    orangeColor,
    whiteColor
} from '../contants';
import {
    DoubleNavigationPage,
    Orders,
    MyOrders,
    Dashboard
} from './components';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import {
    ipAddress
} from '../contants';
import User from './User';
import PullToRefresh from 'react-simple-pull-to-refresh';
import loadingIcon from '../assets/loading.gif';
const axios = require('axios');

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalUrOrders: 0,
            instanceOrders: [],
            comp: '',
            isAuth: null
        }
        this.onRefresh = this.onRefresh.bind(this);
    }

    onRefresh() {
        
    }

    componentDidMount() {
        this.setState({
            isAuth: this.props.isAuth
        })
    }

    render() {
        if(this.state.isAuth === null) {
            return(
                <div>
                    <img src = {loadingIcon}></img>
                </div>
            );
        } else {
            if(!this.state.isAuth) {
                return (
                    <Route>
                        <Redirect to = '/sign-in'/>
                    </Route>
                );
            } else {
                return(
                    <div style = {{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: '#FFF',
                        width: '100%'
                    }}>
                        <div style = {{
                            width: '100%',
                            height: 'auto'
                        }}>
                            <Dashboard />
                        </div>
                    </div>        
                );
            }
        }
    }
}

export default Home;