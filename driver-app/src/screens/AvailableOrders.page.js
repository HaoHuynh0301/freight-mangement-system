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
import { 
    Button,
    Modal
} from 'react-bootstrap';
import background from '../assets/delivery-background.jpg';
import { ScrollView } from "@cantonjs/react-scroll-view";
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
            const item = this.state.avaiOrders.map((item, index) => {
                return(
                    <div key = {index}>
                        <button style = {{
                            border: 'solid 0.5px white',
                            width: '100%',
                            height: '120px',
                            borderRadius: '10px',
                            borderBottomWidth: '0.5px',
                            borderBottomColor: 'grey',
                            display: 'flex',
                            flexDirection: 'row'
                        }} onClick = {() => {
                            this.handleOpenOrder(item.id);
                        }}>
                            <div style = {{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                paddingTop: '10px'
                            }}>
                                <p style = {{
                                    marginLeft: '20px'
                                }}>Tên khách hàng: {item.customer_name}</p>
                                <p style = {{
                                    marginLeft: '28px'
                                }}>Số điện thoại: {item.customer_phonenumber}</p>
                                <p style = {{
                                    marginLeft: '5px'
                                }}>Vật phẩm: {item.product_name}</p>
                            </div>
                            <p style  = {{
                                marginTop: '40px',
                                marginLeft: '100px',
                                fontSize: '22px',
                                fontWeight: 'bold'
                            }}>Tổng tiền: {item.cast} VNĐ</p>
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
                    height: '520px',
                    width: 'auto',
                    backgroundImage: `url(${background})`,
                    backgroundRepeat: 'none'
                }}>
                    <ScrollView style = {{
                        width: '40%',
                        height: '90%'
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