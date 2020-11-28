import autobind from 'autobind-decorator';
import { AUTH } from '../config/module.config';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { TYPES } from '../../../../../app/config/types';
import AbstractProvider from './abstract.provider';
import { NextFunction, Request, Response } from 'express';
import HashService from '../../../../core/services/hash.service';
import { PartialSession } from '../entities/partial.session.type';
import { decode, encode, getExpirationStatus } from '../utils/jwt';
import UserQueryFilter from '../../../../user/filters/user.query.filter';
import { DecodeResult, ExpirationStatus } from '../entities/decode.result.type';
import { UserServiceInterface } from '../../../../user/services/user.service.interface';

@autobind
@injectable()
export default class JWTProvider extends AbstractProvider {
  @inject(TYPES.UserQueryFilter) private userFilter: UserQueryFilter;
  @inject(TYPES.UserService) private userService: UserServiceInterface;
  async getAuthToken(
    credential: string,
    password: string = null
  ): Promise<string | null> {
    const user = await this.userService.fetch(
      this.userFilter.username(null, credential)
    );
    if (
      !user ||
      (password && !(await HashService.verify(password, user.password)))
    ) {
      return null;
    }
    const partialSession: PartialSession = {
      id: user.id.toString(),
      username: credential,
      dateCreated: Date.now(),
    };
    const { token } = encode(partialSession);
    return token;
  }

  middleware(request: Request, response: Response, next: NextFunction): void {
    const unauthorized = (message: string) =>
      response.status(StatusCodes.UNAUTHORIZED).json({
        ok: false,
        status: StatusCodes.UNAUTHORIZED,
        message: message,
      });

    const requestHeader = AUTH.JWT.REQUEST_HEADER_NAME;
    const responseHeader = AUTH.JWT.RESPONSE_HEADER_NAME;
    const header = request.header(requestHeader);

    if (!header) {
      unauthorized(`Required ${requestHeader} header not found.`);
      return;
    }

    const decodedSession: DecodeResult = decode(header);

    if (
      decodedSession.type === 'integrity-error' ||
      decodedSession.type === 'invalid-token'
    ) {
      unauthorized(
        `Failed to decode or validate authorization token. Reason: ${decodedSession.type}.`
      );
      return;
    }

    const expiration: ExpirationStatus = getExpirationStatus(
      decodedSession.session
    );

    if (expiration === 'expired') {
      unauthorized(
        `Authorization token has expired. Please create a new authorization token.`
      );
      return;
    }

    if (expiration === 'grace') {
      const { token, expires, issued } = encode(decodedSession.session);
      this.session = {
        ...decodedSession.session,
        expires: expires,
        issued: issued,
      };

      response.setHeader(responseHeader, token);
    } else {
      this.session = decodedSession.session;
    }

    super.middleware(request, response, next);
  }
}
