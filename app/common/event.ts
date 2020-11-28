import { EventEmitter } from 'events';

const event = new EventEmitter();
event.setMaxListeners(100);

export default event;
