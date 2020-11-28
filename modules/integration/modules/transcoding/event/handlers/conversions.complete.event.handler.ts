import { EventInterface } from '../entities/event.contract';
import { AbstractEventHandler } from './abstract.event.handler';

export class ConversionsCompleteEventHandler extends AbstractEventHandler {
  async handle(event: EventInterface): Promise<void> {
    console.log('Handling conversions complete event.');
    return super.handle(event);
  }
}
