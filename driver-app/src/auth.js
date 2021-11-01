import {
    ipAddress
} from './contants';
const axios = require('axios');
const localStorage = require('local-storage');

let isAuth = true;
setTimeout(() => {
    axios.get(`${ipAddress}/api/driver-middleware/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.get('token')).name}`
        }
    })
    .then((response) => {
        
    })
    .catch(error => {
        isAuth = false;
        console.log('Error!');
    });
}, 500);


class Auth {
    constructor() {
        this.authenticate = true;
    }

    login(cb) {
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