import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CartEntity } from './cart.entity';

@Entity()
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    isSale: Boolean;
    
    @Column()
    stock: number;

    @Column({default: 1})
    minQuantity: number;

    @Column({default: 999})
    maxQuantity: number;

    @Column()
    deliveryFee: number;
    /**
     * below
     */
    @OneToMany(() => CartEntity, (cart) => cart.product)
    carts: CartEntity[];
}
