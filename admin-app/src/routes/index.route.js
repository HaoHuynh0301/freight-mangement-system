import LoginComponent from '../components/login/login.component';
import RegisterComponent from '../components/login/register.component';

const indexRoutes = [
    {
        path: '/auth/login',
        component: <LoginComponent />
    },
    {
        path: '/auth/register',
        component: <RegisterComponent/>
    }
];

export default indexRoutes;