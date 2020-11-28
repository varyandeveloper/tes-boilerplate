import { EventInterface } from '../entities/event.contract';
import { AbstractEventHandler } from './abstract.event.handler';

export class MediaAvailableEventHandler extends AbstractEventHandler {
  async handle(event: EventInterface): Promise<void> {
    console.log('Handling media available event');
    await super.handle(event);
  }
}
