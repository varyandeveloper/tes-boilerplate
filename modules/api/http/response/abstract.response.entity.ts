export class AbstractResponseEntity {
  private _id: string;
  private _createdAt: string;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get createdAt(): string {
    return this._createdAt;
  }

  set createdAt(value: string) {
    this._createdAt = value;
  }
}
