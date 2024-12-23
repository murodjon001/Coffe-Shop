import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { GetCurrentUser } from 'src/infrastructure/decorators/get-current-user.decorator';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import { SystemError } from 'src/shared/system-error.enum';
import { AdministratorLocalGuard } from 'src/infrastructure/security/administrator/guards/administrator-local.guard';
import { RefreshTokenDto } from 'src/shared/dto/refresh-token.dto';
import { ClientJwtAuthGuard } from 'src/infrastructure/security/client/guards/client.jwt.guard';
import { ClientTokenEntity } from 'src/shared/entities/client-token.entity';

@Controller('clients')
export class ClientController {
  constructor(private readonly service: ClientService) {}

  @Get('me')
  @UseGuards(ClientJwtAuthGuard)
  getAdministrator(@GetCurrentUser() client: ClientTokenEntity) {
    if (client) {
      return client;
    } else {
      throw new CustomHttpException(
        'client not found',
        SystemError.NOT_FOUND,
        404,
      );
    }
  }

  @UseGuards(AdministratorLocalGuard)
  @Post('login')
  login(@GetCurrentUser() entity: ClientTokenEntity) {
    return this.service.login(entity);
  }

  @Post('refresh-token')
  refreshToken(@Body() dto: RefreshTokenDto) {
    return this.service.refreshTokenClient(dto.refreshToken);
  }
}
