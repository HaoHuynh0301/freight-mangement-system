import React, { Component } from "react";
import '../css/dashBoardStyle.css';
import userLogo from '../../assets/user-icon.png';
import clockLogo from '../../assets/clock-icon.png';
import locationLogo from '../../assets/location-icon.png';
import {
    backgroundUserImage,
    orangeColor,
    orangeBlur,
    userIcon,
    greyColor
} from '../../contants';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastRides: [
                '1'
            ],
            instanceOrders: ['1'],
            requests: ['1'],
            avaiOrders: ['1']
        }
    }

    componentDidMount() {

    }

    // Hàm xử lý sự kiện xử lý request của khách hàng
    handleRequest = () => {
        console.log('Handle');
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

    // Màn hình hiển thị khi tồn tại danh sách last ride
    instanceOrderRequets = () => {
        if(this.state.requests.length > 0) {
            return(
                <div className = 'dashBoardInstanceOrderRequestWrapper'>

                    {/* Title Wrapper */}
                    <div style = {{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}>
                        <div style = {{
                            height: '42px',
                            widows: '42px',
                            border: 'solid 0.5px grey',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyItems: 'center',
                            borderRadius: '40px',
                            padding: '1px',
                            marginRight: '20px'
                        }}>
                            <img src = {userLogo} style = {{
                                height: '40px',
                                width: '40px',
                            }}></img>
                        </div>
                        <p 
                            style = {{
                                alignSelf: 'center',
                                fontWeight: 'bold',
                                fontSize: '20px'
                            }}
                        >
                            Hao152903
                        </p>
                    </div>

                    {/* Request Items Wrapper */}
                    <div className = 'dashBoardInstanceOrderRequestItemsWrapper'>

                        {/* Item request wrapper */}
                        <div style = {{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: '20px'
                        }}>
                            {/* Phần hiển thị thời gian của request */}
                            <p className = 'requestTimeFontStyle'>9:32pm</p>
                            <div className = 'requestMsgWrapper'>
                                <p className = 'requestMsgFontStyle'>Giao hàng</p>
                            </div>
                        </div>
                        <div style = {{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: '20px'
                        }}>
                            {/* Phần hiển thị thời gian của request */}
                            <p className = 'requestTimeFontStyle'>9:32pm</p>
                            <div className = 'requestMsgWrapper'>
                                <p className = 'requestMsgFontStyle'>Giao hàng</p>
                            </div>
                        </div>
                    </div>

                    <button style = {{
                        backgroundColor: orangeColor,
                        borderRadius: '15px',
                        height: '40px',
                        border: 'solid 0.5px grey',
                        fontWeight: 'bold'
                    }}
                        onClick = {this.handleRequest}
                    >Xử lý</button>
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

    // Màn hình hiển thị danh sách các đơn hàng hiện có
    availableOrder = () => {
        if(this.state.avaiOrders.length > 0) {
            return(
                <div className = 'dashBoardAvaiOrdersWrapper'>
                    <p style = {{
                        fontSize: '20px',
                        fontWeight: 'bold',
                    }}>Đơn hàng hiện có</p>
                    <div className = 'dashBoardAvaiOrdersItem'>
                        <img src = {userLogo} style = {{
                            height: '40px',
                            width: '40px'
                        }}></img>
                        <div className = 'dashBoardAvaiOrdersItemInforWrapper'>
                            <p>Extra Fast</p>
                            <p style = {{
                                color: 'grey'
                            }}>Huynh Quan Nhat Hao</p>
                        </div>
                        <p>- 25000VND</p>
                    </div>
                    <div className = 'dashBoardAvaiOrdersItem'>
                        <img src = {userLogo} style = {{
                            height: '40px',
                            width: '40px'
                        }}></img>
                        <div className = 'dashBoardAvaiOrdersItemInforWrapper'>
                            <p>Extra Fast</p>
                            <p style = {{
                                color: 'grey'
                            }}>Huynh Quan Nhat Hao</p>
                        </div>
                        <p>- 25000VND</p>
                    </div>
                </div>
            );
        } else {
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
                                <p style = {{
                                    color: '#FFF',
                                    fontWeight: 'bold'
                                }}>Thông tin tài xế</p>
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
                                marginBottom: '5px',
                                
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

                    {/* Cột thứ ba */}
                    <div className = 'dashBoardCol1'>
                        {this.availableOrder()}
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