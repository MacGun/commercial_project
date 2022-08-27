import { CustomRepository } from '@root/settings/typeorm/custom-typeorm.decorator';
import { Repository } from 'typeorm/repository/Repository';
import { UserEntity } from '../user.entity';

@CustomRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}
