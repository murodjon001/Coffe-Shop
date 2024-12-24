import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { GetCurrentUser } from 'src/infrastructure/decorators/get-current-user.decorator';
import { AdministratorLocalGuard } from 'src/infrastructure/security/administrator/guards/administrator-local.guard';
import { RefreshTokenDto } from 'src/shared/dto/refresh-token.dto';
import { ClientJwtAuthGuard } from 'src/infrastructure/security/client/guards/client.jwt.guard';
import { ClientTokenEntity } from 'src/shared/entities/client-token.entity';
import { RegistrationClientDto } from './dto/registration-client.dto';
import { EmailDto } from './dto/email.dto';
import { OtpDto } from './dto/otp.dto';
import { UpdatePersonalDataDto } from './dto/update-personal-data.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('clients')
export class ClientController {
  constructor(private readonly service: ClientService) {}

  @Get('me')
  @UseGuards(ClientJwtAuthGuard)
  getAdministrator(@GetCurrentUser() client: ClientTokenEntity) {
    return client;
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

  @Post('registration')
  registrationClient(@Body() dto: RegistrationClientDto) {
    return this.service.registrationClient(dto);
  }

  @Post('otp')
  resendOtp(@Body() dto: EmailDto) {
    return this.service.resendOtp(dto);
  }

  @Post('confirmed')
  confirmClient(@Body() dto: OtpDto) {
    return this.service.confirmClient(dto);
  }

  @UseGuards(ClientJwtAuthGuard)
  @Patch('personal-data')
  updatePersonalDataClient(
    @GetCurrentUser() client: ClientTokenEntity,
    dto: UpdatePersonalDataDto,
  ) {
    return this.service.updatePersonalDataClient(client.id, dto);
  }

  @UseGuards(ClientJwtAuthGuard)
  @Patch('password')
  updatePassword(
    @GetCurrentUser() client: ClientTokenEntity,
    dto: UpdatePasswordDto,
  ) {
    return this.service.updatePassword(client.id, dto);
  }
}
