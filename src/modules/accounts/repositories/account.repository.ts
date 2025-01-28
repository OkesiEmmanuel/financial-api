import { Injectable } from '@nestjs/common';
import { Account } from '../entities/account.entity';
import { IAccountRepository } from '../interfaces/account.interface';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class AccountRepository implements IAccountRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createAccount(primaryAccountId: string, userId: string): Promise<Account> {
    return this.prisma.account.create({
      data: {
        virtualAccountNumber: `VA-${Math.floor(100000 + Math.random() * 900000)}`,
        primaryAccountId,
        balance: 0,
        user: {
          connect: { id: userId }, 
        },
      },
    });
  }

  async findAccountById(accountId: string): Promise<Account | null> {
    return this.prisma.account.findUnique({
      where: { id: accountId },
    });
  }

  async updateBalance(accountId: string, amount: number, type: 'deposit' | 'withdraw'): Promise<Account> {
    const operation = type === 'deposit' ? { increment: amount } : { decrement: amount };
    return this.prisma.account.update({
      where: { id: accountId },
      data: {
        balance: operation,
      },
    });
  }

  async transferFunds(fromAccountId: string, toAccountId: string, amount: number): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.account.update({
        where: { id: fromAccountId },
        data: {
          balance: { decrement: amount },
        },
      }),
      this.prisma.account.update({
        where: { id: toAccountId },
        data: {
          balance: { increment: amount },
        },
      }),
    ]);
  }
}
