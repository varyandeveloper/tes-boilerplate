import { TYPES as ApiTypes } from '../../modules/api/config/types';
import { TYPES as AclTypes } from '../../modules/acl/config/types';
import { TYPES as UserTypes } from '../../modules/user/config/types';
import { TYPES as WebhookTypes } from '../../modules/webhook/config/types';
import { TYPES as IntegrationTypes } from '../../modules/integration/config/types';

export const TYPES = {
  ...ApiTypes,
  ...AclTypes,
  ...UserTypes,
  ...WebhookTypes,
  ...IntegrationTypes,
};
