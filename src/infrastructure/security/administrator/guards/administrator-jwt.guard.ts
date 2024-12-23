import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdministratorJwtGuard extends AuthGuard(
  'administrator-jwt-guard',
) {}
