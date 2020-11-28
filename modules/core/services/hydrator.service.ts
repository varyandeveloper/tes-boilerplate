import { BaseEntity } from 'typeorm';
import { RESPONSE } from '../../api/config/response';

export default class HydratorService {
  static extract(target: Record<string, unknown>): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    Object.getOwnPropertyNames(Object.getPrototypeOf(target)).forEach((key) => {
      result[key] = target[key];
    });
    return result;
  }

  static hydrate(source: any, target: any): Record<string, unknown> {
    const obj = new target();
    Object.getOwnPropertyNames(target.prototype).forEach((key) => {
      if (source && key in source) {
        if (
          source[key] instanceof BaseEntity &&
          source[key].constructor.name in RESPONSE
        ) {
          obj[key] = HydratorService.extract(
            HydratorService.hydrate(
              source[key],
              RESPONSE[source[key].constructor.name]
            )
          );
        } else {
          obj[key] = source[key];
        }
      }
    });
    return obj;
  }
}
