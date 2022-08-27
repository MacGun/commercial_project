import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(){}

    @Get('login') 
    login() {
        
    }
}