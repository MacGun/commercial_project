import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AddressEntity } from './address.entity';
import { CartEntity } from './cart.entity';
import { TimeColumns } from './common/time-column';

@Entity()
export class UserEntity extends TimeColumns {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column({select: false})
    password: string;

    @Column()
    name: string;

    @Column()
    birth: Date;

    @Column()
    gender: string;

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
