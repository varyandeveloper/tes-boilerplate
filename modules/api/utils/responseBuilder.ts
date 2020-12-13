import { BaseEntity } from 'typeorm';
import { RESPONSE } from '../config/response';
import HydratorService from '../../core/services/hydrator.service';

const hydrate = (source: any, target: any): Record<string, any> => {
  const obj = new target();
  Object.getOwnPropertyNames(target.prototype).forEach((key) => {
    if (source && key in source) {
      if (
        source[key] instanceof BaseEntity &&
        source[key].constructor.name in RESPONSE
      ) {
        obj[key] = HydratorService.extract(
          hydrate(source[key], RESPONSE[source[key].constructor.name])
        );
      } else {
        obj[key] = source[key];
      }
    }
  });
  return obj;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function responseBuilder(source: any, target = null): any {
  if (null === target) {
    return source;
  }

  if (source instanceof Array) {
    const result = [];
    source.forEach((item) => {
      const hydrated = hydrate(item, target);
      result.push(HydratorService.extract(hydrated));
    });
    return result;
  } else {
    const hydrated = hydrate(source, target);
    return HydratorService.extract(hydrated);
  }
}
