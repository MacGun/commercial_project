import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { TimeColumns } from './common/time-column';
import { ReceiptEntity } from './receipt.entity';

@Entity()
export class PerchaseEntity extends TimeColumns{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    receiptId: number;

    @Column()
    productId: number;

    @Column()
    quantity: number;

    @Column()
    fixedName: string;

    @Column()
    fixedPrice: number;

    @Column()
    fixedDeliveryFee: number;
    /**
     * below
     */

    @ManyToOne(() => ReceiptEntity, (receipt) => receipt.perchases)
    @JoinColumn({name: 'receiptId', referencedColumnName: 'id'})
    receipt: ReceiptEntity;
}
