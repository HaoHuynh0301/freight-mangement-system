const superagent = require('superagent');

class BaseClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  /**
   * general GET request
   * @param {Array} path - path of the url
   * @param {object} query - query if any
   * @return {Promise}
   */

  get(path, query = {}) {
    let url = this.baseUrl + path.join('/') + '/';
    return new Promise((resolve, reject) => {
      superagent
        .get(url)
        .query(query)
        .end((err, res) => {
          if (err || !res.ok) {
            console.log(err);
            reject(err);
          } else {
            resolve(res);
          }
        });
    });
  }

  /**
   * general POST request
   * @param {Array} path - path of the url
   * @param {Object} data
   * @return {Promise}
   */

  post(path, data = {}) {
    let url = this.baseUrl + path.join('/') + '/';
    return new Promise((resolve, reject) => {
      superagent
        .post(url)
        .send(data)
        .end((res, err) => {
          if (err || !res.ok) {
            console.log(err);
            reject(err);
          } else {
            resolve(res);
          }
        });
    });
  }

  /**
   * general PUT request - used for setting values
   * @param {Array} path
   * @param {Object} value - which will be set
   * @return {Promise}
   */

  put(path, value = {}) {
    let url = this.baseUrl + path.join('/') + '/';
    return new Promise((resolve, reject) => {
      superagent
        .put(url)
        .send(value)
        .end((err, res) => {
          if (err || !res.ok) {
            reject(err);
          } else {
            resolve(res);
          }
        });
    });
  }

  /**
   * general PATCH request - used for updating values
   * @param {Array} path
   * @param {Object} value - which will be updated
   * @return {Promise}
   */

  patch(path, value = {}) {
    let url = this.baseUrl + path.join('/') + '/';
    return new Promise((resolve, reject) => {
      superagent
        .patch(url)
        .send(value)
        .end((err, res) => {
          if (err || !res.ok) {
            console.log(err);
            reject(err);
          } else {
          }
        });
    });
  }

  /**
   * genral delete request
   * @param {Array} path
   * @param {Object} query
   * @return {Promise}
   */

  delete(path, query = {}) {
    let url = this.baseUrl + path.join('/') + '/';
    return new Promise((resolve, reject) => {
      superagent
        .delete(url)
        .query(query)
        .end((err, res) => {
          if (err || !res.ok) {
            console.log(err);
            reject(err);
          } else {
            resolve(res);
          }
        });
    });
  }
}

export default BaseClient;
