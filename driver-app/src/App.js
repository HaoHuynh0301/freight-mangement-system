import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import {
    Sigin
} from './screens';

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path = '/'>
                        <Sigin />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
