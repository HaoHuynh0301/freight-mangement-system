import React, { Component } from "react";
import './css/homeStyle.css';
import {
    backgroundImage,
    orangeColor
} from '../contants';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div style = {{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: orangeColor,
            }}>
                <div style = {{
                    width: '80%'
                }}>
                    
                </div>
            </div>
        );
    }
}

export default Home;