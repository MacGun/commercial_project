import { BadRequestException, Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuardWithApiBearerAuth } from '@root/decorators/api-bearer-with-jwt-guard.decorator';
import { UserId } from '@root/decorators/user-id.decorator';
import { CreateUserDto } from '@root/entities/dto/create-user.dto';
import { UserService } from '@root/services/user.service';
import { ERROR_MESSAGE } from '@root/utils/error-message';


@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @JwtGuardWithApiBearerAuth()
    @Get('profile')
    @ApiOperation({ summary: '유저의 프로필 조회' })
    async getProfile(@UserId() userId: number) {
        return await this.userService.getProfile(userId);
    }

    @ApiOperation({ summary: '유저 생성 / 로컬 전략 ( email, password )에 의한 회원가입' })
    @Post()
    async saveUser(@Body() createUserDto: CreateUserDto) {
        const createdUser = await this.userService.getOneByEmailWithDeleted(createUserDto.email);
        if (createdUser) {
            throw new BadRequestException(ERROR_MESSAGE.ALREADY_CREATED_USER);
        }

        return await this.userService.saveUser(createUserDto);
    }

    @JwtGuardWithApiBearerAuth()
    @ApiOperation({ summary: '유저의 정보 삭제' })
    @Delete()
    async deleteUser(@UserId() userIdToDelete: number) {
        return await this.userService.deleteOneUser(userIdToDelete);
    }
}