import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class DirectorLocalGuard extends AuthGuard('director-local-guard') {}
