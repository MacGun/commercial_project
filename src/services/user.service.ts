import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@root/entities/repositories/user.repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
    ) {}
    
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
    
}