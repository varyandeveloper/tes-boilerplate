import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidationArguments,
  ValidatorConstraintInterface,
} from 'class-validator';
import { getRepository } from 'typeorm';

let currentEntity: any;

@ValidatorConstraint({ async: true })
export class IsUnique implements ValidatorConstraintInterface {
  async validate(name: string, args: ValidationArguments): Promise<boolean> {
    const repository = getRepository(currentEntity);
    const count = await repository.count({
      where: { [args.property]: args.value },
    });

    return count === 0;
  }
}

export function IsUniqueColumn(
  entity: any,
  validationOptions?: ValidationOptions
): any {
  currentEntity = entity;
  return function (object: any, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {
        ...validationOptions,
        message: `${propertyName} has already been taken.`,
      },
      constraints: [propertyName],
      validator: IsUnique,
    });
  };
}
