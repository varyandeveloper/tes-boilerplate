import Server from '../app';
import request from 'supertest';
import '../app/config/database';
import event from '../app/common/event';
import { EVENTS } from '../app/config/events';
import UserSchema from '../modules/user/entities/user.schema';
import AccessSchema from '../modules/acl/entities/access.schema';

export const API_URL = '/api/v1';

export const req = request(Server);

export const makeSureAllIsReady = async (): Promise<any> => {
  return new Promise((resolve) => {
    event.on(EVENTS.DB_CONNECTED, resolve);
  });
};

export const getDefaultUser = (): Omit<
  UserSchema,
  'email' | 'id' | 'firstName' | 'lastName'
> => {
  return {
    username: 'varyan',
    password: 'secret',
    permissions: [],
    roles: [],
  };
};

export const loginWithDefaultUser = async (): Promise<any> => {
  const user = await getDefaultUser();
  return req.post(`${API_URL}/auth`).send(user).expect(200);
};

export const TestPermission: AccessSchema = {
  id: '1',
  name: '*',
};

export const TestRole: AccessSchema = {
  id: '2',
  name: 'moderator',
};
