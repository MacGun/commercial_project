import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '@root/controllers/user.controller';
import { UserEntity } from '@root/entities/user.entity';
import { UserModule } from '@root/modules/user.module';
import { UserService } from '@root/services/user.service';
import * as path from 'path';

describe('0. UserController 및 UserService 생성 확인', () => {
  let Controller: UserController;
  let Service: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        UserModule,
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            return {
              type: 'mysql',
              host: configService.get('DB_HOST'),
              port: configService.get('DB_PORT') || 3306,
              username: configService.get('DB_USERNAME'),
              password: configService.get('DB_PASSWORD'),
              database: configService.get('DB_DATABASE_TEST'),
              entities: [path.join(__dirname, '../entities/*.entity{.ts,.js}')],
              synchronize: false,
              logging: false,
            };
          },
        }),
      ],
      providers: [],
    }).compile();

    Service = module.get<UserService>(UserService);
    Controller = module.get<UserController>(UserController);
  });

  describe('1. User 기능 확인.', () => {
    let user: UserEntity;

    afterAll(async () => {
      const result = await Controller.deleteUser(user.id);
    });

    it.todo('1. User 생성');
    it.todo('2. User 프로필 조회');
    it.todo('3. 유저 삭제');
  });
});
