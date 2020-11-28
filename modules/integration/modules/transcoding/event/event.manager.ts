import { injectable } from 'inversify';
import { getHandler } from './config/module.config';
import { EventInterface } from './entities/event.contract';

@injectable()
export class EventManager {
  public async handle(event: EventInterface): Promise<void> {
    await getHandler(event.name).handle(event);
  }
}
