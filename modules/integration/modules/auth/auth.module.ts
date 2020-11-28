import { Container } from 'inversify';
import AuthManager from './auth.manager';
import { TYPES } from '../../config/types';
import ModuleInterface from '../../../core/module.interface';
import * as AbstractAuthProvider from './providers/abstract.provider';
import { getProvider as getAuthProvider } from './config/module.config';

export default class AuthModule implements ModuleInterface {
  init(container: Container): void {
    container
      .bind<AbstractAuthProvider.default>(TYPES.AuthProvider)
      .to(getAuthProvider())
      .inSingletonScope();

    container
      .bind<AuthManager>(TYPES.AuthManager)
      .to(AuthManager)
      .inSingletonScope();
  }
}
