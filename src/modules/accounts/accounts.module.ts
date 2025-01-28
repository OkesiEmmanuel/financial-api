import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account.controller';
import { AccountService } from './services/account.service';
import { AccountRepository } from './repositories/account.repository';

@Module({
  controllers: [AccountController],
  providers: [AccountService, AccountRepository],
})
export class AccountsModule {}
