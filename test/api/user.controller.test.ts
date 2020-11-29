import 'mocha';
import { expect } from 'chai';
import {
  API_URL,
  loginWithDefaultUser,
  makeSureAllIsReady,
  req,
} from '../common';

describe('User endpoints', () => {
  let token;
  let userId;

  before(async () => {
    //get token
    await makeSureAllIsReady();
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
        userId =
          response.body[Math.floor(Math.random() * (response.body.length - 1))]
            .id;
      });
  });

  it('should retrieve user by id', () => {
    return req
      .get(`${API_URL}/users/${userId}`)
      .set('Authorization', token)
      .then((response) => {
        expect(response.body).to.be.an('object');
      });
  });
});
