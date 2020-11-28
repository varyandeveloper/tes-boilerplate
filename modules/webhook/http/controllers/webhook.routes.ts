import express from 'express';
import { TYPES } from '../../config/types';
import { WebhookController } from './webhook.controller';
import container from '../../../../app/config/inversify.config';

const webhookController = container.get<WebhookController>(
  TYPES.WebhookController
);

export default express.Router().post('/:provider', webhookController.handle);
