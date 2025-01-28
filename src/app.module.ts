import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auths/auths.module';
import { AccountsModule } from './modules/accounts/accounts.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { ConfigModule } from './config/config.module';
import { UtilsModule } from './utils/utils.module';
import { SecurityModule } from './infrastructure/security/security.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { PrismaService } from './infrastructure/prisma/prisma.service';

@Module({
  imports: [AuthModule, AccountsModule, TransactionsModule, ConfigModule, UtilsModule, SecurityModule, PrismaModule],
  controllers: [],
  providers: [ PrismaService],
})
export class AppModule {}
