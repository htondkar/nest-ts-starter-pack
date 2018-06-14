import { plainToClass } from 'class-transformer';
import { validate, ValidatorOptions } from 'class-validator';
import { ArgumentMetadata, BadRequestException, Pipe, PipeTransform } from '@nestjs/common';

@Pipe()
export default class Validation implements PipeTransform<any> {
  constructor(private readonly validationOptions?: ValidatorOptions) {}

  toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object]
    return !types.find(type => metatype === type)
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata

    // check if the value is valid JS data type
    if (!metatype || !this.toValidate(metatype)) return value

    // class validator requires the class instance (de-serialized)
    const object = plainToClass(metatype, value)

    // perform validations
    const errors = await validate(
      object,
      {
        forbidUnknownValues: true,
        ...this.validationOptions
      } || {
        forbidUnknownValues: true,
      },
    )

    if (errors.length > 0) {
      throw new BadRequestException({ message: 'Validation failed', errors })
    }

    // interface requires the return of values
    return value
  }
}
