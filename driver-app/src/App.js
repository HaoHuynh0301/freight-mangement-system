import {
    LandingPage,
    Register,
    HomePage
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
                <Route exact path = '/' component = {LandingPage}></Route>
                <Route exact path = '/register' component = {Register}></Route>
                <ProtectedRoute exact path = '/app' component = {AppView}></ProtectedRoute>
                <ProtectedRoute exact path = '/home' component = {HomePage}></ProtectedRoute>
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
