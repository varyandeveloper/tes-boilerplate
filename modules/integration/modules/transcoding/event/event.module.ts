import { Container } from 'inversify';
import { TYPES } from './config/types';
import { EventManager } from './event.manager';
import ModuleInterface from '../../../../core/module.interface';

export default class EventModule implements ModuleInterface {
  init(container: Container): void {
    container.bind<EventManager>(TYPES.EventManager).to(EventManager);
  }
}
