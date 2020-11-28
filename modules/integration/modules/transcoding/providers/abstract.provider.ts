import { injectable } from 'inversify';

@injectable()
export abstract class AbstractProvider {
  abstract upload(buffer: ArrayBufferLike, name: string);
}
