import { injectable } from 'inversify';
import { FindManyOptions, In, SelectQueryBuilder } from 'typeorm';
import { NextFunction, Request, Response, RequestHandler } from 'express';
import { AbstractResponseEntity } from '../../api/http/response/abstract.response.entity';

@injectable()
export default class CoreQueryFilter<Entity> {
  protected _findOptions: FindManyOptions = {
    relations: [],
    where: {},
  };

  public target: AbstractResponseEntity;

  include(...relations: Array<string>): CoreQueryFilter<Entity> {
    this.findOptions.relations.push(...relations);
    return this;
  }

  apply(responseEntity = null): RequestHandler {
    return (req: Request, res: Response, next: NextFunction): void => {
      const options = Object.entries({ ...req.query, ...req.params });
      const obj = new (Object.getPrototypeOf(this).constructor)();
      if (req.query.with) {
        obj._findOptions.relations = req.query.with.toString().split(',');
        delete options['with'];
      }
      obj._findOptions.where = (qb) => {
        for (const [key, value] of options) {
          if (typeof obj[key] !== 'undefined') {
            obj[key](qb, value);
          }
        }
      };
      req.filter = obj;
      if (responseEntity && responseEntity.fieldsToSelect) {
        req.filter.entity = responseEntity;
        req.filter.findOptions.select = responseEntity.fieldsToSelect;
      }

      next();
    };
  }

  id(qb: SelectQueryBuilder<Entity>, ...id: string[]): CoreQueryFilter<Entity> {
    if (!qb) {
      this._findOptions.where['id'] = id.length > 1 ? In(id) : id[0];
    } else {
      id.length > 1 ? qb.whereInIds(id) : qb.where({ id: id[0] });
    }
    return this;
  }

  skip(value: number): CoreQueryFilter<Entity> {
    this._findOptions.skip = value;
    return this;
  }

  take(value: number): CoreQueryFilter<Entity> {
    this._findOptions.take = value;
    return this;
  }

  get findOptions(): any {
    return this._findOptions;
  }
}
