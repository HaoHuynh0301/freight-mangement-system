import React, { Component } from "react";
import './css/userPage.css';
import axios from "axios";
import {
    ipAddress,
    orangeColor,
    blueColor
} from '../contants';
import {
    DoubleNavigationPage,
    Footer
} from '../components';
import accountIcon from '../assets/accountIcon.png';
const localStorage = require('local-storage');

class Profile extends Component {
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
            cmnd: '',
            avaLink: null,
            img: null
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
            console.log(response.data);
            this.setState({
                driverInformation: response.data
            });
            if(response.data.avatar !== null) {
                this.setState({
                    avaLink: `${ipAddress}${response.data.avatar}`
                });
            } else {
                this.setState({
                    avaLink: accountIcon
                });
            }
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
                backgroundColor: '#f2f2f2'
            }}>
                <DoubleNavigationPage />
                <div style = {{
                    display: 'flex',
                    alignSelf: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '30px',
                    width: '60%',
                    border: 'solid 0.5px #e6e6e6',
                    marginLeft: '300px',
                    marginTop: '20px',
                    paddingBottom: '20px',
                    backgroundColor: 'white',
                    boxShadow: '0px 0px 5px 2px #e6e6e6'
                }}>
                    {/* Title Wrapper */}
                    <div style = {{
                        width: '100%',
                        // textAlign: 'center',
                    }}>
                        <p style = {{
                            paddingTop: '20px',
                            fontSize: '30px',
                            fontWeight: 'bold',
                            borderBottom: 'solid 1px #e6e6e6',
                            paddingBottom: '20px',
                            paddingLeft: '80px',
                            backgroundColor: '#d9d9d9',
                            borderBottomWidth: '0.5px'
                        }}>Thông tin người dùng</p>
                    </div>

                    <div style = {{
                        height: '20%',
                        display: 'flex',
                        flexDirection: 'row',
                        paddingTop: '20px',
                        paddingLeft: '20px',
                        borderBottom: 'solid 0.5px #e6e6e6',
                        paddingBottom: '20px',
                        alignItems: 'center',
                        width: '80%'
                    }}>
                        <div style = {{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}>
                            <span style = {{
                                fontWeight: 'bold',
                                color: blueColor,
                                marginBottom: '10px'
                            }}>Tải ảnh đại diện</span>
                            <img src = {this.state.avaLink} style = {{
                                height: '70px',
                                width: '70px',
                                borderRadius: '50px',
                                marginLeft: '20px'
                            }} />
                        </div>
                        <div style = {{
                            marginLeft: '80px'
                        }}>
                            <span>
                                Tải ảnh lên từ 
                                <input style = {{
                                    borderWidth: '0px',
                                    marginLeft: '5px',
                                }} type="file" onChange = {(event) => {
                                    this.setState({
                                        img: event.target.files[0]
                                    });
                                }}></input>
                            </span>
                            <button style = {{
                                border: 'solid 0.5px grey',
                                padding: '15px',
                                borderRadius: '20px',
                                backgroundColor: blueColor,
                                color: 'white',
                                height: '30px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                marginTop: '5px',
                            }} onClick = {() => this.handleChangeInformation()}>Cập nhật</button>
                        </div>
                    </div>

                    {/* User's information Wrapper */}
                    <div style = {{
                        width: '80%',
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
                            <p style = {{fontWeight: 'bold'}}>Tên tài xế *</p>
                            <input 
                                style = {{
                                    borderRadius: '5px',
                                    padding: '5px',
                                    border: 'solid 0.5px grey',
                                    backgroundColor: 'white',
                                    height: '30px',
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
                            <p style = {{fontWeight: 'bold'}}>Email *</p>
                            <input 
                                style = {{
                                    borderRadius: '5px',
                                    padding: '5px',
                                    border: 'solid 0.5px grey',
                                    backgroundColor: 'white',
                                    height: '30px',
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
                            <p style = {{fontWeight: 'bold'}}>Số điện thoại *</p>
                            <input 
                                style = {{
                                    borderRadius: '5px',
                                    padding: '5px',
                                    border: 'solid 0.5px grey',
                                    backgroundColor: 'white',
                                    height: '30px',
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
                            <p style = {{fontWeight: 'bold'}}>Bằng lái xe *</p>
                            <input 
                                style = {{
                                    borderRadius: '5px',
                                    padding: '5px',
                                    border: 'solid 0.5px grey',
                                    backgroundColor: 'white',
                                    height: '30px',
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
                            <p style = {{fontWeight: 'bold'}}>Chứng minh nhân dân *</p>
                            <input 
                                style = {{
                                    borderRadius: '5px',
                                    padding: '5px',
                                    border: 'solid 0.5px grey',
                                    backgroundColor: 'white',
                                    height: '30px',
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
                            <p style = {{fontWeight: 'bold'}}>Mật khẩu *</p>
                            <input 
                                type = 'password'
                                style = {{
                                    borderRadius: '5px',
                                    padding: '5px',
                                    border: 'solid 0.5px grey',
                                    backgroundColor: 'white',
                                    height: '30px',
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
                                borderRadius: '30px',
                                borderWidth: '0px',
                                backgroundColor: blueColor,
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                paddingTop: '5px',
                                alignItems: 'center',
                                height: '40px',
                                marginTop: '15px'
                            }}
                            onClick = {this.handleUpdateInformation}
                        >
                            <span style = {{
                                fontSize: '20px',
                                // fontWeight: 'bold'
                                color: 'white'
                            }}>Lưu thông tin</span>
                        </button>
                    </div>
                </div>
                <Footer />  
            </div>
        );
    }
}

export default Profile;