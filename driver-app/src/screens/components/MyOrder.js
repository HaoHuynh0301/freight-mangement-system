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
                        justifyContent: 'flex-start',
                        marginTop: '5px',
                        borderBottom: 'solid 0.2px grey',
                        paddingLeft: '10px'
                    }}> 
                        <p style = {{
                            fontSize: '16px',
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
                    {renderItem("Tên sản phẩm", this.state.orderInformation.product_name)}
                    {renderItem("Tổng tiền", this.state.orderInformation.cast + 'VNĐ')}
                    {renderItem("Số điện thoại", this.state.orderInformation.customer_phonenumber)}
                    {renderItem("Số lượng sản phẩm", this.state.orderInformation.product_quantity)}
                    {renderItem("Khối lượng sản phẩm", this.state.orderInformation.product_weight)}
                    {renderItem("Địa chỉ giao hàng", this.state.orderInformation.detail_address)}
                    {renderItem("Thành phố", this.state.orderInformation.province)}
                    {renderItem("Quận", this.state.orderInformation.district)}
                    {renderItem("Phường", this.state.orderInformation.ward)}
                    {renderItem("Phường", this.state.orderInformation.note)}
                    <div style = {{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        marginTop: '5px',
                        paddingLeft: '10px'
                    }}> 
                        <p style = {{
                            fontSize: '16px',
                        }}>Ghi chú: {this.state.orderInformation.note}</p>
                    </div>
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
                        width: '30%',
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