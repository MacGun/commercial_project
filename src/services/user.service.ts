import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '@root/entities/dto/create-user.dto';
import { UserRepository } from '@root/entities/repositories/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
    ) {}

    async saveUser(createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 8);

        return await this.userRepository.save({
            ...createUserDto,
            provider: 'local',
            password: hashedPassword,
        });
    }

    async deleteOneUser(userIdToDelete: number) {
        return await this.userRepository.softDelete({ id: userIdToDelete });
    }

    async getOneUserByEmailForAuth(email: string) {
        return await this.userRepository.findOne({
            where: { email },
            select: {
                email: true,
                password: true,
                name: true,
                id: true,
            },
        });
    }

    async getOneByEmailWithDeleted(email: string) {
        const user = await this.userRepository.findOne({
            where: { email },
            withDeleted: true,
        });

        return user;
    }

    async getProfile(userId: number) {
        const { email, ...profile } = await this.userRepository.findOne({
            where: {
                id: userId,
            },
            select: {
                name: true,
                birth: true,
                gender: true,
            },
        });
        return profile;
    }
}