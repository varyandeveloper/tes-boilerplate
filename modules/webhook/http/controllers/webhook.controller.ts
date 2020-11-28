import autobind from 'autobind-decorator';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../../app/config/types';
import { Request, Response, NextFunction } from 'express';
import { EventManager } from '../../../integration/modules/transcoding/event/event.manager';

@autobind
@injectable()
export class WebhookController {
  @inject(TYPES.EventManager) protected transcodingEventManager: EventManager;
  async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { provider } = req.params;
      const event = req.body;
      await this.transcodingEventManager.handle({
        id: event.media_id,
        provider,
        name: event.event,
      });
      return res.json({ message: 'Event successfully handed.' });
    } catch (error) {
      next(error);
    }
  }
}
