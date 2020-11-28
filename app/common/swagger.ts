import path from 'path';
import { Application } from 'express';
import middleware from 'swagger-express-middleware';
import errorHandler from '../../modules/api/http/middlewares/error.handler';

export default function (
  app: Application,
  routes: (app: Application) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    middleware(
      path.join(__dirname, 'api.yml'),
      app,
      function (err: Error, middleware) {
        if (err) {
          return reject(err);
        }
        // Enable Express' case-sensitive and strict options
        // (so "/entities", "/Entities", and "/Entities/" are all different)
        app.enable('case sensitive routing');
        app.enable('strict routing');

        app.use(middleware.metadata());
        app.use(
          middleware.files(app, {
            apiPath: process.env.SWAGGER_API_SPEC,
          })
        );

        app.use(
          middleware.parseRequest({
            // Configure the cookie parser to use secure cookies
            cookie: {
              secret: process.env.SESSION_SECRET,
            },
            // Don't allow JSON content over 100kb (default is 1mb)
            json: {
              limit: process.env.REQUEST_LIMIT,
            },
          })
        );

        // These two middleware don't have any options (yet)
        app.use(middleware.CORS(), middleware.validateRequest());

        routes(app);

        app.use(errorHandler);

        resolve();
      }
    );
  });
}
