import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/dashBoardStyle.css';
import userLogo from '../../assets/user-icon.png';
import clockLogo from '../../assets/clock-icon.png';
import locationLogo from '../../assets/location-icon.png';
import dotIcon from '../../assets/dot-icon.png';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { 
    Button,
    Modal
} from 'react-bootstrap';
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

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastRides: [],
            instanceOrders: null,
            requests: [],
            avaiOrders: [],
            driverInfor: {},
            showModal: false,
            tmpOrders: {},
            instanceAddress: null
        }
        this.getInformation = this.getInformation.bind(this);
        this.getAvailableOrders = this.getAvailableOrders.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpenOrder = this.handleOpenOrder.bind(this);
        this.handleCloseAndGetOrder = this.handleCloseAndGetOrder.bind(this);
        this.handleOpenOrderDetail = this.handleOpenOrderDetail.bind(this);
        this.getInstanceOrder = this.getInstanceOrder.bind(this);
    }

    Map = () => {
        return(
            <div style = {{
                height: '250px',
                width: '400px',
                border: 'solid 0.5px grey'
            }}>
                <MapContainer style = {{
                    height: '200px',
                    width: '100%',
                    border: 'solid 0.5px grey'
                }} center={[14.058324, 108.277199]} zoom={5} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='Vị trí đơn hàng'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[21.0245, 105.84117]}>
                        <Popup>
                            Vị trí giao dự kiến
                        </Popup>
                    </Marker>
                    <Marker position={[10.03711, 105.78825]}>
                        <Popup>
                            Vị trí hiện tại
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        );
    }

    handleOpenOrderDetail = () => {
        this.props.history.push('/my-orders/17')
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
        .then(async (response) => {
            alert('Nhận đơn hàng thành công');
            console.log(response.data)
            this.setState({
                showModal: false,
                instanceOrders: response.data
            });
        })
        .catch((error) => {
            alert('Đã có lỗi xảy ra trong quá trình lấy thông tin, vui lòng thử lại sau!');
        })
    }


    componentDidMount() {
        this.getInformation();
        this.getAvailableOrders();
        this.getInstanceOrder();
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
            this.setState({
                driverInfor: response.data
            });
            axios.get(`${ipAddress}/api/update-location?driver_id=${response.data.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            .then(async (response) => {
                await this.setState({
                    lastRides: response.data
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
            console.log(this.state.avaiOrders);
        })
        .catch((error) => {
            console.log('Error');
        });
    }

    // Hàm lấy đơn hàng hiện tại của tài xế
    getInstanceOrder = () => {
        const token = localStorage.get('token');
        axios.get(`${ipAddress}/api/instance-order?order_id=17`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            this.setState({
                instanceAddress: response.data
            });
        })
        .catch((error) => {
            alert('Đã có lỗi trong quá trình lấy dữ liệu, xin thử lại sau!');
        });
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
                alignItems: 'center'
            }}>
                Không tồn tại chuyến xe
            </div>
        );
    }

    // Màn hình hiển thị chuyến xe hiện tại
    instanceOrder = () => {
        if(this.state.instanceOrders == null) {
            return(
                <div className = 'dashBoardInstanceOrderWrapper'>
                    {this.Map()}
                    <div style = {{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        height: '100%',
                        width: '100%',
                        padding: '10px',
                        paddingLeft: '20px'
                    }}>
                        <p style = {{
                            fontSize: '15px'
                        }}>Quan Như Tiên - 0918026392 - Màn hình - 10000VNĐ</p>
                        <p style = {{
                            fontSize: '15px'
                        }}>Địa chỉ: số 59/31, Hưng Lợi, Ninh Kiều</p>
                        <button style = {{
                            width: '95%',
                            alignSelf: 'center',
                            height: '30px',
                            border: 'solid 0px grey',
                            borderRadius: '15px',
                            backgroundColor: orangeColor
                        }} onClick = {this.handleOpenOrderDetail}>Xem chi tiết</button>
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
                    height: '330px',
                    width: '400px',
                    margin: '20px',
                    borderRadius: '30px',
                    border: 'solid 0.5px grey',
                    boxShadow: '5px 10px 18px #888888',
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
                <div style = {{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: '20px'
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
                            widows: '42px',
                            border: 'solid 0.5px grey',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyItems: 'center',
                            borderRadius: '40px',
                            padding: '1px',
                            marginRight: '20px'
                        }}>
                            <img src = {userLogo} style = {{
                                height: '40px',
                                width: '40px',
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
            <div style = {{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                Không có yêu cầu nào
            </div>
        }
    }

    // Màn hình hiển thị danh sách các đơn hàng hiện có
    availableOrder = () => {
        const itemView = this.state.avaiOrders.map((item, index) => {
            return(
                <button style = {{
                    width: '360px',
                    backgroundColor: '#FFF',
                    border: 'solid 0.2px grey',
                    borderRadius: '15px',
                    display: 'flex',
                    flexDirection: 'row'
                }}  className = 'dashBoardAvaiOrdersItem' onClick = {() => {
                    this.handleOpenOrder(item.id);
                }}>
                    <img src = {userLogo} style = {{
                        height: '40px',
                        width: '40px'
                    }}></img>
                    <div className = 'dashBoardAvaiOrdersItemInforWrapper'>
                        <p>Extra Fast</p>
                        <p style = {{
                            color: 'grey'
                        }}>{item.customer_name}</p>
                    </div>
                    <p>- {item.cast}VND</p>
                    <button className = 'dashBoardBtnGetOrder'>
                        <img style = {{
                            height: '25px',
                            width: '25px'
                        }} src = {dotIcon}></img>
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
                        fontWeight: 'bold'
                    }}>Hệ thống hiện chưa có đơn hàng mới</p>
                </div>
            );
        }
    }

    lastRides = () => {
        const listOfLastRides = this.state.lastRides.map((item, index) => {
            return(
                <div class = 'dashBoardLastRideItem' key = {index}>
                    {/* Danh sách vận chuyển của đơn hàng cuối cùng */}
                    <div style = {{
                        height: '63px',
                        width: '63px',
                        border: '0.5px solid grey',
                        borderRadius: '20px',
                        display: 'flex',
                        flexDirection: 'row',
                        marginBottom: '10px'
                    }}>
                        <img src = {clockLogo}  style = {{
                            height: '60px',
                            width: '60px',
                        }}></img>
                    </div>
                    <div style = {{
                        marginLeft: '30px',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '0'
                    }}>
                        <p className = 'dashBoardTextStyle2'>{item.time}</p>
                        <p>
                            <img src = {locationLogo} height = '30px' width = '30px' style = {{marginRight: '10px'}}></img>
                            {item.ward}, {item.province}, {item.city}
                        </p>
                    </div> 
                </div>
            );
        });
        if (this.state.lastRides.length > 0) {
            return(
                <div className = 'dashBoardLastRide'>
                    <div style = {{
                        display: 'flex',
                        flexDirection: 'row',
                        marginBottom: '5px',
                        
                    }}>
                        <p style = {{
                            fontSize: '25px',
                            fontWeight: 'bold'
                        }}>Chuyến xe cuối</p>
                    </div>
                    {listOfLastRides}
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
            <div className = 'dashBoardContainer'>
                <Modal style = {{
                    borderRadius: '20px'
                }} show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thông tin đơn hàng</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Tên khách hàng: {this.state.tmpOrders.customer_name}</p>
                        <div
                            style = {{
                                height: '0.001px',
                                border: 'solid 0.05px grey',
                                marginBottom: '10px'
                            }}
                        ></div>
                        <p>Số điện thoại: {this.state.tmpOrders.customer_phonenumber}</p>
                        <div
                            style = {{
                                height: '0.001px',
                                border: 'solid 0.05px grey',
                                marginBottom: '10px'
                            }}
                        ></div>
                        <p>
                            Địa chỉ: {this.state.tmpOrders.detail_address}, {this.state.tmpOrders.ward}, {this.state.tmpOrders.district}, {this.state.tmpOrders.province}
                        </p>
                        <div
                            style = {{
                                height: '0.001px',
                                border: 'solid 0.05px grey',
                                marginBottom: '10px'
                            }}
                        ></div>
                        <p>Tên mặc hàng: {this.state.tmpOrders.product_name}</p>
                        <div
                            style = {{
                                height: '0.001px',
                                border: 'solid 0.05px grey',
                                marginBottom: '10px'
                            }}
                        ></div>
                        <p>Số lượng: {this.state.tmpOrders.product_quantity}</p>
                        <div
                            style = {{
                                height: '0.001px',
                                border: 'solid 0.05px grey',
                                marginBottom: '10px'
                            }}
                        ></div>
                        <p>Đơn giá: {this.state.tmpOrders.cast}VNĐ</p>
                        <div
                            style = {{
                                height: '0.001px',
                                border: 'solid 0.05px grey',
                                marginBottom: '10px'
                            }}
                        ></div>
                        <p>Hình thức giao hàng: {this.state.tmpOrders.ship_option}</p>
                        <div
                            style = {{
                                height: '0.001px',
                                border: 'solid 0.05px grey',
                                marginBottom: '10px'
                            }}
                        ></div>
                        <p>Ghi chú: {this.state.tmpOrders.note}</p>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={this.handleCloseAndGetOrder}>
                        Nhận đơn hàng
                    </Button>
                    </Modal.Footer>
                </Modal>
                {/* Cột thứ nhất */}
                <div className = 'dashBoardCol1'>
                    <div className = 'dashBoardUser'>
                        <div style = {{
                            marginTop: '20px',
                            marginLeft: '10px',
                            marginRight: '10px',
                            marginBottom: '20px',
                            height: '90%',
                            width: '90%',
                            borderColor: "black",
                            borderRadius: '30px',
                            backgroundColor: 'rgba(0,0,0, 0.4)',
                            display: "flex",
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            padding: '20px',
                            
                        }}>
                            <p style = {{
                                color: '#FFF',
                                fontWeight: 'bold'
                            }}>Thông tin tài xế</p>
                            <div style = {{
                                display: 'flex',
                                flexDirection: 'row',
                                border: '0.5px solid grey',
                                padding: '10px',
                                width: '99%',
                                borderRadius: '20px'
                            }}>
                                <div style = {{
                                    display: "flex",
                                    flexDirection: 'column'
                                }}>
                                    <p className = 'dashBoardTextStyle'>{this.state.driverInfor.name}</p>
                                    <p className = 'dashBoardTextStyle'>{this.state.driverInfor.phone_number}</p>
                                </div>
                                <img src = {userLogo} style = {{
                                    marginLeft: '50px',
                                    height: '80px',
                                    width: '80px'
                                }}/>
                            </div>
                            <div style = {{
                                display: "flex",
                                flexDirection: "column",
                                marginTop: '10px',
                                border: '0.5px solid grey',
                                width: '99%',
                                borderRadius: '20px',
                                padding: '10px',
                            }}>
                                <p className = 'dashBoardTextStyle'>Bằng lái xe: {this.state.driverInfor.driverLicense}</p>
                                <p className = 'dashBoardTextStyle'>Username: {this.state.driverInfor.username}</p>
                            </div>
                        </div>
                    </div>
                    {this.lastRides()}
                </div>

                {/* Cột thứ hai */}
                <div className = 'dashBoardCol1'>
                    {this.instanceOrder()}
                    {this.instanceOrderRequets()}
                </div>

                {/* Cột thứ ba */}
                <div className = 'dashBoardCol1'>
                    {this.availableOrder()}
                </div>
            </div>
        );
        
    }
}

export default withRouter(Dashboard) ;