import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    BrowserRouter
} from "react-router-dom";
import {
    Sigin,
    Register,
    Home,
    User,
} from './screens';
import {
    MyOrders,
    Orders,
    Dashboard
} from './screens/components'
import {
    ipAddress
} from './contants';
import loadingIcon from './assets/loading.gif';
import { Component } from 'react';
const localStorage = require('local-storage');
const axios = require('axios');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuth: null
        }
    }

    componentDidMount() {
        axios.get(`${ipAddress}/api/driver-middleware/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.get('token')}`
            }
        })
        .then((response) => {
            this.setState({
                isAuth: true
            });
            localStorage.set('token', response.data.access_token);
        })
        .catch(error => {
            this.setState({
                isAuth: false
            });
            console.log('Error!');
        });
    }

    render() {

        if(this.state.isAuth === null) {
            return(
                <div>
                    <img src = {loadingIcon}></img>
                </div>
            );
        } else {
            console.log(this.state.isAuth);
            return(
                <BrowserRouter>
                    <Switch>
                        <Route path = '/user-infor'>
                            <User />
                        </Route>
                        <Route exact path = '/sign-in'>
                            <Sigin />
                        </Route>
                        <Route path = '/register'>
                            <Register />
                        </Route>
                        <Route  path = '/'>
                            <Home isAuth = {this.state.isAuth} />
                        </Route>
                        <Route path = '/my-orders/:id'>
                            <MyOrders />    
                        </Route>
                        <Route path = '/orders/:id'>
                            <Orders /> 
                        </Route>
                        <Route exact path = '/user-infor'>
                            <User />
                        </Route>
                        <Route exact path = '/'>
                            <Dashboard /> 
                        </Route>
                    </Switch>
                </BrowserRouter>
            );   
        }
    }
}

export default App;
