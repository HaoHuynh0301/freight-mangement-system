import React, { Component } from "react";
import {
    fontSize
} from '../contants';
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
            age: 18
        }
    }

    render() {
        return(
            <div className = 'Container'>
                <div className = 'mainContent'>
                    <h1 style = {{marginBottom: '40px'}}>Đăng ký để trở thành tài xế</h1>
                    <form>
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
                                width: '150px',
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
                                width: '150px',
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
                                width: '150px',
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
                                width: '150px',
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
                                width: '150px',
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
                                width: '150px',
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
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;