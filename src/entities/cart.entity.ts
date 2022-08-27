import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ProductEntity } from './product.entity';
import { UserEntity } from './user.entity';

@Entity()
export class CartEntity {
    @PrimaryColumn()
    userId: number;

    @PrimaryColumn()
    productId: number;

    @Column()
    quantity: number;

    /**
     * below are relations
     */
    @ManyToOne(() => UserEntity, (user) => user.carts)
    @JoinColumn({name: 'userId', referencedColumnName: 'id'})
    user: UserEntity;

    @ManyToOne(() => ProductEntity, (product) => product.carts)
    product: ProductEntity;
}
