class Auth {
    constructor() {
        this.authenticate = false;
    }

    login(cb) {
        this.authenticate = true;
        cb();
    }

    logout(cb) {
        this.authenticate = false;
        cb();
    }

    isAuthenticate() {
        return this.authenticate;
    }
}

export default new Auth();