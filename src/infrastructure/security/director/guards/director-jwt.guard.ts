import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class DirectorJwtGuard extends AuthGuard('director-jwt-guard') {}
