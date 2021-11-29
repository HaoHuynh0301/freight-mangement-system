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
        if (this.state.img === null) {
            const token = localStorage.get('token');
            let form_data = new FormData();
            form_data.append('name', this.state.name);
            form_data.append('phone_number', this.state.phonenumber);
            form_data.append('email', this.state.email);
            form_data.append('cmnd', this.state.cmnd);
            form_data.append('driverLicense', this.state.driverLicense);
            form_data.append('password', this.state.password);
            axios.post(`${ipAddress}/api/update-driver/`, form_data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                alert(response.data);
            })
            .catch((error) => {
                alert('Đã có lỗi xảy ra trong quá trình cập nhật thông tin!');
            })
        } else {

        }
        
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
                    width: '53%',
                    border: 'solid 0.5px #e6e6e6',
                    marginLeft: '380px',
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
                            fontSize: '20px',
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
                        // paddingLeft: '20px',
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
                            <span style = {{
                                fontStyle: 'italic'
                            }}>
                                Tải ảnh lên từ 
                                <input style = {{
                                    borderWidth: '0px',
                                    marginLeft: '5px',
                                    width: '100px'
                                }} type="file" onChange = {(event) => {
                                    this.setState({
                                        img: event.target.files[0]
                                    });
                                }}></input>
                                Chấp nhận GIF, JPEG, PNG, BMP với kích thước tối đa 5.0 MB
                            </span>
                            <button style = {{
                                border: 'solid 0.5px grey',
                                padding: '15px',
                                borderRadius: '10px',
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
                        marginTop: '32px'
                    }}>
                        <span style = {{
                            fontWeight: 'bold',
                            color: blueColor,
                            marginBottom: '10px'
                        }}>Thay đổi thông tin</span>
                    
                        {/* Name Wrapper */}
                        <div style = {{
                            display: 'flex',
                            flexDirection: 'row',
                            marginBottom: '20px',
                        }}>
                            <p style = {{fontWeight: 'bold', marginRight: '20px', width: '120px'}}>Tên tài xế *</p>
                            <input 
                                style = {{
                                    borderRadius: '5px',
                                    padding: '5px',
                                    border: 'solid 0.5px grey',
                                    backgroundColor: 'white',
                                    height: '30px',
                                    width: '60%'
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
                            marginBottom: '20px',
                            flexDirection: 'row',
                        }}>
                            <p style = {{fontWeight: 'bold', marginRight: '20px', width: '120px'}}>Email *</p>
                            <input 
                                style = {{
                                    borderRadius: '5px',
                                    padding: '5px',
                                    border: 'solid 0.5px grey',
                                    backgroundColor: 'white',
                                    height: '30px',
                                    width: '60%'
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
                            marginBottom: '20px',
                            flexDirection: 'row',
                        }}>
                            <p style = {{fontWeight: 'bold', marginRight: '20px', width: '120px'}}>Số điện thoại *</p>
                            <input 
                                style = {{
                                    borderRadius: '5px',
                                    padding: '5px',
                                    border: 'solid 0.5px grey',
                                    backgroundColor: 'white',
                                    height: '30px',
                                    width: '60%'
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
                            marginBottom: '20px',
                            flexDirection: 'row',
                        }}>
                            <p style = {{fontWeight: 'bold', marginRight: '20px', width: '120px'}}>Bằng lái xe *</p>
                            <input 
                                style = {{
                                    borderRadius: '5px',
                                    padding: '5px',
                                    border: 'solid 0.5px grey',
                                    backgroundColor: 'white',
                                    height: '30px',
                                    width: '60%'
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
                            marginBottom: '20px',
                            flexDirection: 'row',
                        }}>
                            <p style = {{fontWeight: 'bold', marginRight: '20px', width: '120px'}}>Chứng minh nhân dân *</p>
                            <input 
                                style = {{
                                    borderRadius: '5px',
                                    padding: '5px',
                                    border: 'solid 0.5px grey',
                                    backgroundColor: 'white',
                                    height: '30px',
                                    width: '60%'
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
                            marginBottom: '20px',
                            flexDirection: 'row',
                        }}>
                            <p style = {{fontWeight: 'bold', marginRight: '20px', width: '120px'}}>Mật khẩu *</p>
                            <input 
                                type = 'password'
                                style = {{
                                    borderRadius: '5px',
                                    padding: '5px',
                                    border: 'solid 0.5px grey',
                                    backgroundColor: 'white',
                                    height: '30px',
                                    width: '60%'
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
                                backgroundColor: blueColor,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '35px',
                                width: '30%',
                                border: 'solid 0.5px grey',
                            }}
                            onClick = {this.handleUpdateInformation}
                        >
                            <span style = {{
                                fontSize: '20px',
                                // fontWeight: 'bold'
                                color: 'white',
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