import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from '@root/decorators/user-id.decorator';
import { UserEntity } from '@root/entities/user.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@User() user: UserEntity) {
        return this.authService.login(user);
    }
}