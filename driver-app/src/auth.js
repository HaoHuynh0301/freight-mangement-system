import {
    ipAddress
} from './contants';
const axios = require('axios');
const localStorage = require('local-storage');

class Auth {
    constructor() {
        let token = localStorage.get('token');
        let isAuth = false;
        if(token !== null) {
            axios.get(`${ipAddress}/api/driver-middleware/`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                isAuth = true;
                localStorage.set('token', response.data.access_token);
            })
            .catch(error => {
                console.log('Error!');
            });
        }

        this.authenticate = isAuth;
    }

    login(token, cb) {
        localStorage.set('token', token);
        this.authenticate = true;
        cb();
    }

    logout(cb) {
        localStorage.set('token', null);
        this.authenticate = false;
        cb();
    }

    isAuthenticate() {
        return this.authenticate;
    }
}

export default new Auth();