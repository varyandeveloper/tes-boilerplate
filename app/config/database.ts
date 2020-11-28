import l from '../common/logger';
import { EVENTS } from './events';
import event from '../common/event';
import { createConnection } from 'typeorm';

createConnection()
  .then((connection) => {
    event.emit(EVENTS.DB_CONNECTED, connection);
  })
  .catch((error) => {
    l.error(error);
    process.exit(1);
  });
