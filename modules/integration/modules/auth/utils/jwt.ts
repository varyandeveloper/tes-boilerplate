import { AUTH } from '../config/module.config';
import Session from '../entities/session.entity.interface';
import { PartialSession } from '../entities/partial.session.type';
import EncodeResultInterface from '../entities/encode.result.interface';
import { encode as encoder, decode as decoder, TAlgorithm } from 'jwt-simple';
import { DecodeResult, ExpirationStatus } from '../entities/decode.result.type';

export function encode(partialSession: PartialSession): EncodeResultInterface {
  const algorithm: TAlgorithm = 'HS512';
  const issued = Date.now();
  const fifteenMinutesInMs = AUTH.JWT.EXPIRES_IN_MINUTES * 60 * 1000;
  const expires = issued + fifteenMinutesInMs;
  const session: Session = {
    id: partialSession.id,
    dateCreated: partialSession.dateCreated,
    username: partialSession.username,
    issued,
    expires,
  };

  return {
    token: encoder(session, AUTH.JWT.SECRET_KEY, algorithm),
    issued,
    expires,
  };
}

export function decode(tokenString: string): DecodeResult {
  const algorithm: TAlgorithm = 'HS512';
  let result: Session;

  try {
    result = decoder(tokenString, AUTH.JWT.SECRET_KEY, false, algorithm);
  } catch (_e) {
    const e: Error = _e;

    if (
      e.message === 'No token supplied' ||
      e.message === 'Not enough or too many segments'
    ) {
      return {
        type: 'invalid-token',
      };
    }

    if (
      e.message === 'Signature verification failed' ||
      e.message === 'Algorithm not supported'
    ) {
      return {
        type: 'integrity-error',
      };
    }

    if (e.message.indexOf('Unexpected token') === 0) {
      return {
        type: 'invalid-token',
      };
    }

    throw e;
  }

  return {
    type: 'valid',
    session: result,
  };
}

export function getExpirationStatus(token: Session): ExpirationStatus {
  const now = Date.now();

  if (token.expires > now) return 'active';

  const threeHoursInMs = 3 * 60 * 60 * 1000;
  const threeHoursAfterExpiration = token.expires + threeHoursInMs;

  if (threeHoursAfterExpiration > now) return 'grace';

  return 'expired';
}
