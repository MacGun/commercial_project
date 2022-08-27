import { Module } from '@nestjs/common';
import { UserRepository } from '@root/entities/repositories/user.repository';
import { UserService } from '@root/services/user.service';
import { CustomTypeOrmModule } from '@root/settings/typeorm/custom-typeorm.module';
// import { UserController } from './.controller';

@Module({
    imports: [
        CustomTypeOrmModule.forCustomRepository([UserRepository])
    ],
    controllers: [],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {};