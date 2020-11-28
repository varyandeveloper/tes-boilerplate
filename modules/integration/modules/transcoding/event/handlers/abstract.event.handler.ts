import { EventInterface } from '../entities/event.contract';

export abstract class AbstractEventHandler {
  async handle(event: EventInterface): Promise<void> {
    console.log(event);
    // General implementation here.
  }
}
