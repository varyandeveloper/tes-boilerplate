export default class HydratorService {
  static extract(target: Record<string, unknown>): Record<string, any> {
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
      if (source && key in source) {
        obj[key] = source[key];
      }
    });
    return obj;
  }
}
