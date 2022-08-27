import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyString } from '@root/decorators/is-not-empty-string.decorator';
import { IsGender } from '@root/gender.decorator';
import { Type } from 'class-transformer';
import { IsDate, IsEmail } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AddressEntity } from './address.entity';
import { CartEntity } from './cart.entity';
import { TimeColumns } from './common/time-column';

@Entity()
export class UserEntity extends TimeColumns {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: '이메일', example: 'test@test.com' })
    @IsNotEmptyString(3, 100)
    @IsEmail()
    @Column()
    email: string;

    @ApiProperty({ description: '비밀번호', example: 'password123!@#' })
    @IsNotEmptyString(0, 30)
    @Column({ length: 1000, select: false })
    password: string;

    @ApiProperty({ description: '이름', example: 'MacGun' })
    @IsNotEmptyString(1, 30)
    @Column({ length: 30, nullable: false })
    name: string;

    @ApiProperty({ description: '생일', example: new Date() })
    @IsDate()
    @Type(() => Date)
    @Column()
    birth: Date;

    @ApiProperty({ description: '성별', example: 'male' })
    @IsGender()
    @Column({ nullable: true })
    gender: string;

    @ApiProperty({ description: '전화번호', example: '010-1234-5678' })
    @Column()
    phone: string;

    /**
     * below
     */

    @OneToMany(() => CartEntity, (cart) => cart.user)
    carts: CartEntity[];

    @OneToMany(() => AddressEntity, (address) => address.user)
    addresses: AddressEntity[];
}
