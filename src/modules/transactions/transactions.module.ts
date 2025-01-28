import { Module } from '@nestjs/common';
import { TransactionService } from './services/transaction.service';
import { TransactionController } from './controllers/transaction.controller';
import { TransactionRepository } from './repositories/transaction.repository';

@Module({
  providers: [TransactionService, TransactionRepository],
  controllers: [TransactionController]
})
export class TransactionsModule {}
