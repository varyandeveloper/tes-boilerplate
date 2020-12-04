import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidationArguments,
  ValidatorConstraintInterface,
} from 'class-validator';
import { BaseEntity, getRepository } from 'typeorm';

@ValidatorConstraint({ async: true })
export class IsUnique implements ValidatorConstraintInterface {
  async validate(name: string, args: ValidationArguments): Promise<boolean> {
    const repository = getRepository(args.constraints[1]);
    delete args.constraints[1];
    const count = await repository.count({
      where: { [args.property]: args.value },
    });

    return count === 0;
  }
}

export function IsUniqueColumn(
  entity: typeof BaseEntity,
  validationOptions?: ValidationOptions
): (object: any, propertyName: string) => void {
  return (object: any, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {
        ...validationOptions,
        message: `${propertyName} has already been taken.`,
      },
      constraints: [propertyName, entity],
      validator: IsUnique,
    });
  };
}
