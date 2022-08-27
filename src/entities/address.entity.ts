import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { TimeColumns } from './common/time-column';
import { UserEntity } from './user.entity';

@Entity()
export class AddressEntity extends TimeColumns{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    userId: number;

    @Column()
    address: string;

    @Column()
    detail: string;

    @Column()
    zipcode: string;

    @Column()
    message: string;

    /**
     * below
     */
    @ManyToOne(() => UserEntity, (user) => user.addresses)
    @JoinColumn({name: 'userId', referencedColumnName: 'id'})
    user: UserEntity;
}
