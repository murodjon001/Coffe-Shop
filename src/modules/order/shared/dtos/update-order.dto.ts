import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';
import { TOrderStatus } from '../../shared/types/order-status.type';

export class UpdateOrderDto {
  @IsOptional()
  @IsIn(['PENDING', 'CANCELLED', 'DELIVERED'])
  orderStatus?: TOrderStatus;

  @IsOptional()
  @MaxLength(500)
  @IsString()
  clientNote?: string;
}
