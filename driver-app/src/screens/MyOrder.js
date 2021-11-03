import React, { Component } from "react";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import background from '../assets/homePageBackground.jpg';
import loading from '../assets/loading.gif';
import "leaflet-routing-machine";
import './css/myScreenStyle.css';
import './css/style.css';
import {
    ipAddress, orangeColor
} from '../contants';
import axios from "axios";
import { 
    DoubleNavigationPage,
    Footer
} from "../components";
import { RoutingMachine } from ".";
const localStorage = require('local-storage');

class MyOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderInformation: null,
            instanceAddress: null,
            deliveredAddress: null,
            instanceOrders: null
        }
        this.fetchTask = this.fetchTask.bind(this);
        this.renderOrderInformation = this.renderOrderInformation.bind(this);
        this.handleupdateOrder = this.handleupdateOrder.bind(this);
        this.handleupdateStatus = this.handleupdateStatus.bind(this);
        this.handleupPaid = this.handleupPaid.bind(this);
        this.getInstanceAddress = this.getInstanceAddress.bind(this);
    }

    fetchTask = () => {
        // console.log(this.props.match.params.id);
    }

    // Handle Update order function
    handleupdateOrder = () => {
        const token = localStorage.get('token');
        axios.post(`${ipAddress}/api/update-location/`, {
            order_id: this.state.instanceOrders.id,
            latitude: this.state.instanceAddress.latitude,
            longitude: this.state.instanceAddress.longitude
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            alert('CẬP NHẬT THÀNH CÔNG!');
        })
        .catch((error) => {
            alert('ĐÃ CÓ LỖI XẢY RA! VUI LÒNG THỬ LẠI SAU!');
        })
    }

    // Handle Update request function
    handleupdateStatus = () => {
        alert('update request');
    }

    handleupPaid = () => {
        const token = localStorage.get('token');
        axios.post(`${ipAddress}/api/set_paid_order/`, {
            order_id: this.state.instanceOrders.id
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            alert('Cập nhật thành công!');
            this.setState({
                instanceOrders: null,
                deliveredAddress: null
            });
            this.props.history.push('/');
        })
        .catch((error) => {
            alert('ĐÃ CÓ LỖI XẢY RA! VUI LÒNG THỬ LẠI SAU!');
        });
    }

    Map = () => {
        if (this.state.deliveredAddress != null) {
            return(
                <div style = {{
                    height: '100%',
                    width: '100%',
                    border: 'solid 0.5px grey',
                    marginLeft: '20px'
                }}>
                    <MapContainer style = {{
                        height: '100%',
                        width: '100%',
                        border: 'solid 0.5px grey'
                    }} center={[this.state.instanceAddress.latitude, this.state.instanceAddress.longitude]} zoom={8} scrollWheelZoom={true}>
                        <TileLayer
                            attribution='Vị trí đơn hàng'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                         
                        <RoutingMachine 
                            delivered = {[this.state.deliveredAddress.latitude, this.state.deliveredAddress.longitude]}
                            current = {[this.state.instanceAddress.latitude, this.state.instanceAddress.longitude]} 
                        />
                    </MapContainer>
                    <div style = {{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: '10px',
                        justifyContent: 'center',
                        width: '100%',                        
                    }}>
                        <button className = 'btn btn-outline-primary' style = {{
                            marginRight: '20px',
                            color: 'black'
                        }} onClick = {this.handleupdateOrder}>Cập nhật vị trí</button>
                        <button className = 'btn btn-outline-primary' style = {{
                            marginRight: '20px',
                            color: 'black'
                        }}  onClick = {this.handleupdateStatus}>Cập nhật trạng thái</button>
                        <button className = 'btn btn-outline-primary' style = {{
                            marginRight: '20px',
                            color: 'black'
                        }}  onClick = {this.handleupPaid}>Xác nhận thanh toán</button>
                    </div>
                </div>
            );
        }
        return(
            <div style = {{
                height: '100%',
                width: '1000px',
                border: 'solid 0.5px grey',
                marginLeft: '20px',
                backgroundColor: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <img src = {loading} style = {{
                    height: '60px',
                    height: '60px'
                }}></img>
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
                this.setState({
                    deliveredAddress: response.data.data[0]
                });
                console.log(response.data.data[0]);
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
        this.getInstanceAddress();
        this.interval = setInterval(() => {this.getInstanceAddress()}, 5000);
        this.fetchTask();
        this.getOrderInformation();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getInstanceAddress = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            let context = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
            console.log(position.coords.latitude + ' - ' + position.coords.longitude)
            this.setState({
                instanceAddress: context
            });
        });
    }

    renderOrderInformation = () => {
        let isFetch = false;
        let renderItem;
        if (this.state.instanceOrders !== null && this.state.instanceAddress !== null) {
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
                <div style = {{
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    border: 'solid 0.5px black'
                }}>
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
                        }}>Ghi chú: {this.state.instanceOrders.note}</p>
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
                }}>

                    {/* General View Wrapper */}
                    <div style = {{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        // height: 'auto',
                        marginTop: '30px',
                        padding: '10px'
                    }}>
                        {/* Order information column View Wrapper */}
                        <div style = {{
                            display: 'flex',
                            flexDirection: 'column',
                            border: 'solid 0.1px grey',
                            width: '20%',
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