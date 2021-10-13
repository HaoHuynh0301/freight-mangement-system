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

const middleWare = async () => {
    let isAuth = false;
    await axios.get(`${ipAddress}/api/driver-middleware/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.get('token')}`
        }
    })
    .then(async(response) => {
        isAuth = true;
        localStorage.set('token', response.data.access_token);
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
                    <Route  path = '/'>
                        <Home isAuth = {isAuth} />
                    </Route>
                </Switch>
            </BrowserRouter>
        ); 
    })
    .catch(error => {
        console.log('Error!');
    });
    return isAuth;
}

function App() {
    let isAuth = false;
    axios.get(`${ipAddress}/api/driver-middleware/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.get('token')}`
        }
    })
    .then(async(response) => {
        isAuth = true;
        localStorage.set('token', response.data.access_token);
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
                    <Route  path = '/'>
                        <Home isAuth = {isAuth} />
                    </Route>
                </Switch>
            </BrowserRouter>
        ); 
    })
    .catch(error => {
        console.log('Error!');
    });

    return(
        <BrowserRouter>
            <Switch>
                <Route path = '/sign-in'>
                    <Sigin />
                </Route>
                <Route path = '/register'>
                    <Register />
                </Route>
                <Route  path = '/'>
                    <Home isAuth = {isAuth} />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
