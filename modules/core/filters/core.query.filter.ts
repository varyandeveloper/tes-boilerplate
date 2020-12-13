import { injectable } from 'inversify';
import { NextFunction, Request, Response, RequestHandler } from 'express';
import { Brackets, FindManyOptions, In, SelectQueryBuilder } from 'typeorm';
import { AbstractResponseEntity } from '../../api/http/response/abstract.response.entity';

@injectable()
export default class CoreQueryFilter<Entity> {
  protected _findOptions: FindManyOptions = {
    relations: [],
    where: {},
  };

  protected static smartSelectIds: Array<string>;

  public target: AbstractResponseEntity;

  smart(
    qb: SelectQueryBuilder<Entity>,
    ...ids: string[]
  ): CoreQueryFilter<Entity> {
    CoreQueryFilter.smartSelectIds = ids;
    return this;
  }

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
      obj._findOptions.where = this.initWhere(
        req.query.hasOwnProperty('smart'),
        obj,
        options
      );
      req.filter = obj;
      if (responseEntity && responseEntity.fieldsToSelect) {
        req.filter.entity = responseEntity;
        req.filter.findOptions.select = responseEntity.fieldsToSelect;
      }

      next();
    };
  }

  id(
    qb: SelectQueryBuilder<Entity>,
    ...ids: string[]
  ): CoreQueryFilter<Entity> {
    if (!qb) {
      this._findOptions.where['id'] = ids.length > 1 ? In(ids) : ids[0];
    } else {
      ids.length > 1
        ? qb.andWhereInIds(ids)
        : qb.andWhere(`${qb.alias}.id = :id`, { id: ids[0] });
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

  protected initWhere(
    isMartSelect: boolean,
    obj: CoreQueryFilter<Entity>,
    options: Array<any>
  ) {
    return (qb: SelectQueryBuilder<Entity>): void => {
      qb.where('(true');
      for (const [key, value] of options) {
        if (key in obj) {
          obj[key](qb, ...value.toString().split(','));
        }
      }
      qb.andWhere('true)');
      if (isMartSelect) {
        qb.orWhere(
          new Brackets((qb1) => {
            qb1.orWhereInIds(CoreQueryFilter.smartSelectIds);
          })
        );
        CoreQueryFilter.smartSelectIds = [];
      }
    };
  }
}
