import React, 
{
    Component
} from "react";
import './css/signinStyle.css';
import {
    orangeColor
} from '../contants';

class Sigin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    render() {
        return(
            <div className = 'Container'>
                <div className = 'mainContent'>
                    <h1>Đăng nhập</h1>
                    <form>
                        <div class = 'inputWrapper'>
                            <h2 style = {{marginRight: 42}}>Email</h2>
                            <input type = 'text' className = 'inputStyle' 
                                value = {this.state.email}
                                onChange = {(event) => {
                                    this.setState({
                                        email: event.target.value
                                    });
                                }}
                            ></input>
                        </div>
                        <div class = 'inputWrapper'>
                            <h2>Mật khẩu</h2>
                            <input type = 'password' className = 'inputStyle'
                                value = {this.state.password}
                                onChange = {(event) => {
                                    this.setState({
                                        password: event.target.value
                                    });
                                }}
                            ></input>
                        </div>
                        <input type = 'submit' value = 'Đăng nhập' className = 'submitBtn'></input>
                    </form>
                    <div style = {{
                        display: "flex", 
                        flexDirection: "row",
                        justifyContent: "center",
                        justifyContent: "center"
                    }}>
                        <p>Bạn chưa có tài khoản ? <a style = {{
                            color: orangeColor
                        }}>Đăng ký ngay bây giờ</a></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sigin;