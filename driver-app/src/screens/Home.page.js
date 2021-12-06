import React, { Component } from "react";
import  {
    DoubleNavigationPage,
    Footer
} from '../components';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './css/dashBoardStyle.css';
import './css/style.css';
import { 
    Button,
    Modal
} from 'react-bootstrap';
import {
    ipAddress,
    blueColor,
    orangeColor,
} from '../contants';
import userIcon from '../assets/userIcon.png';
import requestIcon from '../assets/requestIcon.png';
import addIcon from '../assets/addIcon.png';
import coinIcon from '../assets/coin2.png';
import phoneIcon from '../assets/phoneIcon2.png';
import locationIcon from  '../assets/locationIcon2.png';
import lastOrderIcon from '../assets/orderTrackingIcon.png';
import noteIcon from '../assets/noteIcon.png';
import itemIcon from '../assets/itemIcon.png';
import axios from "axios";
import loading from '../assets/loading.gif';
import arrow from '../assets/arrowRight.png';
import {
    Link,
} from "react-router-dom";
import { RoutingMachine } from ".";
import 'animate.css';
const localStorage = require('local-storage');

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastRides: null,
            instanceOrders: null,
            requests: [],
            avaiOrders: [],
            driverInfor: {},
            showModal: false,
            tmpOrders: {},
            instanceAddress: null,
            instanceOrderId: null,
            deliveredAddress: null,
            token: null,
            avaLink: null
        }
        this.getInformation = this.getInformation.bind(this);
        this.getAvailableOrders = this.getAvailableOrders.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpenOrder = this.handleOpenOrder.bind(this);
        this.handleCloseAndGetOrder = this.handleCloseAndGetOrder.bind(this);
        this.handleOpenOrderDetail = this.handleOpenOrderDetail.bind(this);
        this.getInstanceAddress = this.getInstanceAddress.bind(this);
        this.getOrderInformation = this.getOrderInformation.bind(this);
    }

    Map = () => {
        if(this.state.instanceAddress !== null && this.state.deliveredAddress !== null) {
            return(
                <div style = {{
                    height: '200px',
                    width: '400px',
                    border: 'solid 0.5px grey',
                    boxShadow: '1px 5px 5px #888888',
                }}>
                    <MapContainer style = {{
                        height: '200px',
                        width: '100%',
                        border: 'solid 0.5px grey',
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
                </div>
            );
        } else {
            return(
                <div style = {{
                    height: '250px',
                    width: '400px',
                    border: 'solid 0.5px grey',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '1px 5px 5px #888888',
                }}>
                    <img src = {loading} style = {{
                        height: '30px',
                        width: '30px'
                    }}></img>
                </div>
            );
        }
    }

    handleOpenOrderDetail = () => {
        this.props.history.push(`/my-orders/${this.state.instanceOrderId}`)
    }

    // Hàm cơ bản hiển thị Modal
    handleShow = () => {
        this.setState({
            showModal: true
        })
    }

    // Hàm mở Modal và lấy thông tin của order được nhấn vào
    handleOpenOrder = (id) => {
        const token = localStorage.get('token');
        axios.get(`${ipAddress}/api/order-detail?orderId=${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            this.setState({
                tmpOrders: response.data
            });
        })
        .catch((error) => { 
            alert('Đã có lỗi xảy ra trong quá trình lấy thông tin, vui lòng thử lại sau!');
        })
        
        this.setState({
            showModal: true
        })
    }

    // Hàm cơ bản ẩn Modal
    handleClose = () => {
        this.setState({
            showModal: false
        })
    }

    // Hàm nhận Order và ẩn Modal
    handleCloseAndGetOrder = () => {
        const token = localStorage.get('token');
        axios.post(`${ipAddress}/api/recieve-order/`, {
            orderId: this.state.tmpOrders.id
        } , {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            alert('NHẬN ĐƠN HÀNG THÀNH CÔNG!');
            console.log(response.data);
            this.setState({
                avaiOrders: response.data.avaiorders,
                showModal: false,
            });
            this.getOrderInformation();
        })
        .catch((error) => {
            alert('BẠN ĐANG TRONG QUÁ TRÌNH VẬN CHUYỂN ĐƠN HÀNG KHÁC, VUI LÒNG THỬ LẠI SAU');
        })
    }


    componentDidMount() {
        this.getInstanceAddress();
        this.interval = setInterval(() => {this.getInstanceAddress()}, 10000);
        this.getOrderInformation();
        this.getInformation();
        this.getAvailableOrders();
        this.setState({
            token: localStorage.get('token')
        });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
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
            });
            axios.get(`http://api.positionstack.com/v1/forward?access_key=ee95aa7c3e382e9aa806014b08955f13&query=1600 ${response.data.province}`)
            .then(async (response) => {
                await this.setState({
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

    // Hàm lấy vị trí hiện tại của tài xế
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

    // Hàm lấy thông tin
    async getInformation() {
        const token = localStorage.get('token');
        axios.get(`${ipAddress}/api/driver-view/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            if(response.data.avatar !== null) {
                this.setState({
                    avaLink: `${ipAddress}${response.data.avatar}`
                });
            } else {
                this.setState({
                    avaLink: userIcon
                });
            }
            this.setState({
                driverInfor: response.data
            });
            axios.get(`${ipAddress}/api/order-drivers?driver_id=${this.state.driverInfor.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    requests: response.data
                });
                var tmpList = [];
                tmpList = this.state.requests;
                for(let i=0; i<tmpList.length; i++) {
                    var requestName = '';
                    if(tmpList[i].request_option == 1) {
                        requestName = 'Giục lấy'
                    } else if(tmpList[i].request_option == 2) {
                        requestName = 'Giao';
                    } else if(tmpList[i].request_option == 3) {
                        requestName = 'Trả hàng';
                    }
                    tmpList[i].request_option = requestName;
                }
                this.setState({
                    requests: tmpList
                });
            })
            .catch((error) => {
                console.log('Error');
            });
            axios.get(`${ipAddress}/api/update-location?driver_id=${response.data.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            .then(async (response) => {
                console.log(response.data);
                await this.setState({
                    lastRides: response.data
                });
            })
            .catch((error) => {
                console.log('Error!');
            });
        }).
        catch((error) => {
            console.log('Error!');
        });
    }

    // Hàm lấy đơn hàng hiện tại trên hệ thống
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
        })
        .catch((error) => {
            console.log('Error');
        });
    }

    // Hàm lấy đơn hàng hiện tại của tài xế
    getInstanceOrder = () => {
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
            console.log(this.state.instanceOrders)
        })
        .catch((error) => {
            console.log('Error');
        })
    }

    // Hàm xử lý sự kiện xử lý request của khách hàng
    handleRequest = () => {
        console.log('Handle');
    }

    // Màn hình hiển thị khi danh sách last ride rỗng
    emptyLastRides = () => {
        return(
            <div style = {{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '370px',
                width: '400px',
                margin: '20px',
                borderRadius: '5px',
                boxShadow: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px', 
                backgroundColor: 'white'
            }}>
                <p style = {{
                    fontSize: '20px',
                    fontWeight: 'bold'
                }}>Không tồn tại chuyến xe cuối cùng</p>
            </div>
        );
    }

    // Màn hình hiển thị chuyến xe hiện tại
    instanceOrder = () => {
        if(this.state.instanceOrders !== null) {
            return(
                <div className = 'dashBoardInstanceOrderWrapper'>
                    {this.Map()}
                    <div style = {{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        height: '80%',
                        width: '100%',
                        padding: '10px',
                        paddingLeft: '20px',
                        backgroundColor: 'white',
                        boxShadow: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px', 
                    }}>
                        <p style = {{
                            fontSize: '15px'
                        }}>
                            {this.state.instanceOrders.customer_name} - 
                            {this.state.instanceOrders.customer_phonenumber} - 
                            {this.state.instanceOrders.product_name} - 
                            {this.state.instanceOrders.cast} VNĐ
                        </p>
                        <span style = {{
                            fontSize: '15px',
                            fontWeight: 'bold'
                        }}>
                            Địa chỉ: <span style = {{fontWeight: 'normal'}}>{this.state.instanceOrders.detail_address}, {this.state.instanceOrders.ward}, {this.state.instanceOrders.district}, {this.state.instanceOrders.province}</span>
                        </span>
                        <Link className = 'btnDetail btn' style = {{
                            width: '100%',
                            height: '38%',
                            textDecoration: "none",
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '30px',
                            color: 'black',
                            boxShadow: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, grey 0px 0px 3px', 
                            marginTop: '5px'
                        }} to = {'/my-order/'}>Xem chi tiết</Link>
                    </div>
                </div>
            );
        } else {
            // Hiển thị khi không có đơn hàng nào hiện đang giao
            return(
                <div style = {{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '370px',
                    width: '400px',
                    margin: '20px',
                    borderRadius: '5px',
                    boxShadow: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px',
                    backgroundColor: 'white'
                }}>
                    <p style = {{
                        fontSize: '20px',
                        fontWeight: 'bold'
                    }}>Bạn chưa tiếp nhận đơn hàng nào</p>
                </div>
            );
        }
    }

    // Màn hình hiển thị khi tồn tại danh sách last ride
    instanceOrderRequets = () => {
        const renderListofRequest = this.state.requests.map((item, index) => {
            return(
                <div key = {index} style = {{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: '20px',
                }}>
                    {/* Phần hiển thị thời gian của request */}
                    <p className = 'requestTimeFontStyle'>{item.time}</p>
                    <div className = 'requestMsgWrapper'>
                        <p className = 'requestMsgFontStyle'>{item.request_option}</p>
                    </div>
                </div>
            );
        })
        if(this.state.requests.length > 0) {
            return(
                <div className = 'dashBoardInstanceOrderRequestWrapper'>
                    {/* Title Wrapper */}
                    <div style = {{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}>
                        <div style = {{
                            height: '42px',
                            width: '42px',
                            border: 'solid 0.5px grey',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '40px',
                            marginRight: '20px',
                            paddingLeft: '6px'
                        }}>
                            <img src = {requestIcon} style = {{
                                height: '30px',
                                width: '30px',
                                alignSelf: 'center'
                            }}></img>
                        </div>
                        <p 
                            style = {{
                                alignSelf: 'center',
                                fontWeight: 'bold',
                                fontSize: '20px'
                            }}
                        >
                            Yêu cầu của đơn hàng
                        </p>
                    </div>

                    {/* Request Items Wrapper */}
                    <div className = 'dashBoardInstanceOrderRequestItemsWrapper'>

                        {/* Item request wrapper */}
                        {renderListofRequest}
                    </div>
                </div>
            );
        } else {
            return(
                <div style = {{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '370px',
                    width: '400px',
                    margin: '20px',
                    borderRadius: '5px',
                    boxShadow: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px', 
                    backgroundColor: 'white'
                }}>
                    <p style = {{
                        fontSize: '20px',
                        fontWeight: 'bold'
                    }}>Đơn hàng hiện chưa có yêu cầu nào</p>
                </div>
            );
            
        }
    }

    // Màn hình hiển thị danh sách các đơn hàng hiện có
    availableOrder = () => {
        const itemView = this.state.avaiOrders.map((item, index) => {
            return(
                <button style = {{
                    width: 'auto',
                    backgroundColor: '#FFF',
                    border: 'solid 0.2px grey',
                    borderRadius: '15px',
                    display: 'flex',
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    height: 'auto'
                }}  className = 'dashBoardAvaiOrdersItem' onClick = {() => {
                    this.handleOpenOrder(item.id);
                }}>
                    <div className = 'dashBoardAvaiOrdersItemInforWrapper'>
                        <span style = {{
                            fontSize: '12px'
                        }}>Extra Fast</span>
                        <span style = {{
                            color: 'grey',
                            fontSize: '12px'
                        }}>{item.customer_name}</span>
                    </div>
                    <span style = {{
                        fontSize: '12px',
                        fontWeight: 'bold',
                        width: '80px'
                    }}>- {item.cast} VNĐ</span>
                    <button className = 'dashBoardBtnGetOrder'>
                        <img src = {addIcon} style = {{
                            height: '25px',
                            width: '25px'
                        }} ></img>
                    </button>
                </button>
            );
        })
        if(this.state.avaiOrders.length > 0) {
            return(
                <div className = 'dashBoardAvaiOrdersWrapper'>
                    <p style = {{
                        fontSize: '20px',
                        fontWeight: 'bold',
                    }}>Đơn hàng hiện có</p>
                    {/* Item */}
                    {itemView}
                </div>
            );
        } else {
            return(
                <div className = 'dashBoardAvaiOrdersWrapper'>
                    <p style = {{
                        fontSize: '20px',
                        fontWeight: 'bold',
                    }}>Hệ thống hiện chưa có đơn hàng mới</p>
                </div>
            );
        }
    }

    lastRides = () => {
        if (this.state.lastRides !== null) {
            return(
                <div className = 'dashBoardLastRide'>
                    <div style = {{
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: 'white',
                        justifyContent: 'center',
                    }}>
                        <div style = {{
                            marginBottom: '10px'
                        }}>
                            <img src = {lastOrderIcon} style = {{
                                height: '40px',
                                width: '40px'
                            }}></img>
                            <span style = {{
                                fontSize: '20px',
                                fontWeight: 'bold',
                                marginTop: '10px',
                                marginLeft: '20px'
                            }}>Chuyến xe cuối</span>
                        </div>
                        
                        <div style = {{
                            width: '100%',
                            height: '120px',
                            display: 'flex',
                            flexDirection: 'row',
                            backgroundColor: 'white',
                            fontSize: '13px',
                            borderWidth: '0px',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <img src = {`${ipAddress}${this.state.lastRides.product_image}`}  style = {{
                                width: '100px',
                                height: '100px',
                                marginRight: '20px',
                                borderRadius: '5px',
                                boxShadow: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px',
                            }}></img>
                            <div style = {{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'space-between',
                                width: '60%',
                                borderRadius: '5px',
                                boxShadow: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px',
                                height: '100px',
                                padding: '10px',
                            }}>
                                <span style = {{
                                    fontWeight: 'bold'
                                }}>{this.state.lastRides.customer_name} - {this.state.lastRides.product_name}</span>
                                <span style = {{

                                }}>
                                    <img src = {phoneIcon} style = {{
                                        height: '20px',
                                        width: '20px',
                                        marginRight: '5px'
                                    }}></img>
                                    {this.state.lastRides.customer_phonenumber}
                                </span>
                                <span style = {{
                                    }}><img src = {coinIcon} style = {{
                                        height: '20px',
                                        width: '20px',
                                        marginRight: '5px',
                                    }}></img>{this.state.lastRides.cast} vnđ
                                </span>
                            </div>
                        </div>
                        <div style = {{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            width: '100%',
                            borderRadius: '5px',
                            boxShadow: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px',
                            height: '150px',
                            padding: '5px',
                        }}>
                            <span>
                                <img src = {locationIcon} style = {{
                                    height: '20px',
                                    width: '20px',
                                    marginRight: '5px'
                                }}></img>
                                {this.state.lastRides.detail_address}, 
                                {this.state.lastRides.ward}, 
                                {this.state.lastRides.district},
                                {this.state.lastRides.province}
                            </span>
                            <span>
                                <img src = {itemIcon} style = {{
                                        height: '20px',
                                        width: '20px',
                                        marginRight: '5px'
                                    }}></img>
                                Số lượng: {this.state.lastRides.product_quantity}
                            </span>
                            <span>
                                <img src = {itemIcon} style = {{
                                        height: '20px',
                                        width: '20px',
                                        marginRight: '5px'
                                    }}></img>
                                Khối lượng: {this.state.lastRides.product_weight} kg
                            </span>
                            <span>
                                <img src = {noteIcon} style = {{
                                        height: '20px',
                                        width: '20px',
                                        marginRight: '5px'
                                    }}></img>
                                Ghi chú: {this.state.lastRides.note}
                            </span>
                        </div>
                    </div>
                    
                </div>
            );
        } else  {
            return (
                this.emptyLastRides()
            );
        }
        
    }

    render() {
        return(
            <div>
                <DoubleNavigationPage />
                <div style = {{
                    // backgroundImage: `url(${background})`,
                    display: 'flex',
                    flexDirection: 'row',
                    paddingLeft: '60px',
                    width: 'auto',
                    height: 'auto',
                    background: '#f2f2f2'
                }}>
                    <Modal style = {{
                        borderRadius: '20px'
                    }} show={this.state.showModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <p style = {{
                                    fontWeight: 'bold'
                                }}>Thông tin đơn hàng</p>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p><span style = {{
                                    fontWeight: 'bold'
                                }}>Tên khách hàng: </span>{this.state.tmpOrders.customer_name}</p>
                            <div
                                style = {{
                                    height: '0.001px',
                                    border: 'solid 0.05px grey',
                                    marginBottom: '10px'
                                }}
                            ></div>
                            <p><span style = {{
                                    fontWeight: 'bold'
                                }}>Số điện thoại:</span> {this.state.tmpOrders.customer_phonenumber}</p>
                            <div
                                style = {{
                                    height: '0.001px',
                                    border: 'solid 0.05px grey',
                                    marginBottom: '10px'
                                }}
                            ></div>
                            <p>
                                <span style = {{
                                    fontWeight: 'bold'
                                }}>Địa chỉ: </span>{this.state.tmpOrders.detail_address}, {this.state.tmpOrders.ward}, {this.state.tmpOrders.district}, {this.state.tmpOrders.province}
                            </p>
                            <div
                                style = {{
                                    height: '0.001px',
                                    border: 'solid 0.05px grey',
                                    marginBottom: '10px'
                                }}
                            ></div>
                            <p><span style = {{
                                    fontWeight: 'bold'
                                }}>Tên mặc hàng: </span>{this.state.tmpOrders.product_name}</p>
                            <div
                                style = {{
                                    height: '0.001px',
                                    border: 'solid 0.05px grey',
                                    marginBottom: '10px'
                                }}
                            ></div>
                            <p><span style = {{
                                    fontWeight: 'bold'
                                }}>Số lượng: </span>{this.state.tmpOrders.product_quantity}</p>
                            <div
                                style = {{
                                    height: '0.001px',
                                    border: 'solid 0.05px grey',
                                    marginBottom: '10px'
                                }}
                            ></div>
                            <p><span style = {{
                                    fontWeight: 'bold'
                                }}>Đơn giá: </span>{this.state.tmpOrders.cast}VNĐ</p>
                            <div
                                style = {{
                                    height: '0.001px',
                                    border: 'solid 0.05px grey',
                                    marginBottom: '10px'
                                }}
                            ></div>
                            <p><span style = {{
                                    fontWeight: 'bold'
                                }}>Hình thức giao hàng: </span>{this.state.tmpOrders.ship_option}</p>
                            <div
                                style = {{
                                    height: '0.001px',
                                    border: 'solid 0.05px grey',
                                    marginBottom: '10px'
                                }}
                            ></div>
                            <p><span style = {{
                                    fontWeight: 'bold'
                                }}>Ghi chú: </span>{this.state.tmpOrders.note}</p>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button  style = {{
                            color: 'black'
                        }}  variant="secondary" onClick={this.handleClose}>
                            Đóng
                        </Button>
                        <Button style = {{
                            backgroundColor: orangeColor,
                            color: 'black'
                        }} className = 'btn btnDetail' variant="primary" onClick={this.handleCloseAndGetOrder}>
                            Nhận đơn hàng
                        </Button>
                        </Modal.Footer>
                    </Modal>
                    <div>
                        <div className = 'animate__animated animate__fadeInLeftBig dashBoardCol1'>
                            <div className = 'dashBoardUser'>
                                <div style = {{
                                    // marginTop: '20px',
                                    marginLeft: '10px',
                                    marginRight: '10px',
                                    marginBottom: '20px',
                                    height: '100%',
                                    width: '100%',
                                    borderColor: "black",
                                    display: "flex",
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                }}>
                                    <div style = {{
                                        backgroundColor: '#f2f2f2',
                                        width: '100%',
                                        paddingTop: '20px',
                                        paddingLeft: '20px',
                                        borderBottomColor: 'grey',
                                        borderBottomWidth: '0.5px',
                                        marginBottom: '10px'
                                    }}>
                                        <p style = {{
                                            fontWeight: 'bold'
                                        }}>Thông tin tài xế</p>
                                    </div>
                                    
                                    <div style = {{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        paddingBottom: '10px',
                                        paddingLeft: '20px',
                                        paddingRight: '20px',
                                        width: '99%',
                                        borderRadius: '20px'
                                    }}>
                                        <div style = {{
                                            display: "flex",
                                            flexDirection: 'column',
                                            borderBottom: 'solid 0.5px grey',
                                            width: '100%',
                                            paddingBottom: '10px'
                                        }}>
                                            <span style = {{
                                                fontWeight: 'bold',
                                                color: blueColor,
                                                marginBottom: '15px'
                                            }}>Thông tin cá nhân</span>
                                            <span style = {{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                width: '150px',
                                                fontWeight: 'bold'
                                            }}>Tên tài xế: <p style = {{marginLeft: '5px', fontWeight: 'normal'}}>{this.state.driverInfor.name}</p></span>
                                            <span style = {{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                width: '200px',
                                                fontWeight: 'bold'
                                            }}>Tên đăng nhập: <p style = {{marginLeft: '5px', fontWeight: 'normal'}}>{this.state.driverInfor.username}</p></span>
                                        </div>
                                        <img src = {this.state.avaLink} style = {{
                                            marginLeft: '40px',
                                            height: '60px',
                                            width: '60px',
                                            borderRadius: '50px',
                                            marginTop: '20px'
                                        }}/>
                                    </div>
                                    <div style = {{
                                        display: "flex",
                                        flexDirection: "row",
                                        width: '99%',
                                        borderRadius: '20px',
                                        paddingBottom: '10px',
                                        paddingLeft: '20px',
                                        paddingRight: '20px',
                                        paddingTop: '5px'
                                    }}>
                                        <div style = {{
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}>
                                            <span style = {{
                                                fontWeight: 'bold',
                                                color: blueColor,
                                                marginBottom: '15px'
                                            }}>Thông tin liên hệ</span>
                                            <span style = {{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                width: '200px',
                                                fontWeight: 'bold'
                                            }}>Bằng lái xe: <p style = {{marginLeft: '5px', fontWeight: 'normal'}}>{this.state.driverInfor.driverLicense}</p></span>
                                            <span style = {{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                width: '200px',
                                                fontWeight: 'bold'
                                            }}>Số điện thoại: <p style = {{marginLeft: '5px', fontWeight: 'normal'}}>{this.state.driverInfor.phone_number}</p></span>
                                        </div>
                                        <Link to = '/profile' style = {{
                                            border: 'solid 0 white',
                                            backgroundColor: 'white',
                                            alignSelf: 'center',
                                            marginLeft: '100px'
                                        }}>
                                            <img src = {arrow} style = {{
                                                height: '30px',
                                                width: '30px',
                                                border: 'solid 0 white',
                                                backgroundColor: 'white'
                                            }}></img>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {this.lastRides()}
                        </div>

                        {/* Cột thứ hai */}
                        <div className = 'dashBoardCol1 animate__animated animate__fadeInRightBig'>
                            {this.instanceOrder()}
                            {this.instanceOrderRequets()}
                        </div>

                    </div>
                    {/* Cột thứ nhất */}
                    
                    {/* Cột thứ ba */}
                    <div className = 'dashBoardCol1 animate__animated animate__fadeInDown'>
                        {this.availableOrder()}
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default HomePage;