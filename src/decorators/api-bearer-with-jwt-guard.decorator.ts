import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@root/auth/guards/jwt-auth.guard';

export function JwtGuardWithApiBearerAuth() {
    return applyDecorators(ApiBearerAuth('Bearer'), UseGuards(JwtAuthGuard));
}
