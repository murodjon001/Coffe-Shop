import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SuperUserLocalGuard extends AuthGuard('super-user-local-guard') {}
