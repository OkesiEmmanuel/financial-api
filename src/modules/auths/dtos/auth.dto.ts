import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'user1@ddevwizard.com', description: 'User email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'SecurePass123', description: 'User password', minLength: 6 })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class LoginDto {
  @ApiProperty({ example: 'user1@devwizard.com', description: 'User email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'SecurePass123', description: 'User password' })
  @IsNotEmpty()
  password: string;
}
