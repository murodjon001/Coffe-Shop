import { IsIn, IsOptional } from 'class-validator';
import { TOrderStatus } from '../../shared/types/order-status.type';

export class UpdateOrderDto {
  @IsOptional()
  @IsIn(['PENDING', 'CANCELLED', 'DELIVERED'])
  orderStatus?: TOrderStatus;
}
