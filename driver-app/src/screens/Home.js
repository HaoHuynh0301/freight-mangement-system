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

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalUrOrders: 0
        }
    }

    render() {
        return(
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
                    <div style = {{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: '20px',
                        marginLeft: '320px'
                    }}>
                        <div className = 'yourOrderWrapper'>
                            <p className = 'titleStyle'>ĐƠN HÀNG CỦA BẠN</p>
                            <p>Tổng số đơn hàng hiện tại của bạn: {this.state.totalUrOrders}</p>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default Home;