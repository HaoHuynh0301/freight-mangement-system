import { extend } from "leaflet";
import React, { Component } from "react";
import {
    backgroundUserImage,
    orangeColor,
    orangeBlur,
    userIcon,
    greyColor,
    ipAddress
} from '../../contants';
import axios from "axios";
import {
    Link,
    Redirect,
    Route,
    useHistory ,
    withRouter 
} from "react-router-dom";
const localStorage = require('local-storage');

class MyOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderInformation: null
        }
        this.fetchTask = this.fetchTask.bind(this);
        // this.getOrderInformation = this.getOrderInformation.bind(this);
        this.renderOrderInformation = this.renderOrderInformation.bind(this);
    }

    fetchTask = () => {
        // console.log(this.props.match.params.id);
    }

    getOrderInformation = () => {
        const token = localStorage.get('token');
        axios.get(`${ipAddress}/api/order-detail?orderId=17`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            this.setState({
                orderInformation: response.data
            });
            console.log(this.state.orderInformation);
        })
        .catch((error) => {
            alert('Đã có lỗi xảy ra trong quá trình lấy thông tin, vui lòng thử lại sau!');
        });
    }

    componentDidMount() {
        this.fetchTask();
        this.getOrderInformation();
    }

    renderOrderInformation = () => {
        let isFetch = false;
        let renderItem;
        if (this.state.orderInformation != null) {
            renderItem = (title, value) => {
                return(
                    <div style = {{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}> 
                        <p style = {{
                            fontSize: '20px'
                        }}>{title}: {value}</p>
                    </div>
                );
            } 
            isFetch = true
        }
        if (isFetch) {
            return(
                <div>
                    {renderItem("Tên khách hàng", this.state.orderInformation.customer_name)}
                </div>
            );
        }
        return(
            <div>Loading</div>
        );
    }

    render() {
        return(
            <div style = {{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center'
            }}>

                {/* General View Wrapper */}
                <div style = {{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '70%',
                    height: 'auto',
                    marginTop: '30px',
                    padding: '10px'
                }}>
                    {/* Order information column View Wrapper */}
                    <div style = {{
                        display: 'flex',
                        flexDirection: 'column',
                        border: 'solid 0.1px grey',
                        width: '25%',
                        borderRadius: '15px'
                    }}>
                        {this.renderOrderInformation()}
                    </div>
                </div>
            </div>
        );
    }
} 

export default MyOrders;