import { injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import Session from '../entities/session.entity.interface';

@injectable()
export default abstract class AbstractProvider {
  protected session: Session;

  abstract getAuthToken(credential: string, password: string): Promise<string>;

  middleware(request: Request, response: Response, next: NextFunction): void {
    next();
  }

  getSession(): Session {
    return this.session;
  }
}
