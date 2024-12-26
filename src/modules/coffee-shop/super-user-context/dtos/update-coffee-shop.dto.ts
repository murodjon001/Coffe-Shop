import { PartialType } from '@nestjs/mapped-types';
import { CreateCoffeeShopDto } from './create-coffee-shop.dto';

export class UpdateCoffeeShopDto extends PartialType(CreateCoffeeShopDto) {}
