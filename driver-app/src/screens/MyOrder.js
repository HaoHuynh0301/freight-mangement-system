import React, { Component } from "react";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer} from 'react-leaflet';
import orderIcon from '../assets/noImage.png'
import loading from '../assets/loading.gif';
import "leaflet-routing-machine";
import './css/myScreenStyle.css';
import './css/style.css';
import { 
    Button,
    Modal,
    Dropdown
} from 'react-bootstrap';
import {
    ipAddress
} from '../contants';
import axios from "axios";
import { 
    DoubleNavigationPage,
    Footer
} from "../components";
import {
    BrowserRouter as Router,
    Link,
    withRouter 
} from "react-router-dom";
import { RoutingMachine } from ".";
const localStorage = require('local-storage');

class MyOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderInformation: null,
            instanceAddress: null,
            deliveredAddress: null,
            instanceOrders: null,
            isShow: false,
            orderStatus: null,
            ordersStatus: [
                {
                    id: 1,
                    name: 'Đang xử lý'
                },
                {
                    id: 2,
                    name: 'Đã tiếp nhận'
                },
                {
                    id: 3,
                    name: 'Đang giao'
                },
                {
                    id: 4,
                    name: 'Đã giao, đối soát'
                },
                {
                    id: 6,
                    name: 'Không giao được'
                },
            ],
            willUpdateOrderStatus: 'Chọn trạng thái',

            isShowImg: false,
            avaLink: null
        }
        this.fetchTask = this.fetchTask.bind(this);
        this.renderOrderInformation = this.renderOrderInformation.bind(this);
        this.handleupdateOrder = this.handleupdateOrder.bind(this);
        this.handleupdateStatus = this.handleupdateStatus.bind(this);
        this.handleupPaid = this.handleupPaid.bind(this);
        this.getInstanceAddress = this.getInstanceAddress.bind(this);
        this.getStatusUpdate = this.getStatusUpdate.bind(this);
    }

    fetchTask = () => {
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
        console.log(this.state.instanceOrders.id);
        const token = localStorage.get('token');
        axios.post(`${ipAddress}/api/status-order/`, {
            status_id: this.state.willUpdateOrderStatus,
            order_id: this.state.instanceOrders.id
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            this.setState({
                orderStatus: response.data
            })
        })
        .catch((error) => {
            alert('ĐÃ CÓ LỖI VUI LÒNG THỬ LẠI');
        })
        this.getStatusUpdate();
        this.setState({
            isShow: true
        });
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
                    borderRadius: '5px',
                    boxShadow: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px', 
                    marginLeft: '20px'
                }}>
                    <MapContainer style = {{
                        height: '100%',
                        width: '100%',
                        border: 'solid 0.5px grey'
                    }} center={[this.state.instanceAddress.latitude, this.state.instanceAddress.longitude]} zoom={10} scrollWheelZoom={true}>
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
                        <button className = 'btn btnUpdate' style = {{
                            marginRight: '20px',
                            color: 'black',
                            boxShadow: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px',
                            borderWidth: '0px'
                        }} onClick = {this.handleupdateOrder}>Cập nhật vị trí</button>
                        <button className = 'btn btnUpdate' style = {{
                            marginRight: '20px',
                            color: 'black',
                            boxShadow: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px',
                            borderWidth: '0px'
                        }}  onClick = {() => {
                            this.setState({
                                isShow: true
                            });
                            this.getStatusUpdate();
                        }}>Cập nhật trạng thái</button>
                        <button className = 'btn btnUpdate' style = {{
                            marginRight: '20px',
                            color: 'black',
                            boxShadow: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px',
                            borderWidth: '0px'
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
            if(response.data.product_image !== null) {
                this.setState({
                    avaLink: `${ipAddress}${response.data.product_image}`
                });
            } else {
                this.setState({
                    avaLink: orderIcon
                });
            }
            this.setState({
                instanceOrders: response.data
            });
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
            console.log(error);
        })
    }

    componentDidMount() {
        this.getInstanceAddress();
        this.interval = setInterval(() => {this.getInstanceAddress()}, 3000);
        this.fetchTask();
        this.getOrderInformation();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getStatusUpdate = () => {
        const token = localStorage.get('token')
        axios.get(`${ipAddress}/api/status-order?order_id=${this.state.instanceOrders.id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            this.setState({
                orderStatus: response.data
            });
        })
        .catch((error) => {
            console.log('Error');
        });
        
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
                        borderBottom: 'solid 0.2px rgba(17, 17, 26, 0.1)',
                        paddingLeft: '10px'
                    }}> 
                        <p style = {{
                            fontSize: '16px',
                        }}><span style = {{
                            fontWeight: 'bold'
                        }}>{title}</span>: {value}</p>
                    </div>
                );
            } 
            isFetch = true
        }
        if (isFetch) {
            return(
                <div style = {{
                    backgroundColor: 'white',
                    borderRadius: '5px',
                    boxShadow: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px', 
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
                    <button className = 'btnUpdate' style = {{
                        borderRadius: '5px',
                        boxShadow: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px', 
                        borderWidth: '0px',
                        width: '100%',
                        // backgroundColor: 'white'
                    }} onClick = {() => {
                        this.setState({
                            isShowImg: true
                        });
                    }}>Xem hình ảnh</button>
                </div>
            );
        }
        return(
            <div>Loading</div>
        );
    }

    render() {
        const statusItem = this.state.ordersStatus.map((item, index) => {
            return(
                <Dropdown.Item key = {index} href="#" onClick = {() => {
                    this.setState({
                        willUpdateOrderStatus: item.id
                    })
                }}>{item.name}</Dropdown.Item>
            );
        });
        if(this.state.instanceOrders === null) {
            return(
                <div>
                    <DoubleNavigationPage />
                    <div style = {{
                        height: '400px',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <span style = {{
                            fontSize: '30px',
                            marginBottom: '20px',
                            fontWeight: 'bold'
                        }}>Bạn chưa có đơn hàng nào</span>
                        <Link to = '/' className = 'btnUpdate' style = {{
                            height: '50px',
                            width: 'auto',
                            border: 'solid 0.5px grey',
                            padding: '20px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                            borderRadius: '30px',
                            color: 'black'
                        }}>Bắt đầu giao hàng ngay</Link>
                    </div>
                    <Footer />
                </div>
            );
        } 
        return(
            <div>
                <DoubleNavigationPage />
                <div style = {{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginBottom: '20px'
                }}>

                    {/* General View Wrapper */}
                    <div style = {{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        marginTop: '30px',
                        padding: '10px',
                    }}>
                        {/* Order information column View Wrapper */}
                        <div style = {{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '20%',
                            borderRadius: '15px'
                        }}>
                            {this.renderOrderInformation()}
                        </div>
                        {this.Map()}
                    </div>
                </div>
                <Modal style = {{
                        borderRadius: '20px'
                    }} show={this.state.isShow} onHide={() => {
                        this.setState({
                            isShow: false
                        })
                    }}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <p style = {{
                                    fontWeight: 'bold',
                                }}>Trạng thái đơn hàng</p>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div style = {{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                                <p style = {{
                                    fontSize: '20px'
                                }}>Trạng thái: {this.state.orderStatus}</p>
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Chọn trạng thái
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {statusItem}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={() => {
                            this.setState({
                                isShow: false
                            })
                        }}>
                            Đóng
                        </Button>
                        <Button variant="primary" onClick={() => {
                            this.handleupdateStatus();
                        }}>
                            Cập nhật trạng thái
                        </Button>
                        </Modal.Footer>
                </Modal>
                <Modal style = {{
                        borderRadius: '20px'
                    }} show={this.state.isShowImg} onHide={() => {
                        this.setState({
                            isShowImg: false
                        })
                    }}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <p style = {{
                                    fontWeight: 'bold',
                                }}>Hình ảnh đơn hàng</p>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div style = {{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <img src = {this.state.avaLink} style = {{
                                    height: '60%',
                                    width: '60%',
                                    alignSelf: 'center'
                                }}>
                                </img>
                            </div>
                        </Modal.Body>
                </Modal>
            </div>
        );
    }
} 

export default MyOrders;