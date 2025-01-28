import { Injectable, NotFoundException } from '@nestjs/common';
import { IAuthRepository } from '../interfaces/auth.interface';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { User } from '../entities/auth.entity';
import { ResetPasswordDto } from '../dtos/auth.dto';


@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(email: string, hashedPassword: string): Promise<User> {
    return await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findUserById(userId: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUserPassword(
    userId: string,
    newHashedPassword: string,
  ): Promise<User> {
    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        password: newHashedPassword,
      },
    });
  }

  async resetPassword( 
    userId: string,
    resetPasswordDto: ResetPasswordDto
  ): Promise<User | null>{
    return this.updateUserPassword(
      userId,
      resetPasswordDto.newPassword);
  }

  async deleteUser(userId: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id: userId },
    });
  }
}
