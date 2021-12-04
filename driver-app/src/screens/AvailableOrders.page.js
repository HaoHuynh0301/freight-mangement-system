import React, { Component } from "react";
import {
    DoubleNavigationPage,
    Footer
} from '../components';
import {
    ipAddress,
} from '../contants';
import { 
    Button,
    Modal
} from 'react-bootstrap';
import background from '../assets/delivery-background.jpg';
import { ScrollView } from "@cantonjs/react-scroll-view";
import rightArrow from '../assets/right-arrow.png';
import coinIcon from '../assets/coin.png';
import phoneIcon from '../assets/phoneIcon.png';
import locationIcon from  '../assets/locationIcon.png';
import axios from "axios";
const localStorage = require('local-storage');

class AvailableOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avaiOrders: [],
            tmpOrders: {},

            showModal: false,
        }
        
        this.getAvailableOrders = this.getAvailableOrders.bind(this);
        this.handleOpenOrder = this.handleOpenOrder.bind(this);
        this.handleCloseAndGetOrder = this.handleCloseAndGetOrder.bind(this);
    }

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
            this.setState({
                avaiOrders: response.data,
                showModal: false
            })
        })
        .catch((error) => {
            alert('BẠN ĐANG TRONG QUÁ TRÌNH VẬN CHUYỂN ĐƠN HÀNG KHÁC, VUI LÒNG THỬ LẠI SAU');
        })
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
        if(this.state.avaiOrders.length === 0) {
            return(
                <div style = {{
                    height: '520px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                    <span style = {{
                        fontWeight: 'bold',
                        fontSize: '22px'
                    }}>HỆ THỐNG HIỆN KHÔNG CÓ ĐƠN HÀNG CÓ SẴN</span>
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
            const item = this.state.avaiOrders.map((item, index) => {
                return(
                    <div key = {index}>
                        <button style = {{
                            width: '100%',
                            height: '120px',
                            display: 'flex',
                            flexDirection: 'row',
                            margin: '10px',
                            backgroundColor: 'white',
                            fontSize: '13px',
                            borderWidth: '0px',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }} onClick = {() => {
                            this.handleOpenOrder(item.id);
                        }}>
                            <img  src = {`${ipAddress}${item.product_image}`}  style = {{
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
                                paddingLeft: '10px',
                                width: '60%',
                                borderRadius: '5px',
                                boxShadow: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px',
                                height: '100px',
                                padding: '5px',
                                paddingLeft: '10px'
                            }}>
                                <span style = {{
                                    fontWeight: 'bold'
                                }}>{item.customer_name} - {item.product_name}</span>
                                <span><img src = {locationIcon} style = {{
                                        height: '20px',
                                        width: '20px',
                                        marginRight: '5px'
                                    }}></img>{item.detail_address}, {item.province}, {item.district}, {item.ward}
                                </span>
                                <div>
                                    <span style = {{
                                        }}><img src = {phoneIcon} style = {{
                                            height: '20px',
                                            width: '20px',
                                            marginRight: '5px'
                                        }}></img>{item.customer_phonenumber}
                                    </span>
                                    <span style = {{
                                        }}><img src = {coinIcon} style = {{
                                            height: '20px',
                                            width: '20px',
                                            marginRight: '5px',
                                            marginLeft: '10px'
                                        }}></img>{item.cast} vnđ
                                    </span>
                                </div>
                            </div>
                            <img src = {rightArrow} style = {{
                                height: '20px',
                                width: '20px',
                                borderRadius: '10px',
                                marginLeft: '5px'
                            }}></img>
                        </button>
                    </div>
                );
            });
            return(
                <div className = 'animate__animated animate__fadeInDown' style = {{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    height: '710px',
                    width: '40%',
                    borderRadius: '5px',
                    boxShadow: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px',
                    marginLeft: '500px',
                    paddingTop: '10px',
                    backgroundColor: 'white'
                }}>
                    <span style = {{
                        fontSize: '25px',
                        fontWeight: 'bold'
                    }}>ĐƠN HÀNG HIỆN CÓ</span>
                    <ScrollView style = {{
                        width: '100%',
                        height: '90%',
                    }} onEndReached={this.handleEndReached}>
                        {item}
                    </ScrollView>
                </div>
            );
        }
    }

    render() {
        return(
            <div style = {{
            }}>
                <DoubleNavigationPage />
                <div style = {{
                    width: '100%',
                    backgroundImage: `url(${background})`
                }}>
                    {this.mainView()}
                </div>
                
                <Footer />
                <Modal style = {{
                        borderRadius: '20px'
                    }} show={this.state.showModal} onHide={() => {
                        this.setState({
                            showModal: false
                        })
                    }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Thông tin đơn hàng</Modal.Title>
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
                        <Button variant="secondary" onClick={() => {
                            this.setState({
                                showModal: false
                            })
                        }}>
                            Đóng
                        </Button>
                        <Button variant="primary" onClick={this.handleCloseAndGetOrder}>
                            Nhận đơn hàng
                        </Button>
                        </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default AvailableOrders;