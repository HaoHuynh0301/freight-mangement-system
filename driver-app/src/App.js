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
const localStorage = require('local-storage');

function privateRoute(props) {
    if(props.isAuth === true) {
        return
    }
}

function App() {
    const token = localStorage.get('token');
    console.log(token);
    var isAuth = false;
    if(token !== null) {
        isAuth = true;
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
                    <Home isAuth = {isAuth}/>
                </Route>
            </Switch>
        </BrowserRouter>
    ); 
}

export default App;
