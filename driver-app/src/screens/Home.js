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
const axios = require('axios');

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalUrOrders: 0,
            instanceOrders: [],
            comp: '',
        }
        this.onRefresh = this.onRefresh.bind(this);
    }

    onRefresh() {
        
    }

    componentDidMount() {

    }

    render() {
        if(!this.props.isAuth) {
            return (
                <Route>
                    <Redirect to = '/sign-in'/>
                </Route>
            );
        } else {
            return(
                <Router>
                    <div style = {{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: '#ffffe6',
                    }}>
                        <div style = {{
                            width: '100%',
                            height: 'auto'
                        }}>
                            <DoubleNavigationPage />
                            <PullToRefresh onRefresh={this.onRefresh}>
                                <Route path = '/my-orders'>
                                    <MyOrders />
                                </Route>
                                <Route path = '/orders'>
                                    <Orders />
                                </Route>
                                <Route path = '/dashboard'>
                                    <Dashboard />
                                </Route>
                                <Route exact path = '/'>
                                    <h1>Hello</h1>
                                </Route>
                            </PullToRefresh>    
                        </div>
                    </div>        
                </Router>
                
            );
        }
    }
}

export default Home;