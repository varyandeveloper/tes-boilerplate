export default class Exception extends Error {
  protected _statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this._statusCode = statusCode;
    Object.setPrototypeOf(this, Exception.prototype);
  }

  get statusCode(): number {
    return this._statusCode;
  }
}
