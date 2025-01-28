import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { Transaction } from '../entities/transaction.entity';
import { TransactionFilterDto } from '../dtos/transaction.dto';
import { ITransactionRepository } from '../interfaces/transaction.interface';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Find transactions with filtering and pagination
  async findTransactions(filterDto: TransactionFilterDto): Promise<{ data: Transaction[]; total: number }> {
    const { accountId, page = 1, limit = 10, type } = filterDto;

    // Build the filter criteria
    const where: any = {};
    if (accountId) {
      where.OR = [{ fromId: accountId }, { toId: accountId }];
    }
    if (type) {
      where.type = type;
    }

    // Get the total count
    const total = await this.prisma.transaction.count({ where });

    // Fetch paginated and filtered transactions
    const rawData = await this.prisma.transaction.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    // Map raw Prisma data to Transaction entity
    const data: Transaction[] = rawData.map((transaction) => ({
      id: transaction.id,
      fromId: transaction.fromId,
      toId: transaction.toId ?? undefined, // Ensure compatibility with the Transaction entity
      amount: transaction.amount,
      type: transaction.type as 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER', // Cast to valid enum
      createdAt: transaction.createdAt,
    }));

    return { data, total };
  }

// Create a new transaction
async createTransaction(fromId: string, toId: string | null, amount: number, type: string): Promise<Transaction> {
  // Ensure the `fromId` exists in the Account table (not User)
  const fromAccount = await this.prisma.account.findUnique({
    where: { id: fromId },
  });

  if (!fromAccount) {
    throw new Error('From account does not exist.');
  }

 
  if (toId) {
    const toAccount = await this.prisma.account.findUnique({
      where: { id: toId },
    });

    if (!toAccount) {
      throw new Error('To account does not exist.');
    }
  }

  // Proceed with creating the transaction
  const transaction = await this.prisma.transaction.create({
    data: {
      fromId,
      toId,
      amount,
      type,
    },
  });

  // Map Prisma result to Transaction entity
  return {
    id: transaction.id,
    fromId: transaction.fromId,
    toId: transaction.toId ?? undefined,
    amount: transaction.amount,
    type: transaction.type as 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER',
    createdAt: transaction.createdAt,
  };
}

}
