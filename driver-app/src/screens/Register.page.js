import React, { Component }  from "react";

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
    }

    render() {
        return(
            <div>

            </div>
        );
    }
}

export default Register;