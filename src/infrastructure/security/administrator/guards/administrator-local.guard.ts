import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdministratorLocalGuard extends AuthGuard(
  'administrator-local-guard',
) {}
