import { IsIn, IsString } from '@nestjs/class-validator';
import { applyDecorators } from '@nestjs/common';

export function IsGender() {
  return applyDecorators(IsString(), IsIn(['male', 'female']));
}
