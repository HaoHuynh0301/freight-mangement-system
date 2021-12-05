import React, { Component } from "react";
import auth from "../auth";
import {
    orangeColor,
    ipAddress
} from '../contants';
import './css/signinStyle.css';
import {
    Link,
} from "react-router-dom";
import background from '../assets/delivery.jpg';
const axios = require('axios');
const localStorage = require('local-storage');

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
        this.handleSignIn = this.handleSignIn.bind(this);
    }

    handleSignIn(event) {
        event.preventDefault();
        console.log('OK')
        axios.post(`${ipAddress}/api/driver-signin/`, {
            username: this.state.username,
            password: this.state.password
        })
        .then(async (response) => {
            await localStorage.set('token', response.data.access_token);
            auth.login(() => {
                this.props.history.push('/');
            })
            this.setState({
                username: '',
                password: '',
            });
        })
        .catch((error) => {
            alert('Tài khoản hoặc mật khẩu của bạn không đúng!');
        });
    }

    render() {
        return(
            <div style = {{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: 'auto',
                backgroundImage: `url(${background})`
            }}>
                <div className = 'mainContent animate__animated animate__fadeInDown'>
                    <div className  = 'signInTitleWrapper'>
                        <h1>Đăng nhập</h1>
                    </div>
                    <form onSubmit = {this.handleSignIn}>
                        <div class = 'inputWrapper'>
                            <p style = {{
                                display: "flex",
                                flexDirection: "row",
                                alignSelf: "flex-start",
                                marginLeft: "12px",
                                fontSize: "18px",
                                fontWeight: 'bold'
                            }}>Tên đăng nhập *</p>
                            <input type = 'text' className = 'inputStyle' 
                                value = {this.state.username}
                                onChange = {(event) => {
                                    this.setState({
                                        username: event.target.value
                                    });
                                }}
                            ></input>
                        </div>
                        <div class = 'inputWrapper'>
                            <p style = {{
                                display: "flex",
                                flexDirection: "row",
                                alignSelf: "flex-start",
                                marginLeft: "12px",
                                fontSize: "18px",
                                fontWeight: 'bold'
                            }}>Mật khẩu *</p>
                            <input type = 'password' className = 'inputStyle'
                                value = {this.state.password}
                                onChange = {(event) => {
                                    this.setState({
                                        password: event.target.value
                                    });
                                }}
                            ></input>
                        </div>
                        <input type = 'submit' value = 'Đăng nhập' style = {{
                                marginTop: '20px',
                                height: '40px',
                                width: '100%',
                                backgroundColor: '#ff7733',
                                fontSize: '18px',
                                fontWeight: 'bold',
                                borderRadius: '30px',
                                borderWidth: '0px',
                                marginBottom: '20px',
                                // marginLeft: '20px'
                        }}></input>
                    </form>
                    <div style = {{
                        display: "flex", 
                        flexDirection: "row",
                        justifyContent: "center",
                        justifyContent: "center",
                    }}>
                        <p style = {{
                            fontWeight: 'bold'
                        }}>Bạn chưa có tài khoản ? 
                            <Link
                                to = '/register'
                                style = {{
                                    color: orangeColor,
                                    marginLeft: 10
                                }}
                            >Đăng ký ngay bây giờ</Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default LandingPage;