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
    axios.get(`${ipAddress}/api/driver-middleware/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then(async (response) => {
        isAuth = true;
        await axios.set('token', response.data.access_token);
    })
    .catch(error => {
        console.log('Error!');
    });
    return isAuth;
}

function App() {
    const token = localStorage.get('token');
    console.log(token)
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
                <Route exact path = '/'>
                    <Home isAuth = {isAuth} />
                </Route>
            </Switch>
        </BrowserRouter>
    ); 
}

export default App;
