import 'mocha';
import { expect } from 'chai';
import { API_URL, loginWithDefaultUser, req } from '../common';

describe('User endpoints', () => {
  let token;

  before(async () => {
    //get token
    const resToken = await loginWithDefaultUser();
    token = resToken.body.token;
  });

  it('should retrieve users list', () => {
    return req
      .get(`${API_URL}/users`)
      .set('Authorization', token)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.an('array');
      });
  });

  it('should retrieve user by id', () => {
    return req
      .get(`${API_URL}/users/1`)
      .set('Authorization', token)
      .then((response) => {
        expect(response.body).to.be.an('object');
      });
  });
});
