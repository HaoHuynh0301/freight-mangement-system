import { extend } from "leaflet";
import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

class MyOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.fetchTask = this.fetchTask.bind(this);
    }

    fetchTask = () => {
        // console.log(this.props.match.params.id);
    }

    getOrderInformation = () => {
        
    }

    componentDidMount() {
        this.fetchTask();
    }

    renderOrderInformation = () => {

    }

    render() {
        return(
            <div style = {{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center'
            }}>

                {/* General View Wrapper */}
                <div style = {{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '70%',
                    height: 'auto',
                    marginTop: '30px',
                    padding: '10px'
                }}>
                    {/* Order information column View Wrapper */}
                    <div style = {{
                        display: 'flex',
                        flexDirection: 'column',
                        border: 'solid 0.1px grey',
                        width: '25%'
                    }}>
                        
                    </div>
                </div>
            </div>
        );
    }
} 

export default MyOrders;