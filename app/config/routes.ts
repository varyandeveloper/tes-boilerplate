import { TYPES } from './types';
import { Application } from 'express';
import container from './inversify.config';
import resourceMiddleware from '../../modules/api/http/middlewares/resource';
import authRouter from '../../modules/api/http/controllers/auth/auth.router';
import userRouter from '../../modules/api/http/controllers/user/user.router';
import roleRouter from '../../modules/api/http/controllers/role/role.router';
import TestController from '../../modules/api/http/controllers/TestController';
import webhookRouter from '../../modules/webhook/http/controllers/webhook.routes';

const controller = container.get<TestController>(TYPES.TestController);

export default function routes(app: Application): void {
  app.use('/webhook', webhookRouter);
  app.use(resourceMiddleware(true)); // pass true to resource Middleware and it will validate resource Id
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/roles', roleRouter);

  app.get('/api/v1/test', controller.index);
}
