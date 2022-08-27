import { PickType } from '@nestjs/swagger';
import { ProductEntity } from '../product.entity';

export class ProductDto extends PickType(ProductEntity, [
  'name',
  'price',
  'stock',
  'isSale',
  'minQuantity',
  'maxQuantity',
  'deliveryFee',
] as const) {}
