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
                            border: 'solid 0.5px white',
                            width: '100%',
                            height: '120px',
                            borderBottomWidth: '0.5px',
                            borderBottomColor: 'grey',
                            display: 'flex',
                            flexDirection: 'row',
                            margin: '10px',
                            borderRadius: '10px',
                        }} onClick = {() => {
                            this.handleOpenOrder(item.id);
                        }}>
                            <div style = {{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                                paddingTop: '20px',
                                paddingLeft: '10px'
                            }}>
                                <span style = {{
                                    // marginLeft: '20px'
                                }}>Tên khách hàng: {item.customer_name}</span>
                                <span style = {{
                                    // marginLeft: '28px'
                                }}>Số điện thoại: {item.customer_phonenumber}</span>
                                <span style = {{
                                    // marginLeft: '5px'
                                }}>Vật phẩm: {item.product_name}</span>
                            </div>
                            <p style  = {{
                                marginTop: '35px',
                                marginLeft: '40px',
                                fontSize: '22px',
                                fontWeight: 'bold'
                            }}>Tổng tiền: {item.cast} VNĐ</p>
                            <img src = {rightArrow} style = {{
                                height: '20px',
                                width: '20px',
                                marginTop: '41px',
                                marginLeft: '72px',
                                borderRadius: '10px',
                            }}></img>
                        </button>
                    </div>
                );
            });
            return(
                <div style = {{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    height: '710px',
                    width: 'auto',
                    backgroundImage: `url(${background})`,
                    backgroundRepeat: 'none',
                    borderRadius: '10px',
                }}>
                    <ScrollView style = {{
                        width: '40%',
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
                {this.mainView()}
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