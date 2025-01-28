import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  providers: [JwtService, JwtStrategy]
})
export class SecurityModule {}
