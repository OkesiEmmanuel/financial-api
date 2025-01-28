import { Injectable, BadRequestException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
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

  // Register a new user
  async register(registerDto: RegisterDto): Promise<{ message: string }> {
    const existingUser = await this.authRepo.findUserByEmail(registerDto.email);
    if (existingUser) {
      throw new BadRequestException('Email already taken');
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    try {
      // Create the user in the repository
      await this.authRepo.createUser(registerDto.email, hashedPassword);
    } catch (error) {
      throw new InternalServerErrorException('Error registering user');
    }

    return { message: 'User registered successfully' };
  }

  // Login user and generate JWT token
  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.authRepo.findUserByEmail(loginDto.email);
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { userId: user.id, email: user.email };

    // Sign the JWT with optional expiration time
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1h', // token expires in 1 hour
    });

    return { accessToken };
  }

  //validate the JWT token and return user info
  async validateUser(payload: any): Promise<any> {
    return await this.authRepo.findUserById(payload.userId);
  }

  async resetPassword(userId: string, newPassword: string): Promise<{ message: string }> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    try {
      const user = await this.authRepo.updateUserPassword(userId, hashedPassword);
      return { message: 'Password updated successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Error updating password');
    }
  }
}
