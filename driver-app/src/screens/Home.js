import React, { Component } from "react";
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
} from './components';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import User from './User';
import 'bootstrap/dist/css/bootstrap.min.css';
import *  as ReactBoostrap from 'react-bootstrap';
import PullToRefresh from 'react-simple-pull-to-refresh';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalUrOrders: 0,
            instanceOrders: []
        }
        this.onRefresh = this.onRefresh.bind(this);
    }

    onRefresh() {
        
    }

    render() {
        console.log(this.props.isAuth);
        if(!this.props.isAuth) {
            return (
                <Route>
                    <Redirect to = '/sign-in'/>
                </Route>
            );
        } 
        return(
            <Router>
                <div style = {{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <div style = {{
                        width: '100%',
                        height: '500px'
                    }}>
                        <DoubleNavigationPage />
                        <PullToRefresh onRefresh={this.onRefresh}>
                            <Switch>
                                <Route path = '/my-orders'>
                                    <MyOrders />
                                </Route>
                                <Route path = '/orders'>
                                    <Orders />
                                </Route>
                            </Switch>
                        </PullToRefresh>    
                    </div>
                </div>        
            </Router>
            
        );
    }
}

export default Home;