import { Injectable } from '@nestjs/common';
import { MenuRepository } from '../repository/menu.repository';

@Injectable()
export class MenuPublicService {
  constructor(private readonly repository: MenuRepository) {}
  async getMenusByShopId(shopId: string) {
    return this.repository.findMenusWithItemsByShopId(shopId);
  }
}
