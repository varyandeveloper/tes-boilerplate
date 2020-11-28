import Session from './session.entity.interface';

export type PartialSession = Omit<Session, 'issued' | 'expires'>;
