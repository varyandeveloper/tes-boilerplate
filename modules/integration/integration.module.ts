import { Container } from 'inversify';
import AuthModule from './modules/auth/auth.module';
import ModuleInterface from '../core/module.interface';
import TranscodingModule from './modules/transcoding/transcoding.module';

const subModules: Array<ModuleInterface> = [
  new AuthModule(),
  new TranscodingModule(),
];

export default class IntegrationModule implements ModuleInterface {
  init(container: Container): void {
    subModules.forEach((module) => module.init(container));
  }
}
