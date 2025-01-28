import { Transaction } from '../entities/transaction.entity';
import { TransactionFilterDto } from '../dtos/transaction.dto';

export interface ITransactionRepository {
  findTransactions(filterDto: TransactionFilterDto): Promise<{ data: Transaction[]; total: number }>;
  createTransaction(fromId: string, toId: string | null, amount: number, type: string): Promise<Transaction>;
}
