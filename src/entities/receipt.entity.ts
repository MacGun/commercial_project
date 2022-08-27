import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { TimeColumns } from './common/time-column';
import { DeliveryEntity } from './delivery.entity';
import { PerchaseEntity } from './perchase.entity';

@Entity()
export class ReceiptEntity extends TimeColumns {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    checkedDate: Date;

    @Column({nullable: true})
    arrivedDate: Date;

    @Column()
    address: string;

    /**
     * below
     */
    @OneToOne(() => DeliveryEntity, (delivery) => delivery.receipt)
    delivery: DeliveryEntity

    @OneToMany(() => PerchaseEntity, (perchase) => perchase.receipt)
    perchases: PerchaseEntity[];
}
