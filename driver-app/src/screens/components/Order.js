import React from "react";

class Orders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
    }

    render() {
        if(this.state.orders.length != 0) {
            return(
                <div>
                    Not Empty
                </div>
            );
        } else {
            return(
                <div>
                    Is Empty
                </div>
            );
        }
    }
}

export default Orders;