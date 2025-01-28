import { Controller, Post, Body, HttpCode, HttpStatus, Param, Put } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterDto, LoginDto } from '../dtos/auth.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { BadRequestException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';

// DTOs for responses
class RegisterResponse {
  message: string;
}

class LoginResponse {
  accessToken: string;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully', type: RegisterResponse })
  @ApiResponse({ status: 400, description: 'Email already taken' })
  @ApiResponse({ status: 500, description: 'Internal server error during registration' })
  async register(@Body() registerDto: RegisterDto): Promise<RegisterResponse> {
    try {
      return await this.authService.register(registerDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('Error during registration');
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login a user and get an access token' })
  @ApiResponse({ status: 200, description: 'User logged in successfully', type: LoginResponse })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiResponse({ status: 500, description: 'Internal server error during login' })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(error.message);
      }
      throw new InternalServerErrorException('Error during login');
    }
  }

  @Put('reset-password/:userId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset the user\'s password' })
  @ApiResponse({ status: 200, description: 'Password updated successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error during password reset' })
  async resetPassword(
    @Param('userId') userId: string,
    @Body() { newPassword }: { newPassword: string },
  ): Promise<{ message: string }> {
    try {
      return await this.authService.resetPassword(userId, newPassword);
    } catch (error) {
      throw new InternalServerErrorException('Error during password reset');
    }
  }
}
