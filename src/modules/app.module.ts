import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import * as path from 'path';

@Module({
  imports: [AuthModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `.env.${process.env.NODE_ENV}`
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return {
        type: 'mysql',
        host: configService.get('DB_HOST') || 'localhost',
        port: Number(configService.get('DB_PORT')) || 3306,
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [path.join(__dirname, '../entities/*.entity{.js,.ts}')],
        synchronize: true,
        logging: true,
      }
    }
  })
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
