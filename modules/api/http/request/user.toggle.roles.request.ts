import { IsArray, ValidateIf } from 'class-validator';

export default class UserToggleRolesRequest {
  @ValidateIf((c) => undefined === c.takeRoles || c.takeRoles.length === 0)
  @IsArray()
  addRoles: [];

  @ValidateIf((c) => undefined === c.addRoles || c.addRoles.length === 0)
  @IsArray()
  takeRoles: [];
}
