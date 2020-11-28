import crypto from 'crypto';
import queryString from 'qs';
import fetch from 'node-fetch';
import FormData from 'form-data';
import { injectable } from 'inversify';
import { AbstractProvider } from './abstract.provider';
import Exception from '../../../../../app/common/exception';
import { PROVIDER_JW_PLAYER, TRANSCODING } from '../config/module.config';

@injectable()
export class JwPlayerProvider extends AbstractProvider {
  protected config: Record<string, any>;

  constructor() {
    super();
    this.config = TRANSCODING[PROVIDER_JW_PLAYER];
  }

  public async getUploadUrl(): Promise<string> {
    try {
      const response = await fetch(
        `${this.config.API_V1_URL}/videos/create?${this.getSignature()}`
      );
      const data = await response.json();

      const { protocol, address, path, query } = data.link;
      return `${protocol}://${address}${path}?${queryString.stringify(
        Object.assign({}, query, { api_format: 'json' })
      )}`;
    } catch (error) {
      throw new Exception(error.message, error.code);
    }
  }

  async upload(buffer: ArrayBufferLike, name: string = null): Promise<string> {
    try {
      const url = await this.getUploadUrl();

      if (!name) {
        name = Math.floor(Date.now() / 1000).toString();
      }

      const formData = new FormData();
      formData.append('file', buffer, name);
      const uploadResponse = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      return uploadResponse.json();
    } catch (error) {
      throw new Exception(error.message, error.code);
    }
  }

  protected getSignature(): string {
    const params = {
      api_nonce: Math.floor(10000000 + Math.random() * 90000000).toString(),
      api_timestamp: Math.floor(Date.now() / 1000),
      api_format: this.config.API_FORMAT,
      api_key: this.config.API_V1_KEY_ID,
    };

    const paramsString = queryString.stringify(params, {
      charset: 'utf-8',
      sort: (a, b) => a.localeCompare(b),
    });

    const algorithm = crypto.createHash('sha1');
    algorithm.update(`${paramsString}${this.config.API_V1_SECRET_ID}`);
    return `${paramsString}&api_signature=${algorithm.digest('hex')}`;
  }
}
