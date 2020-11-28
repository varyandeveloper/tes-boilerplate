import { AbstractProvider } from '../providers/abstract.provider';
import { JwPlayerProvider } from '../providers/jwPlayer.provider';

const {
  JW_PLAYER_API_V1_URL,
  JW_PLAYER_API_V1_KEY_ID,
  JW_PLAYER_API_V1_KEY_SECRET,
} = process.env;

export const PROVIDER_JW_PLAYER = 'jwPlayer';

export const PROVIDER = process.env.TRANSCODING_PROVIDER || PROVIDER_JW_PLAYER;

export const TRANSCODING = {
  [PROVIDER_JW_PLAYER]: {
    CLASS: JwPlayerProvider,
    API_FORMAT: 'json',
    API_V1_URL: JW_PLAYER_API_V1_URL,
    API_V1_KEY_ID: JW_PLAYER_API_V1_KEY_ID,
    API_V1_SECRET_ID: JW_PLAYER_API_V1_KEY_SECRET,
  },
};

export const getProvider = (
  provider: string = PROVIDER
): any | AbstractProvider => {
  return TRANSCODING[provider].CLASS;
};
