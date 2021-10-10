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
    User
} from './screens';
import {
    MyOrders,
    Orders
} from './screens/components'
import {
    ipAddress
} from './contants';
const localStorage = require('local-storage');
const axios = require('axios');

const middleWare = async (token) => {
    var isAuth = false;
    await axios.get(`${ipAddress}/api/driver-middleware/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then((response) => {
        console.log((response.data));
        isAuth = true;
    })
    .catch((error) => {
        console.log(error);
    });
    return isAuth;
}

function App() {
    const token = localStorage.get('token');
    var isAuth = false;
    if(token !== null) {
        isAuth = middleWare(token);
    }
    return (
        <BrowserRouter>
            <Switch>
                <Route path = '/user-infor'>
                    <User />
                </Route>
                <Route path = '/sign-in'>
                    <Sigin />
                </Route>
                <Route path = '/register'>
                    <Register />
                </Route>
                <Route path = '/my-orders'>
                    <Home isAuth = {isAuth} comp = 'my-orders'/>
                </Route>
                <Route path = '/orders'>
                    <Home isAuth = {isAuth} comp = 'orders'/>
                </Route>
                <Route path = '/dashboard'>
                    <Home isAuth = {isAuth} comp = 'dashboard'/>
                </Route>
                <Route exact path = '/'>
                    <Home isAuth = {isAuth}/>
                </Route>
            </Switch>
        </BrowserRouter>
    ); 
}

export default App;
