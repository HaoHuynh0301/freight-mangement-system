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
    Redirect,
    Route,
    useHistory ,
    withRouter
} from "react-router-dom";
import App from '../App';
import Home from './Home';

const axios = require('axios');
const localStorage = require('local-storage');

class Sigin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isSigned: false
        }
        this.handleSignIn = this.handleSignIn.bind(this);
    }

    handleSignIn(event) {
        event.preventDefault();
        axios.post(`${ipAddress}/api/driver-signin/`, {
            username: this.state.username,
            password: this.state.password
        })
        .then(async (response) => {
            await localStorage.set('token', response.data.access_token);
            this.setState({
                username: '',
                password: '',
                isSigned: true
            });
        })
        .catch((error) => {
            this.setState({
                isSigned: false
            });
            alert('Tài khoản hoặc mật khẩu của bạn không đúng!');
        });
    }

    render() {
        if(this.state.isSigned === null) {
            return(
                <div>
                    Loading
                </div>
            );
        } else {
            if(this.state.isSigned === true) {
                return(
                    <Route exact to = '/'>
                        <Home isAuth = {true}/>
                    </Route>
                );
            } else {
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
    }
}

export default withRouter(Sigin);