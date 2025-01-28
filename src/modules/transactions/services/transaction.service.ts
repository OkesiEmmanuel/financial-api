import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../repositories/transaction.repository';
import { TransactionFilterDto, CreateTransactionDto } from '../dtos/transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async getTransactions(filterDto: TransactionFilterDto) {
    return this.transactionRepository.findTransactions(filterDto);
  }

  async createTransaction(createTransactionDto: CreateTransactionDto) {
    const { fromId, toId, amount, type } = createTransactionDto;
    return this.transactionRepository.createTransaction(fromId, toId as any, amount, type);
  }
}
