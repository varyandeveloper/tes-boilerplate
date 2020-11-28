import RoleEntity from '../../../acl/entities/role.entity';
import PermissionEntity from '../../../acl/entities/permission.entity';
import OrganizationEntity from '../../../organization/entities/organization.entity';

export default class UserResponseEntity {
  private _id: string;
  private _firstName: string;
  private _lastName: string;
  private _username: string;
  private _email: string;
  private _createdAt: string;
  private _roles: Array<RoleEntity>;
  private _permissions: Array<PermissionEntity>;
  private _organization: OrganizationEntity;

  static fieldsToSelect = ['id', 'firstName', 'lastName', 'email', 'createdAt'];

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get createdAt(): string {
    return this._createdAt;
  }

  set createdAt(value: string) {
    this._createdAt = value;
  }

  set roles(roles: Array<RoleEntity>) {
    this._roles = roles;
  }

  get roles(): Array<RoleEntity> {
    return this._roles;
  }

  set permissions(permissions: Array<PermissionEntity>) {
    this._permissions = permissions;
  }

  get permissions(): Array<PermissionEntity> {
    return this._permissions;
  }

  get organization(): OrganizationEntity {
    return this._organization;
  }

  set organization(value: OrganizationEntity) {
    this._organization = value;
  }
}
