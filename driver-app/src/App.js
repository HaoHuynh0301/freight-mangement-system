import {
    LandingPage,
    Register,
    HomePage,
    Profile,
    MyOrders,
    AvailableOrders
} from './screens';
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';
import { ProtectedRoute } from './protected.route';
import auth from './auth';

const AppView = (props) => {
    return(
        <div>
            <button onClick = {() => {
                auth.logout(() => {
                    props.history.push("/");
                })
            }}>
                Logout
            </button>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <ProtectedRoute exact path = '/' component = {HomePage}></ProtectedRoute>
                <Route exact path = '/register' component = {Register}></Route>
                <Route exact path = '/sign-in' component = {LandingPage}></Route>
                <ProtectedRoute exact path = '/profile' component = {Profile}></ProtectedRoute>
                <ProtectedRoute exact path = '/my-order' component = {MyOrders}></ProtectedRoute>
                <ProtectedRoute exact path = '/available-orders' component = {AvailableOrders}></ProtectedRoute>
                <Route path = "*" component = {() => {
                    return(
                        <div>
                            404
                        </div>
                    );
                }}></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
