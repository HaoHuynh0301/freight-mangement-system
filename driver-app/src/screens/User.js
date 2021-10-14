import React, { Component } from "react";
import './css/userPage.css';
import axios from "axios";
import {
    Link,
    Redirect,
    Route,
    useHistory 
} from "react-router-dom";
import {
    ipAddress,
    orangeColor
} from '../contants';
const localStorage = require('local-storage');

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            driverInformation: {},

            // User information input
            name: '',
            email: '',
            phonenumber: '',
            driverLicense: '',
            password: '',
            cmnd: ''
        }

        this.getDriverInformation  = this.getDriverInformation.bind(this);
        this.handleUpdateInformation = this.handleUpdateInformation.bind(this);
    }

    setDriverState = () => {
        this.setState({
            name: this.state.driverInformation.name,
            email: this.state.driverInformation.email,
            phone_number: this.state.driverInformation.phone_number,
            driverLicense: this.state.driverLicense.driverLicense,
            cmnd: this.state.driverInformation.cmnd
        })
    }

    getDriverInformation = () => {
        const token = localStorage.get('token');
        axios.get(`${ipAddress}/api/driver-view/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            this.setState({
                driverInformation: response.data
            });
        })
        .catch((error) => {
            alert('Đã có lỗi trong quá trình lấy thông tin! Vui lòng thử lại sau!');
        });
    }

    handleUpdateInformation = () => {
        const token = localStorage.get('token');
        console.log(token);
        axios.post(`${ipAddress}/api/update-driver/`, {
            name: this.state.name,
            phone_number: this.state.phonenumber,
            email: this.state.email,
            cmnd: this.state.cmnd,
            driverLicense: this.state.driverLicense,
            password: this.state.password
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            alert(response.data);
        })
        .catch((error) => {
            alert('Vui lòng nhập đủ thông tin!');
        })
    }
    
    componentDidMount() {
        this.getDriverInformation();
    }

    render() {
        return(
            <div style = {{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>

                {/* Title Wrapper */}
                <div style = {{
                    width: '40%',
                    // textAlign: 'center'
                }}>
                    <p style = {{
                        marginTop: '50px',
                        fontSize: '30px',
                        fontWeight: 'bold',
                        borderBottom: 'solid 1px',
                        paddingBottom: '20px'
                    }}>Thông tin cá nhân</p>
                </div>

                {/* User's information Wrapper */}
                <div style = {{
                    width: '40%',
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: '15px'
                }}>
                    
                    {/* Name Wrapper */}
                    <div style = {{
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: '20px'
                    }}>
                        <p style = {{fontWeight: 'bold'}}>Tên tài xế</p>
                        <input 
                            style = {{
                                borderRadius: '10px',
                                padding: '5px',
                                border: 'solid 0.5px grey',
                                backgroundColor: '#f5f5f0'
                            }} placeholder = {this.state.driverInformation.name} 
                            value = {this.state.name}
                            onChange = {(event) => {
                                this.setState({
                                    name: event.target.value
                                });
                            }}
                        ></input>
                    </div>
                    <div style = {{
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: '20px'
                    }}>
                        <p style = {{fontWeight: 'bold'}}>Email</p>
                        <input 
                            style = {{
                                borderRadius: '10px',
                                padding: '5px',
                                border: 'solid 0.5px grey',
                                backgroundColor: '#f5f5f0'
                            }} placeholder = {this.state.driverInformation.email} 
                            value = {this.state.email}
                            onChange = {(event) => {
                                this.setState({
                                    email: event.target.value
                                });
                            }}
                        ></input>
                    </div>
                    <div style = {{
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: '20px'
                    }}>
                        <p style = {{fontWeight: 'bold'}}>Số điện thoại</p>
                        <input 
                            style = {{
                                borderRadius: '10px',
                                padding: '5px',
                                border: 'solid 0.5px grey',
                                backgroundColor: '#f5f5f0'
                            }} placeholder = {this.state.driverInformation.phone_number} 
                            value = {this.state.phonenumber}
                            onChange = {(event) => {
                                this.setState({
                                    phonenumber: event.target.value
                                });
                            }}
                        ></input>
                    </div>
                    <div style = {{
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: '20px'
                    }}>
                        <p style = {{fontWeight: 'bold'}}>Bằng lái xe</p>
                        <input 
                            style = {{
                                borderRadius: '10px',
                                padding: '5px',
                                border: 'solid 0.5px grey',
                                backgroundColor: '#f5f5f0'
                            }} 
                            placeholder = {this.state.driverInformation.driverLicense} 
                            value = {this.state.driverLicense}
                            onChange = {(event) => {
                                this.setState({
                                    driverLicense: event.target.value
                                });
                            }}
                        ></input>
                    </div>
                    <div style = {{
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: '20px'
                    }}>
                        <p style = {{fontWeight: 'bold'}}>Chứng minh nhân dân</p>
                        <input 
                            style = {{
                                borderRadius: '10px',
                                padding: '5px',
                                border: 'solid 0.5px grey',
                                backgroundColor: '#f5f5f0'
                            }} 
                            placeholder = {this.state.driverInformation.cmnd} 
                            value = {this.state.cmnd}
                            onChange = {(event) => {
                                this.setState({
                                    cmnd: event.target.value
                                });
                            }}
                        ></input>
                    </div>
                    <div style = {{
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: '20px'
                    }}>
                        <p style = {{fontWeight: 'bold'}}>Mật khẩu</p>
                        <input 
                            type = 'password'
                            style = {{
                                borderRadius: '10px',
                                padding: '5px',
                                border: 'solid 0.5px grey',
                                backgroundColor: '#f5f5f0'
                            }} 
                            value = {this.state.password}
                            onChange = {(event) => {
                                this.setState({
                                    password: event.target.value
                                });
                            }}
                        ></input>
                    </div>
                    <button 
                        style = {{
                            borderRadius: '10px',
                            border: 'solid 0.2px',
                            backgroundColor: orangeColor,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            paddingTop: '5px'
                        }}
                        onClick = {this.handleUpdateInformation}
                    >
                        <p style = {{
                            fontSize: '20px',
                            fontWeight: 'bold'
                        }}>Lưu thông tin</p>
                    </button>
                </div>
            </div>
        );
    }
}

export default User;