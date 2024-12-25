import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GetCurrentUser } from 'src/infrastructure/decorators/get-current-user.decorator';
import { RefreshTokenDto } from 'src/shared/dto/refresh-token.dto';
import { SuperUserService } from './super-user.service';
import { SuperUserJwtGuard } from 'src/infrastructure/security/super-user/guards/super-user-jwt.guard';
import { SuperUserTokenEntity } from 'src/shared/entities/super-user-token.entity';
import { SuperUserLocalGuard } from 'src/infrastructure/security/super-user/guards/super-user-local.guard';

@Controller('super-users')
export class SuperUserController {
  constructor(private readonly service: SuperUserService) {}

  @Get('me')
  @UseGuards(SuperUserJwtGuard)
  getSuperUser(@GetCurrentUser() superUser: SuperUserTokenEntity) {
    return superUser;
  }

  @UseGuards(SuperUserLocalGuard)
  @Post('login')
  login(@GetCurrentUser() entity: SuperUserTokenEntity) {
    return this.service.login(entity);
  }

  @Post('refresh-token')
  refreshToken(@Body() dto: RefreshTokenDto) {
    return this.service.refreshTokenSuperUser(dto.refreshToken);
  }
}
