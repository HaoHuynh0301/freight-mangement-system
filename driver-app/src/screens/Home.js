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
    MyOrders
} from './components';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import *  as ReactBoostrap from 'react-bootstrap';
import {PullToRefresh} from "react-js-pull-to-refresh";
import {PullDownContent, ReleaseContent, RefreshContent} from "react-js-pull-to-refresh";
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalUrOrders: 0
        }
        this.onRefresh = this.onRefresh.bind(this);
    }

    onRefresh() {
        console.log('OK');
    }

    render() {
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
                    }}>
                        <DoubleNavigationPage />
                        <PullToRefresh
                            pullDownContent={<PullDownContent />}
                            releaseContent={<ReleaseContent />}
                            refreshContent={<RefreshContent />}
                            pullDownThreshold={200}
                            onRefresh={this.onRefresh}
                            triggerHeight={50}
                            backgroundColor='white'
                            startInvisible={true}
                        >
                            <div style={{height: '150vh', textAlign: 'center'}}>
                                <div>PullToRefresh</div>
                            </div>
                        </PullToRefresh>
                        <Switch>
                            <Route path = '/my-orders'>
                                <MyOrders />
                            </Route>
                            <Route path = '/orders'>
                                <Orders />
                            </Route>
                        </Switch>
                    </div>
                </div>        
            </Router>
            
        );
    }
}

export default Home;