import { Injectable } from '@nestjs/common';
import { ProductDto } from '@root/entities/dto/product.dto';
import { ProductRepository } from '@root/entities/repositories/product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async enrollProduct(productDto: ProductDto) {
    return await this.productRepository.create(productDto);
  }

  async findProduct(id: number) {
    return await this.productRepository.findOneBy({ id });
  }

  async deleteProduct(id: number) {
    return await this.productRepository.softDelete({ id });
  }
}
