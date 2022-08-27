import { DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { CreateAt } from './create-at.column';

export class TimeColumns extends CreateAt {
  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
