import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { ProductDto } from '@root/entities/dto/product.dto';
import { ProductRepository } from '@root/entities/repositories/product.repository';
import { ProductService } from '@root/services/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  /**
   * 1. 상품등록
   * 2. 상품조회
   * 3. 상품삭제
   */

  @ApiBody({ description: '상품 등록', type: ProductDto })
  @ApiOperation({ summary: '상품의 정보 등록' })
  @Post('enroll')
  async enrollProduct(@Body() productDto: ProductDto) {
    return await this.productService.enrollProduct(productDto);
  }

  @ApiParam({ name: 'id', description: '조회할 상품의 아이디', example: 1 })
  @ApiOperation({ summary: '상품의 정보 조회' })
  @Get(':id')
  async findProduct(@Param('id') id: number) {
    return await this.productService.findProduct(id);
  }

  @ApiParam({ name: 'id', description: '삭제할 상품의 아이디', example: 1 })
  @ApiOperation({ summary: '상품의 정보 삭제' })
  @Get(':id')
  async deleteProduct(@Param('id') id: number) {
    return await this.productService.deleteProduct(id);
  }
}
