import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';
import { ProtectedRoute } from './protected.route';
import React, {
    Suspense
} from 'react';
import ProgressingComponent from './components/progressing/progressing.component';
import indexRoutes from './routes/index.route';

const switchRouters = (
    <Suspense fallback={<ProgressingComponent />}>
        <Routes>
            {indexRoutes.map((item, index) => {
                return(
                    <Route path = {item.path} element = {item.component} key = {index}></Route>
                );
            })}
        </Routes>
    </Suspense>
);

function App() {
    return (
        <BrowserRouter>
            {switchRouters}
        </BrowserRouter>
    );
}

export default App;
