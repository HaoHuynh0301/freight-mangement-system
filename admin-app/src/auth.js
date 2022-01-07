const axios = require('axios');
const localStorage = require('local-storage');

class Auth {
    login(cb) {
        cb();
    }

    logout(cb) {
        localStorage.set('token', null);
        cb();
    }

    isAuthenticate() {
        return localStorage.get('token');
    }
}

export default new Auth();