import { TYPES as EventTypes } from '../event/config/types';

export const TYPES = {
  ...EventTypes,
  TranscodingManager: Symbol('TranscodingManager'),
  TranscodingProvider: Symbol('TranscodingProvider'),
};
