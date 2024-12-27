import { ICategoryBaseEntity } from 'src/shared/interfaces/category-base-entity.interface';
import { IProductBaseEntity } from 'src/shared/interfaces/product-base-entity.interface';

export interface IPrismaMenuProduct {
  categoryId: string;
  menuId: string;
  category: ICategoryBaseEntity;

  products: IProductMenuItem[];
}

interface IProductMenuItem {
  product: IProductBaseEntity;
}
