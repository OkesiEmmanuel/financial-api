import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from '../repositories/auth.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto, LoginDto } from '../dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepo: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ message: string }> {
    const existingUser = await this.authRepo.findUserByEmail(registerDto.email);
    if (existingUser) {
      throw new BadRequestException('Email already taken');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    await this.authRepo.createUser(registerDto.email, hashedPassword);

    return { message: 'User registered successfully' };
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.authRepo.findUserByEmail(loginDto.email);
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { userId: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
