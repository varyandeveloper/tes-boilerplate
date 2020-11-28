import { IsNotEmpty, MaxLength } from 'class-validator';
import RoleEntity from '../../../acl/entities/role.entity';
import { IsUniqueColumn } from '../../../core/validators/entity.exists.validator';

export default class RoleRequestEntity {
  @IsNotEmpty()
  @MaxLength(60)
  @IsUniqueColumn(RoleEntity)
  name: string;

  @MaxLength(255)
  description: string;
}
