import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { TimeColumns } from './common/time-column';
import { ReceiptEntity } from './receipt.entity';

@Entity()
export class DeliveryEntity extends TimeColumns{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    receiptId: number;

    @Column({type: 'json'})
    status: string;
    /**
     * below
     */
    @OneToOne(() => ReceiptEntity, (receipt) => receipt.delivery)
    @JoinColumn({
        name: 'receiptId',
        referencedColumnName: 'id'
    })
    receipt: ReceiptEntity;
}
