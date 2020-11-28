import Session from './session.entity.interface';

export type DecodeResult =
  | { type: 'valid'; session: Session }
  | { type: 'integrity-error' }
  | { type: 'invalid-token' };

export type ExpirationStatus = 'expired' | 'active' | 'grace';
