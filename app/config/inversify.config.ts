import { Container } from 'inversify';
import ApiModule from '../../modules/api/api.module';
import AclModule from '../../modules/acl/acl.module';
import UserModule from '../../modules/user/user.module';
import WebhookModule from '../../modules/webhook/webhook.module';
import ModuleInterface from '../../modules/core/module.interface';
import IntegrationModule from '../../modules/integration/integration.module';

const modules: Array<ModuleInterface> = [
  new ApiModule(),
  new AclModule(),
  new UserModule(),
  new WebhookModule(),
  new IntegrationModule(),
];

const container = new Container();

modules.forEach((module) => module.init(container));

export default container;
