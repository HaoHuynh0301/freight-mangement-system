import BaseClient from './base.client';

class AuthClient extends BaseClient {
  constructor(baseUrl = '') {
    super(baseUrl);
  }

  login(email, password) {
    let data = {
      email: email,
      password: password,
    };
    return super.post(['/sign-in'], data);
  }

  register(
    customer_name,
    phone_numner,
    bank_name,
    bank_number,
    bank_provine,
    bank_username,
    password,
    email,
  ) {
    let data = {
      customer_name: customer_name,
      phone_numner: phone_numner,
      bank_name: bank_name,
      bank_number: bank_number,
      bank_provine: bank_provine,
      bank_username: bank_username,
      password: password,
      email: email,
    };
    return super.post(['/register'], data);
  }
}

export default AuthClient;
