import React, { Component }  from "react";
import {
    fontSize,
    orangeColor
} from '../contants';
import background from '../assets/delivery.jpg';
import {
    Link
} from 'react-router-dom';
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
        event.preventDefault();
        console.log('Register');
    }

    render() {
        return(
            <div style = {{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: '1100px',
                width: 'auto',
                backgroundImage: `url(${background})`
            }}>
                <div className = 'mainContent animate__animated animate__fadeInDown' style = {{
                    height: '95%',
                    width: '40%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white'
                }}>
                    <h1 style = {{
                        alignSelf: 'flex-start',
                        marginTop : '30px',
                        marginLeft: '70px',
                        marginBottom: '30px'
                    }}
                    >Đăng ký</h1>
                    <form onSubmit = {this.handleRegister}>
                        <div className = 'inputWrapper' >
                            <div style = {{
                                display: "flex",
                                flexDirection: "row",
                                alignSelf: "flex-start",
                                marginLeft: "12px",
                                fontSize: "18px",
                                fontWeight: 'bold'
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
                        <div className = 'inputWrapper' >
                            <div style = {{
                                display: "flex",
                                flexDirection: "row",
                                alignSelf: "flex-start",
                                marginLeft: "12px",
                                fontSize: "18px",
                                fontWeight: 'bold'
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
                        <div className = 'inputWrapper' >
                            <div style = {{
                                display: "flex",
                                flexDirection: "row",
                                alignSelf: "flex-start",
                                marginLeft: "12px",
                                fontSize: "18px",
                                fontWeight: 'bold'
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
                        <div className = 'inputWrapper' >
                            <div style = {{
                                display: "flex",
                                flexDirection: "row",
                                alignSelf: "flex-start",
                                marginLeft: "12px",
                                fontSize: "18px",
                                fontWeight: 'bold'
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
                        <div className = 'inputWrapper' >
                            <div style = {{
                                display: "flex",
                                flexDirection: "row",
                                alignSelf: "flex-start",
                                marginLeft: "12px",
                                fontSize: "18px",
                                fontWeight: 'bold'
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
                        <div className = 'inputWrapper' >
                            <div style = {{
                                display: "flex",
                                flexDirection: "row",
                                alignSelf: "flex-start",
                                marginLeft: "12px",
                                fontSize: "18px",
                                fontWeight: 'bold'
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
                        <div className = 'inputWrapper' >
                            <div style = {{
                                display: "flex",
                                flexDirection: "row",
                                alignSelf: "flex-start",
                                marginLeft: "12px",
                                fontSize: "18px",
                                fontWeight: 'bold'
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
                        <div className = 'inputWrapper' >
                            <div style = {{
                                display: "flex",
                                flexDirection: "row",
                                alignSelf: "flex-start",
                                marginLeft: "12px",
                                fontSize: "18px",
                                fontWeight: 'bold'
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
                        <div className = 'inputWrapper' >
                            <div style = {{
                                display: "flex",
                                flexDirection: "row",
                                alignSelf: "flex-start",
                                marginLeft: "12px",
                                fontSize: "18px",
                                fontWeight: 'bold'
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
                        <input style = {{
                            arginTop: '20px',
                            height: '40px',
                            width: '100%',
                            backgroundColor: '#ff7733',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            borderRadius: '30px',
                            borderWidth: '0px',
                            marginBottom: '20px',
                            marginTop: '20px'
                        }} type = 'submit' value = 'Đăng ký'></input>
                    </form>
                    <div style = {{
                        display: "flex", 
                        flexDirection: "row",
                        justifyContent: "center",
                        justifyContent: "center",
                        fontWeight: 'bold',
                    }}>
                        <p>Bạn đã có tài khoản ? 
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