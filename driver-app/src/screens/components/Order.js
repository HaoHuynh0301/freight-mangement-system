import React from "react";

class Orders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
    }

    componentDidMount() {
        console.log(this.props.match);
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
                </div>
            );
        }
    }
}

export default Orders;