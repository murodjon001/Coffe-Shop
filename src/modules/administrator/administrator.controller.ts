import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { AdministratorJwtGuard } from 'src/infrastructure/security/administrator/guards/administrator-jwt.guard';
import { GetCurrentUser } from 'src/infrastructure/decorators/get-current-user.decorator';
import { AdministratorTokenEntity } from 'src/shared/entities/administrator-token.entity';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import { SystemError } from 'src/shared/system-error.enum';
import { AdministratorLocalGuard } from 'src/infrastructure/security/administrator/guards/administrator-local.guard';
import { RefreshTokenDto } from 'src/shared/dto/refresh-token.dto';

@Controller('administrators')
export class AdministratorController {
  constructor(private readonly service: AdministratorService) {}

  @Get('me')
  @UseGuards(AdministratorJwtGuard)
  getAdministrator(@GetCurrentUser() administrator: AdministratorTokenEntity) {
    if (administrator) {
      return administrator;
    } else {
      throw new CustomHttpException(
        'Administrator not found',
        SystemError.NOT_FOUND,
        404,
      );
    }
  }

  @UseGuards(AdministratorLocalGuard)
  @Post('login')
  login(@GetCurrentUser() entity: AdministratorTokenEntity) {
    return this.service.login(entity);
  }

  @Post('refresh-token')
  refreshToken(@Body() dto: RefreshTokenDto) {
    return this.service.refreshTokenAdministrator(dto.refreshToken);
  }
}
