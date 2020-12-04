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

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static hydrate(source: any, target: any): Record<string, any> {
    const obj = new target();
    Object.getOwnPropertyNames(target.prototype).forEach((key) => {
      // TODO find a way to avoid using RESPONSE constant here as it too bad solution it harms Dependency Inversion principe
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
