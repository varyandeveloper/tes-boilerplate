import { TYPES } from '../../config/types';
import { inject, injectable } from 'inversify';
import { AbstractProvider } from './providers/abstract.provider';

@injectable()
export default class TranscodingManager {
  @inject(TYPES.TranscodingProvider) protected provider: AbstractProvider;

  async upload(buffer: ArrayBufferLike, name: string = null): Promise<any> {
    return this.provider.upload(buffer, name);
  }
}
