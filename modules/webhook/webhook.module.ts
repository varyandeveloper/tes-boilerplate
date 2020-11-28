import { Container } from 'inversify';
import { TYPES } from './config/types';
import ModuleInterface from '../core/module.interface';
import { WebhookController } from './http/controllers/webhook.controller';

export default class WebhookModule implements ModuleInterface {
  init(container: Container): void {
    container
      .bind<WebhookController>(TYPES.WebhookController)
      .to(WebhookController);
  }
}
