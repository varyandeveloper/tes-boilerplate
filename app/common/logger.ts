import pino from 'pino';

const l = pino({
  name: process.env.APP_ID,
  level: process.env.LOG_LEVEL,
});

export const logError = (msg: string, ...args: any): void => {
  l.error(msg, ...args);
};

export default l;
