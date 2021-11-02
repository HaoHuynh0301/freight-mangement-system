import React, { Component } from "react";
import {
    DoubleNavigationPage,
    Footer
} from '../components';
import {
    orangeColor,
    orangeBlur,
    greyColor,
    ipAddress,
} from '../contants';
import { ScrollView } from "@cantonjs/react-scroll-view";
import axios from "axios";
const localStorage = require('local-storage');

class AvailableOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avaiOrders: [],
        }
        
        this.getAvailableOrders = this.getAvailableOrders.bind(this);
    }

    componentDidMount = () => {
        this.getAvailableOrders();
    }

    handleEndReached = () => {
        console.log("load more");
    };

    getAvailableOrders = () => {
        const token = localStorage.get('token');
        axios.get(`${ipAddress}/api/available-order/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            this.setState({
                avaiOrders: response.data
            });
            console.log(this.state.avaiOrders);
        })
        .catch((error) => {
            console.log('Error');
        });
    }

    mainView = () => {
        if(this.state.avaiOrders.length !== 0) {
            return(
                <div style = {{
                    height: '520px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    <p style = {{
                        fontWeight: 'bold',
                        fontSize: '22px'
                    }}>HỆ THỐNG HIỆN KHÔNG CÓ ĐƠN HÀNG CÓ SẴN</p>
                    <button onClick = {() => {
                        this.props.history.push('/');
                    }} style = {{
                        border: 'solid 0.2px grey',
                        padding: '5px',
                        borderRadius: '10px',
                        backgroundColor: 'white'
                    }}>
                        Về trang chủ
                    </button>
                </div>
            );
        } else {
            return(
                <div style = {{
                    height: '520px'
                }}></div>
            );
        }
    }

    render() {
        return(
            <div>
                <DoubleNavigationPage />
                {this.mainView()}
                <Footer />
            </div>
        );
    }
}

export default AvailableOrders;