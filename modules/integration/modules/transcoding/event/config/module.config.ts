import Exception from '../../../../../api/exception/exception';
import { AbstractEventHandler } from '../handlers/abstract.event.handler';
import { MediaAvailableEventHandler } from '../handlers/media.available.event.handler';
import { ConversionsCompleteEventHandler } from '../handlers/conversions.complete.event.handler';

export const EVENT = {
  media_available: MediaAvailableEventHandler,
  conversions_complete: ConversionsCompleteEventHandler,
};

export const getHandler = (handler: string): AbstractEventHandler => {
  if (!EVENT[handler]) {
    throw new Exception('Invalid Event', 400);
  }
  return new EVENT[handler]();
};
