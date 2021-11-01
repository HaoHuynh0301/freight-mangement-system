import {
    ipAddress
} from './contants';
const axios = require('axios');
const localStorage = require('local-storage');

let token = localStorage.get('token');
let isAuth = true;
if(token !== undefined) {
    console.log('here')
    axios.get(`${ipAddress}/api/driver-middleware/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then((response) => {
        console.log('here2')
        localStorage.set('token', response.data.access_token);
    })
    .catch(error => {
        isAuth = false;
        console.log('Error!');
    });
}

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