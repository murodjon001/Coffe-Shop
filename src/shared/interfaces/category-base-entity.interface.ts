import { IBaseEntity } from "./base-entity.interface";

export interface ICategoryBaseEntity extends IBaseEntity{
    title: string;
    image?: string;
    isActive: boolean;
    menuId: string;
    coffeeShopId: string;
}