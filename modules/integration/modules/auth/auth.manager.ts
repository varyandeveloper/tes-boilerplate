import { RequestHandler } from 'express';
import autobind from 'autobind-decorator';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../../app/config/types';
import { cache } from '../../../../app/common/cache';
import Session from './entities/session.entity.interface';
import UserEntity from '../../../user/entities/user.entity';
import AbstractProvider from './providers/abstract.provider';
import container from '../../../../app/config/inversify.config';
import UserQueryFilter from '../../../user/filters/user.query.filter';
import { UserServiceInterface } from '../../../user/services/user.service.interface';

const CACHE_TIME = 60 * 24;

@injectable()
@autobind
export default class AuthManager {
  @inject(TYPES.AuthProvider) private authProvider: AbstractProvider;
  @inject(TYPES.UserService) private userService: UserServiceInterface;

  async getToken(credential: string, password: string = null): Promise<string> {
    cache.del('auth-user');
    return this.authProvider.getAuthToken(credential, password);
  }

  check(): boolean {
    const session = this.getSession();
    return session && session.expires > Date.now();
  }

  getMiddleware(): RequestHandler {
    return this.authProvider.middleware;
  }

  getSession(): Session {
    return this.authProvider.getSession();
  }

  async getUser(filter?: UserQueryFilter): Promise<UserEntity> {
    const session = await this.authProvider.getSession();
    if (!session) {
      return null;
    }
    if (!filter) {
      filter = container.get<UserQueryFilter>(TYPES.UserQueryFilter);
    }
    const CACHE_KEY = JSON.stringify(filter.findOptions);
    filter.username(null, session.username).id(null, session.id);
    if (!cache.has(CACHE_KEY)) {
      cache.set(CACHE_KEY, await this.userService.fetch(filter), CACHE_TIME);
    }
    return cache.get(CACHE_KEY);
  }
}
