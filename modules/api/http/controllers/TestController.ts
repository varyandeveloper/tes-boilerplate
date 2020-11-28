import path from 'path';
import * as fs from 'fs';
import Blob from 'node-blob';
import autobind from 'autobind-decorator';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../integration/config/types';
import { Response, Request, NextFunction } from 'express';
import TranscodingManager from '../../../integration/modules/transcoding/transcoding.manager';

@autobind
@injectable()
export default class TestController {
  @inject(TYPES.TranscodingManager)
  protected transcodingManager: TranscodingManager;

  public async index(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const content = fs.readFileSync(__dirname + '/../../../../test.mp4');
      const response = await this.transcodingManager.upload(content);
      const { type, key } = response.media;
      res.json({ type, key });
    } catch (error) {
      next(error);
    }
  }

  streamToBlob(stream, mimeType): any {
    if (mimeType != null && typeof mimeType !== 'string') {
      throw new Error('Invalid mimetype, expected string.');
    }
    return new Promise((resolve, reject) => {
      const chunks = [];
      stream
        .on('data', (chunk) => {
          chunks.push(chunk);
        })
        .once('end', () => {
          const blob =
            mimeType != null
              ? new Blob(chunks, { type: mimeType })
              : new Blob(chunks);
          resolve(blob);
        })
        .once('error', reject);
    });
  }
}
