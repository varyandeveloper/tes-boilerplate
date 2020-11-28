import Server from '../app';
import request from 'supertest';
import AccessEntityInterface from '../modules/acl/entities/access.entity.interface';

export const API_URL = '/api/v1';

export const req = request(Server);

export const getDefaultUser = () => {
  return {
    username: 'varyan',
    password: 'secret',
  };
};

export const loginWithDefaultUser = async () => {
  const user = await getDefaultUser();
  return req.post(`${API_URL}/auth`).send(user).expect(200);
};

export const TestPermission: AccessEntityInterface = {
  id: '1',
  name: '*',
};

export const TestRole: AccessEntityInterface = {
  id: '2',
  name: 'moderator',
};
