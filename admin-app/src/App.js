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
            
        </Routes>
    </Suspense>
);

function App() {
    return (
        <div>
            
        </div>
    );
}

export default App;
