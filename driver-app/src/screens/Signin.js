import React, 
{
    Component,
} from "react";
import './css/signinStyle.css';
import {
    orangeColor,
    ipAddress
} from '../contants';
import {
    Link,
    Redirect
} from "react-router-dom";

const axios = require('axios');
const localStorage = require('local-storage');

class Sigin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleSignIn = this.handleSignIn.bind(this);
    }

    handleSignIn(event) {
        event.preventDefault();
        console.log(this.state.username)
        axios.post(`${ipAddress}/api/driver-signin/`, {
            username: this.state.username,
            password: this.state.password
        })
        .then(async (response) => {
            console.log(response);
            await localStorage.set('token', response.data.access_token);
            alert('OK');
            this.setState({
                username: '',
                password: ''
            });
            return <Redirect to="/" />;
        })
        .catch((error) => {
            alert('We have some errors!');
        });
    }

    render() {
        return(
            <div className = 'Container'>
                <div className = 'mainContent'>
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
                                fontSize: "20px"
                            }}>Tên đăng nhập</p>
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
                                fontSize: "20px"
                            }}>Mật khẩu</p>
                            <input type = 'password' className = 'inputStyle'
                                value = {this.state.password}
                                onChange = {(event) => {
                                    this.setState({
                                        password: event.target.value
                                    });
                                }}
                            ></input>
                        </div>
                        <input type = 'submit' value = 'Đăng nhập' className = 'submitSignInBtn'></input>
                    </form>
                    <div style = {{
                        display: "flex", 
                        flexDirection: "row",
                        justifyContent: "center",
                        justifyContent: "center",
                    }}>
                        <p>Bạn chưa có tài khoản ? 
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

export default Sigin;