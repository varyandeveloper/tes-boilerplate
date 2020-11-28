import { Container } from 'inversify';
import { TYPES } from '../../config/types';
import EventModule from './event/event.module';
import TranscodingManager from './transcoding.manager';
import ModuleInterface from '../../../core/module.interface';
import { AbstractProvider } from './providers/abstract.provider';
import { getProvider as getTranscodingProvider } from './config/module.config';

const sumModules: Array<ModuleInterface> = [new EventModule()];

export default class TranscodingModule implements ModuleInterface {
  init(container: Container): void {
    container
      .bind<AbstractProvider>(TYPES.TranscodingProvider)
      .to(getTranscodingProvider())
      .inSingletonScope();

    container
      .bind<TranscodingManager>(TYPES.TranscodingManager)
      .to(TranscodingManager)
      .inSingletonScope();

    sumModules.forEach((module) => module.init(container));
  }
}
