import React, { Component } from "react";
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
            driverInformation: {}
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
                    width: '60%',
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
                    width: '60%',
                }}>

                </div>
            </div>
        );
    }
}

export default User;