import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { User } from '@root/decorators/user-id.decorator';
import { UserEntity } from '@root/entities/user.entity';
import { LoginInfo } from './auth.input';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @ApiBody({ description: '로그인', type: LoginInfo })
    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@User() user: UserEntity) {
        return this.authService.login(user);
    }
}