import { AbstractResponseEntity } from './abstract.response.entity';

export default class OrganizationResponseEntity extends AbstractResponseEntity {
  private _name: string;
  private _timestamp: string;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get timestamp(): string {
    return this._timestamp;
  }

  set timestamp(value: string) {
    this._timestamp = value;
  }
}
