import React, { Component } from "react";
import '../css/dashBoardStyle.css';
import {
    backgroundUserImage,
    orangeColor,
    orangeBlur
} from '../../contants';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div className = 'dashBoardContainer'>
                <div className = 'dashBoardCol1'>
                    <div className = 'dashBoardUser'>
                        <div style = {{
                            marginTop: '20px',
                            marginLeft: '10px',
                            marginRight: '10px',
                            marginBottom: '20px',
                            height: '90%',
                            width: '90%',
                            borderColor: "black",
                            borderRadius: '30px',
                            backgroundColor: 'rgba(0,0,0, 0.4)',
                            display: "flex",
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            padding: '20px',
                            
                        }}>
                            <p className = 'dashBoardTextStyle'>Thông tin tài xế</p>
                            <div style = {{
                                display: 'flex',
                                flexDirection: 'row',
                                border: '0.5px solid grey',
                                padding: '10px',
                                width: '99%',
                                borderRadius: '20px'
                            }}>
                                <div style = {{
                                    display: "flex",
                                    flexDirection: 'column'
                                }}>
                                    <p className = 'dashBoardTextStyle'>Huynh Quan Nhat Hao</p>
                                    <p className = 'dashBoardTextStyle'>0932843656</p>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;