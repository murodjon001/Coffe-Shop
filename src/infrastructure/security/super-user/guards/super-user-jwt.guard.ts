import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SuperUserJwtGuard extends AuthGuard('super-user-jwt-guard') {}
