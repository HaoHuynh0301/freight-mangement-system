import React from "react";

class MyOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalUrOrders: 0
        }
    }

    render() {
        return(
            <div>
                <div style = {{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: '20px',
                    marginLeft: '320px'
                }}>
                    <div className = 'yourOrderWrapper'>
                        <p className = 'titleStyle'>ĐƠN HÀNG CỦA BẠN</p>
                        <p>Tổng số đơn hàng hiện tại của bạn: {this.state.totalUrOrders}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default MyOrders;