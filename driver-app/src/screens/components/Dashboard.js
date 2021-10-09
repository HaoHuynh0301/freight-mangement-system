import React, { Component } from "react";
import '../css/dashBoardStyle.css';
import userLogo from '../../assets/user-icon.png';
import clockLogo from '../../assets/clock-icon.png';
import locationLogo from '../../assets/location-icon.png';
import {
    backgroundUserImage,
    orangeColor,
    orangeBlur,
    userIcon
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
                                <img src = {userLogo} style = {{
                                    marginLeft: '50px',
                                    height: '80px',
                                    width: '80px'
                                }}/>
                            </div>
                            <div style = {{
                                display: "flex",
                                flexDirection: "column",
                                marginTop: '10px',
                                border: '0.5px solid grey',
                                width: '99%',
                                borderRadius: '20px',
                                padding: '10px',
                            }}>
                                <p className = 'dashBoardTextStyle'>Bằng lái xe: AE12UDS</p>
                                <p className = 'dashBoardTextStyle'>Username: hao152903</p>
                            </div>
                        </div>
                    </div>
                    <div className = 'dashBoardLastRide'>
                        <div style = {{
                            display: 'flex',
                            flexDirection: 'row',
                        }}>
                            <p style = {{
                                fontSize: '25px',
                                fontWeight: 'bold'
                            }}>Chuyến xe cuối</p>
                        </div>
                        <div class = 'dashBoardLastRideItem'>
                            <img src = {clockLogo}  style = {{
                                height: '80px',
                                width: '80px',
                            }}></img>
                            <div className = 'dashBoardLastRideLocationWrapper'>
                                <p className = 'dashBoardTextStyle2'>10:19pm - 11:pm</p>
                                <img src = {locationLogo}></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;