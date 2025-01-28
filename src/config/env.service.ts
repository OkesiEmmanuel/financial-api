/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
  constructor(private readonly configService: ConfigService) {}

  get jwtSecret(): string {
    const secret = this.configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('Missing environment variable: JWT_SECRET');
    }
    return secret;
  }

  get databaseUrl(): string {
    const dbUrl = this.configService.get<string>('DATABASE_URL');
    if (!dbUrl) {
      throw new Error('Missing environment variable: DATABASE_URL');
    }
    return dbUrl;
  }
}
