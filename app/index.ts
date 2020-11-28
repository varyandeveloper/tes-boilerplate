import './common/env';
import 'reflect-metadata';
import('./config/database');
import routes from './config/routes';
import Server from './common/server';

const port = parseInt(process.env.PORT);

export default new Server().router(routes).listen(port);
