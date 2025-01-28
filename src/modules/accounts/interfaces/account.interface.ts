import { Account } from '../entities/account.entity';

export interface IAccountRepository {
  createAccount(primaryAccountId: string, userId: string): Promise<Account>;
  findAccountById(accountId: string): Promise<Account | null>;
  updateBalance(accountId: string, amount: number, type: 'deposit' | 'withdraw'): Promise<Account>;
  transferFunds(fromAccountId: string, toAccountId: string, amount: number): Promise<void>;
}
