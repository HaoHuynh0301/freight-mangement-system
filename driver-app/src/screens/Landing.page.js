import React, { Component } from "react";
import Auth from "../auth";

class LandingPage extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <div>
                Landing Page
                <button onClick = {() => {
                    this.props.history.push('/app');
                }}>Login</button>
                <button onClick = {() => {
                    
                }}>Logout</button>
            </div>
        );
    }
}

export default LandingPage;