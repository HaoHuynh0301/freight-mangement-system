import { extend } from "leaflet";
import React, { Component } from "react";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import background from '../assets/homePageBackground.jpg';
import './css/myScreenStyle.css';
import {
    ipAddress
} from '../contants';
import axios from "axios";
import {
    Link,
    Redirect,
    Route,
    useHistory ,
    withRouter 
} from "react-router-dom";
import { 
    DoubleNavigationPage ,
    Footer
} from "../components";
const localStorage = require('local-storage');

class MyOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderInformation: {},
            instanceAddress: null,
            deliveredAddress: null,
            instanceOrders: {}
        }
        this.fetchTask = this.fetchTask.bind(this);
        this.renderOrderInformation = this.renderOrderInformation.bind(this);
        this.handleupdateOrder = this.handleupdateOrder.bind(this);
        this.handleupdateStatus = this.handleupdateStatus.bind(this);
        this.handleupPaid = this.handleupPaid.bind(this);
    }

    fetchTask = () => {
        // console.log(this.props.match.params.id);
    }

    // Handle Update order function
    handleupdateOrder = () => {
        alert('Update');
    }

    // Handle Update request function
    handleupdateStatus = () => {
        alert('update request');
    }

    handleupPaid = () => {
        alert('Paid');
    }

    Map = () => {
        if (this.state.deliveredAddress != null) {
            console.log('Here')
            return(
                <div style = {{
                    height: '100%',
                    width: '800px',
                    border: 'solid 0.5px grey',
                    marginLeft: '20px'
                }}>
                    <MapContainer style = {{
                        height: '100%',
                        width: '100%',
                        border: 'solid 0.5px grey'
                    }} center={[14.058324, 108.277199]} zoom={5} scrollWheelZoom={true}>
                        <TileLayer
                            attribution='Vị trí đơn hàng'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[this.state.deliveredAddress.latitude, this.state.deliveredAddress.longitude]}>
                            <Popup>
                                Vị trí giao dự kiến
                            </Popup>
                        </Marker>
                    </MapContainer>
                    <div style = {{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: '10px',
                        justifyContent: 'center'
                    }}>
                        <button className = 'myUserBtnStyle' onClick = {this.handleupdateOrder}>Cập nhật vị trí</button>
                        <button className = 'myUserBtnStyle' onClick = {this.handleupdateStatus}>Cập nhật trạng thái</button>
                        <button className = 'myUserBtnStyle' onClick = {this.handleupPaid}>Xác nhận thanh toán</button>
                    </div>
                    
                </div>
            );
        }
        return(
            <div style = {{
                height: '100%',
                width: '800px',
                border: 'solid 0.5px grey',
                marginLeft: '20px'
            }}>
                <MapContainer style = {{
                    height: '100%',
                    width: '100%',
                    border: 'solid 0.5px grey'
                }} center={[14.058324, 108.277199]} zoom={5} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='Vị trí đơn hàng'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            </div>
        );
    }

    getOrderInformation = () => {
        const token = localStorage.get('token');
        axios.get(`${ipAddress}/api/instance-order`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            this.setState({
                instanceOrders: response.data
            })
            axios.get(`http://api.positionstack.com/v1/forward?access_key=ee95aa7c3e382e9aa806014b08955f13&query=1600 ${response.data.province}`)
            .then((response) => {
                console.log(response.data.data[0]);
                this.setState({
                    deliveredAddress: response.data.data[0]
                })
            })
            .catch((error) => {
                console.log(error);
            })
        })
        .catch((error) => {
            alert('ĐÃ CÓ LỖI TRONG QUÁ TRÌNH LẤY DỮ LIỆU!');
        })
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
                    {renderItem("Tên khách hàng", this.state.instanceOrders.customer_name)}
                    {renderItem("Tên sản phẩm", this.state.instanceOrders.product_name)}
                    {renderItem("Tổng tiền", this.state.instanceOrders.cast + 'VNĐ')}
                    {renderItem("Số điện thoại", this.state.instanceOrders.customer_phonenumber)}
                    {renderItem("Số lượng sản phẩm", this.state.instanceOrders.product_quantity)}
                    {renderItem("Khối lượng sản phẩm", this.state.instanceOrders.product_weight)}
                    {renderItem("Địa chỉ giao hàng", this.state.instanceOrders.detail_address)}
                    {renderItem("Thành phố", this.state.instanceOrders.province)}
                    {renderItem("Quận", this.state.instanceOrders.district)}
                    {renderItem("Phường", this.state.instanceOrders.ward)}
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
            <div>
                <DoubleNavigationPage />
                <div style = {{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    backgroundImage: `url(${background})`,
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
                        {this.Map()}
                    </div>
                </div>
            </div>
            
        );
    }
} 

export default MyOrders;