import 'mocha';
import { expect } from 'chai';
import { loginWithDefaultUser, makeSureAllIsReady } from '../common';

describe('Auth endpoints', () => {
  it('should retrieve auth token', () => {
    makeSureAllIsReady().then(() => {
      loginWithDefaultUser().then((response) => {
        expect(response.body).to.be.an('object').that.has.property('token');
      });
    });
  });
});
