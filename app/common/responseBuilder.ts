import HydratorService from '../../modules/core/services/hydrator.service';

export default function responseBuilder(source, target = null): any {
  if (null === target) {
    return source;
  }

  if (source instanceof Array) {
    const result = [];
    source.forEach((item) => {
      const hydrated = HydratorService.hydrate(item, target);
      result.push(HydratorService.extract(hydrated));
    });
    return result;
  } else {
    const hydrated = HydratorService.hydrate(source, target);
    return HydratorService.extract(hydrated);
  }
}
