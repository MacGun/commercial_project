import { BaseEntity, CreateDateColumn } from 'typeorm';

export class CreateAt extends BaseEntity {
  @CreateDateColumn()
  createAt: Date;
}
