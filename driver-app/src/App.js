import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
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

function App() {
    return (
        <Router>
            <div>
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
                        <MyOrders />
                    </Route>
                    <Route path = '/orders'>
                        <Orders />
                    </Route>
                    <Route path = '/'>
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
