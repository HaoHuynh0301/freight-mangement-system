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
            lastRides: [
                '1'
            ],
            instanceOrders: ['1'],
            requests: ['1']
        }
    }

    componentDidMount() {

    }

    // Màn hình hiển thị khi danh sách last ride rỗng
    emptyLastRides = () => {
        return(
            <div style = {{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                Không tồn tại chuyến xe
            </div>
        );
    }

    // Màn hình hiển thị chuyến xe hiện tại
    instanceOrder = () => {
        if(this.state.instanceOrders.length > 0) {
            return(
                <div className = 'dashBoardInstanceOrderWrapper'>
                    
                </div>
            );
        } else {
            // Hiển thị khi không có đơn hàng nào hiện đang giao
            return(
                <div style = {{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    Không có đơn hàng nào
                </div>
            );
        }
    }

    // 

    // Màn hình hiển thị khi tồn tại danh sách last ride
    instanceOrderRequets = () => {
        if(this.state.requests.length > 0) {
            return(
                <div className = 'dashBoardInstanceOrderRequestWrapper'>
                    <p>Hello</p>
                </div>
            );
        } else {
            <div style = {{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                Không có yêu cầu nào
            </div>
        }
    }


    render() {
        if(this.state.lastRides.length > 0) {
            return(
                <div className = 'dashBoardContainer'>

                    {/* Cột thứ nhất */}
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
                                marginBottom: '5px'
                            }}>
                                <p style = {{
                                    fontSize: '25px',
                                    fontWeight: 'bold'
                                }}>Chuyến xe cuối</p>
                            </div>
                            <div class = 'dashBoardLastRideItem'>
                                {/* Danh sách vận chuyển của đơn hàng cuối cùng */}
                                <div style = {{
                                    height: '63px',
                                    width: '63px',
                                    border: '0.5px solid grey',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    marginBottom: '10px'
                                }}>
                                    <img src = {clockLogo}  style = {{
                                        height: '60px',
                                        width: '60px',
                                    }}></img>
                                </div>
                                <div style = {{
                                    marginLeft: '30px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    padding: '0'
                                }}>
                                    <p className = 'dashBoardTextStyle2'>10:19pm - 11:pm</p>
                                    <p>
                                        <img src = {locationLogo} height = '30px' width = '30px' style = {{marginRight: '10px'}}></img>
                                        Số 59/31, quận Ô Môn
                                    </p>
                                </div>
                            </div>
                            <div class = 'dashBoardLastRideItem'>
                                {/* Danh sách vận chuyển của đơn hàng cuối cùng */}
                                <div style = {{
                                    height: '63px',
                                    width: '63px',
                                    border: '0.5px solid grey',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    marginBottom: '10px'
                                }}>
                                    <img src = {clockLogo}  style = {{
                                        height: '60px',
                                        width: '60px',
                                    }}></img>
                                </div>
                                <div style = {{
                                    marginLeft: '30px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    padding: '0'
                                }}>
                                    <p className = 'dashBoardTextStyle2'>10:19pm - 11:pm</p>
                                    <p>
                                        <img src = {locationLogo} height = '30px' width = '30px' style = {{marginRight: '10px'}}></img>
                                        Số 59/31, quận Ô Môn
                                    </p>
                                </div> 
                            </div>
                            <div class = 'dashBoardLastRideItem'>
                                {/* Danh sách vận chuyển của đơn hàng cuối cùng */}
                                <div style = {{
                                    height: '63px',
                                    width: '63px',
                                    border: '0.5px solid grey',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    marginBottom: '10px'
                                }}>
                                    <img src = {clockLogo}  style = {{
                                        height: '60px',
                                        width: '60px',
                                    }}></img>
                                </div>
                                <div style = {{
                                    marginLeft: '30px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    padding: '0'
                                }}>
                                    <p className = 'dashBoardTextStyle2'>10:19pm - 11:pm</p>
                                    <p>
                                        <img src = {locationLogo} height = '30px' width = '30px' style = {{marginRight: '10px'}}></img>
                                        Số 59/31, quận Ô Môn
                                    </p>
                                </div>   
                            </div>
                        </div>
                        
                    </div>

                    {/* Cột thứ hai */}
                    <div className = 'dashBoardCol1'>
                        {this.instanceOrder()}
                        {this.instanceOrderRequets()}
                    </div>
                </div>
            );
        } else {
            return(
                this.emptyLastRides()
            );
        }
        
    }
}

export default Dashboard;