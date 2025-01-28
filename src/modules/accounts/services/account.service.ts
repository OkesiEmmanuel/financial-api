import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { AccountRepository } from '../repositories/account.repository';
import { CreateAccountDto, DepositDto, WithdrawDto, TransferDto } from '../dtos/account.dto';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async createAccount(createAccountDto: CreateAccountDto) {
    return this.accountRepository.createAccount(createAccountDto.primaryAccountId, createAccountDto.userId);
  }

  async deposit(depositDto: DepositDto) {
    const account = await this.accountRepository.findAccountById(depositDto.accountId);
    if (!account) {
      throw new NotFoundException('Account not found');
    }
    return this.accountRepository.updateBalance(depositDto.accountId, depositDto.amount, 'deposit');
  }

  async withdraw(withdrawDto: WithdrawDto) {
    const account = await this.accountRepository.findAccountById(withdrawDto.accountId);
    if (!account) {
      throw new NotFoundException('Account not found');
    }
    if (account.balance < withdrawDto.amount) {
      throw new BadRequestException('Insufficient balance');
    }
    return this.accountRepository.updateBalance(withdrawDto.accountId, withdrawDto.amount, 'withdraw');
  }

  async transferFunds(transferDto: TransferDto) {
    const { fromAccountId, toAccountId, amount } = transferDto;

    const fromAccount = await this.accountRepository.findAccountById(fromAccountId);
    const toAccount = await this.accountRepository.findAccountById(toAccountId);

    if (!fromAccount || !toAccount) {
      throw new NotFoundException('One or both accounts not found');
    }

    if (fromAccount.balance < amount) {
      throw new BadRequestException('Insufficient balance in source account');
    }

    await this.accountRepository.transferFunds(fromAccountId, toAccountId, amount);

    return { message: 'Funds transferred successfully' };
  }

  async getBalance(accountId: string) {
    const account = await this.accountRepository.findAccountById(accountId);
    if (!account) {
      throw new NotFoundException('Account not found');
    }
    return { balance: account.balance };
  }
}
