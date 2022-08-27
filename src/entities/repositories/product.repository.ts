import { CustomRepository } from '@root/settings/typeorm/custom-typeorm.decorator';
import { Repository } from 'typeorm/repository/Repository';
import { ProductEntity } from '../product.entity';

@CustomRepository(ProductEntity)
export class ProductRepository extends Repository<ProductEntity> {}
