import { IsNotEmpty, IsString, Length } from '@nestjs/class-validator';
import { applyDecorators } from '@nestjs/common';

export function IsNotEmptyString(min: number, max: number) {
  return applyDecorators(IsNotEmpty(), IsString(), Length(min, max));
}
