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
    ipAddress
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
            driverLicense: ''
        }

        this.getDriverInformation  = this.getDriverInformation.bind(this);
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
            alert('Error!');
        });
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
                            }} placeholder = {this.state.driverInformation.driverLicense} 
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
                        <p style = {{fontWeight: 'bold'}}>Mật khẩu</p>
                        <input 
                            type = 'password'
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
                    <button>
                        <p>Lưu thông tin</p>
                    </button>
                </div>
            </div>
        );
    }
}

export default User;