import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { GetCurrentUser } from 'src/infrastructure/decorators/get-current-user.decorator';
import { RefreshTokenDto } from 'src/shared/dto/refresh-token.dto';
import { ClientJwtAuthGuard } from 'src/infrastructure/security/client/guards/client.jwt.guard';
import { ClientTokenEntity } from 'src/shared/entities/client-token.entity';
import { RegistrationClientDto } from './dto/registration-client.dto';
import { EmailDto } from './dto/email.dto';
import { OtpDto } from './dto/otp.dto';
import { UpdatePersonalDataDto } from './dto/update-personal-data.dto';
import { UpdatePasswordDto } from '../shared/dto/update-password.dto';
import { ClientLocalGuard } from 'src/infrastructure/security/client/guards/client.local.guard';

@Controller('clients')
export class ClientController {
  constructor(private readonly service: ClientService) {}

  @Get('me')
  @UseGuards(ClientJwtAuthGuard)
  getAdministrator(@GetCurrentUser() client: ClientTokenEntity) {
    return client;
  }

  @UseGuards(ClientLocalGuard)
  @Post(':shopId/login')
  login(@GetCurrentUser() entity: ClientTokenEntity) {
    return this.service.login(entity);
  }

  @Post('refresh-token')
  refreshToken(@Body() dto: RefreshTokenDto) {
    return this.service.refreshTokenClient(dto.refreshToken);
  }

  @Post('registration')
  registrationClient(@Body() dto: RegistrationClientDto) {
    return this.service.registrationClient(dto);
  }

  @Post(':shopId/otp')
  resendOtp(@Body() dto: EmailDto, @Param('shopId') shopId: string) {
    return this.service.resendOtp(dto, shopId);
  }

  @Post(':shopId/confirmed')
  confirmClient(@Body() dto: OtpDto, @Param('shopId') shopId: string) {
    return this.service.confirmClient(dto, shopId);
  }

  @UseGuards(ClientJwtAuthGuard)
  @Patch('personal-data')
  updatePersonalDataClient(
    @GetCurrentUser() client: ClientTokenEntity,
    @Body() dto: UpdatePersonalDataDto,
  ) {
    return this.service.updatePersonalDataClient(client.id, dto);
  }

  @UseGuards(ClientJwtAuthGuard)
  @Patch('password')
  updatePassword(
    @GetCurrentUser() client: ClientTokenEntity,
    @Body() dto: UpdatePasswordDto,
  ) {
    return this.service.updatePassword(client.id, dto);
  }
}
