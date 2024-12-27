import { CategoryBaseEntity } from 'src/shared/entities/category-base.entity';
import { ICategoryBaseEntity } from 'src/shared/interfaces/category-base-entity.interface';

export class CategoryEntity extends CategoryBaseEntity {
  constructor(params: ICategoryBaseEntity) {
    super(params);
  }
}
