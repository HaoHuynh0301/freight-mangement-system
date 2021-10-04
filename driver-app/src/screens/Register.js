import React, { Component } from "react";
import {
    fontSize,
    orangeColor
} from '../contants';
import {
    Link
} from "react-router-dom";
import './css/registerStyle.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {

            // driver information
            name: '',
            phoneNumber: '',
            email: '',
            cmnd: '',
            driverLicense: '',
            age: 18,
            username: '',
            pass1: '',
            pass2: ''
        }
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleRegister(event) {
        console.log('Register');
        event.preventDefault();
    }

    render() {
        return(
            <div className = 'Container'>
                <div className = 'mainContent'>
                    <h1 style = {{marginBottom: '40px'}}>Đăng ký để trở thành tài xế</h1>
                    <form onSubmit = {this.handleRegister}>
                        <div style = {{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            marginBottom: '10px'
                        }}>
                            <div style = {{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                width: '180px',
                                fontSize: fontSize,
                            }}>
                                Họ và tên
                            </div>
                            <input
                                className = 'inputType'
                                value = {this.state.name}
                                onChange = {(event) => {
                                    this.setState({
                                        name: event.target.value
                                    });
                                }}
                            ></input>
                        </div>
                        <div style = {{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            marginBottom: '10px'
                        }}>
                            <div style = {{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                width: '180px',
                                fontSize: fontSize
                            }}>
                                Số điện thoại
                            </div>
                            <input
                                className = 'inputType'
                                value = {this.state.phoneNumber}
                                onChange = {(event) => {
                                    this.setState({
                                        phoneNumber: event.target.value
                                    });
                                }}
                            ></input>
                        </div>
                        <div style = {{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            marginBottom: '10px'
                        }}>
                            <div style = {{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                width: '180px',
                                fontSize: fontSize
                            }}>
                                Email
                            </div>
                            <input
                                className = 'inputType'
                                value = {this.state.email}
                                onChange = {(event) => {
                                    this.setState({
                                        email: event.target.value
                                    });
                                }}
                            ></input>
                        </div>
                        <div style = {{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            marginBottom: '10px'
                        }}>
                            <div style = {{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                width: '180px',
                                fontSize: fontSize
                            }}>
                                CMND/Hộ chiếu
                            </div>
                            <input
                                className = 'inputType'
                                value = {this.state.cmnd}
                                onChange = {(event) => {
                                    this.setState({
                                        cmnd: event.target.value
                                    });
                                }}
                            ></input>
                        </div>
                        <div style = {{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            marginBottom: '10px'
                        }}>
                            <div style = {{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                width: '180px',
                                fontSize: fontSize
                            }}>
                                Tuổi
                            </div>
                            <input
                                className = 'inputType'
                                value = {this.state.age}
                                onChange = {(event) => {
                                    this.setState({
                                        age: event.target.value
                                    });
                                }}
                            ></input>
                        </div>
                        <div style = {{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            marginBottom: '10px'
                        }}>
                            <div style = {{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                width: '180px',
                                fontSize: fontSize
                            }}>
                                Bằng lái xe
                            </div>
                            <input
                                className = 'inputType'
                                value = {this.state.driverLicense}
                                onChange = {(event) => {
                                    this.setState({
                                        driverLicense: event.target.value
                                    });
                                }}
                            ></input>
                        </div>
                        <div style = {{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            marginBottom: '10px'
                        }}>
                            <div style = {{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                width: '180px',
                                fontSize: fontSize
                            }}>
                                Tên đăng nhập
                            </div>
                            <input
                                className = 'inputType'
                                value = {this.state.username}
                                onChange = {(event) => {
                                    this.setState({
                                        username: event.target.value
                                    });
                                }}
                            ></input>
                        </div>   
                        <div style = {{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            marginBottom: '10px'
                        }}>
                            <div style = {{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                width: '180px',
                                fontSize: fontSize
                            }}>
                                Mật khẩu
                            </div>
                            <input
                                className = 'inputType'
                                value = {this.state.pass1}
                                onChange = {(event) => {
                                    this.setState({
                                        pass1: event.target.value
                                    });
                                }}
                            ></input>
                        </div>   
                        <div style = {{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            marginBottom: '10px'
                        }}>
                            <div style = {{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                width: '180px',
                                fontSize: fontSize
                            }}>
                                Xác nhận mật khẩu
                            </div>
                            <input
                                className = 'inputType'
                                value = {this.state.pass2}
                                onChange = {(event) => {
                                    this.setState({
                                        pass2: event.target.value
                                    });
                                }}
                            ></input>
                        </div>
                        <input className = 'submitBtn' type = 'submit' value = 'Đăng ký'></input>
                    </form>
                    <div style = {{
                        display: "flex", 
                        flexDirection: "row",
                        justifyContent: "center",
                        justifyContent: "center"
                    }}>
                        <p>Bạn chưa đã tài khoản ? 
                            <Link
                                to = '/sign-in'
                                style = {{
                                    color: orangeColor,
                                    marginLeft: 10
                                }}
                            >Bắt đầu giao hàng ngay bây giờ</Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;