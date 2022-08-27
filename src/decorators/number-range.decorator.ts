import { Max, Min } from '@nestjs/class-validator';
import { applyDecorators } from '@nestjs/common';
import { IsNotEmptyNumber } from './is-not-empty-number.decorator';

export function NumberRange(min, max) {
    return applyDecorators(IsNotEmptyNumber(), Min(min), Max(max));
}
