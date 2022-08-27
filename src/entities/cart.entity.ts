import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';
import { UserEntity } from './user.entity';

@Entity()
export class CartEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
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
    /**
     * userId와 productId의 중복 허용
     * 이유: Primary로 할 경우 한 유저가 동일한 상품을 구매할 때 담을수 없는 경우 발생가능
     * SoftDelete 처리 시 데이터는 남아 있으므로 추가 불가
     */
}
