/* eslint-disable prettier/prettier */
import { User } from '../entities/auth.entity';

export interface IAuthRepository {
  createUser(email: string, hashedPassword: string): Promise<User>;
  findUserByEmail(email: string): Promise<User | null>;
  findUserById(userId: string): Promise<User | null>;
  updateUserPassword(userId: string, newHashedPassword: string): Promise<User>;
  deleteUser(userId: string): Promise<void>;
}
