import {
    LandingPage,
    Register,
    HomePage,
    Profile,
    MyOrders
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
                <ProtectedRoute exact path = '/app' component = {AppView}></ProtectedRoute>
                <Route exact path = '/sign-in' component = {LandingPage}></Route>
                <ProtectedRoute exact path = '/profile' component = {Profile}></ProtectedRoute>
                <ProtectedRoute exact path = '/my-order' component = {MyOrders}></ProtectedRoute>
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
