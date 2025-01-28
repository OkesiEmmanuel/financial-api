import { Controller, Get, Post, Body, Param, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { CreateAccountDto, DepositDto, WithdrawDto, TransferDto } from '../dtos/account.dto';
import { JwtAuthGuard } from '../../../infrastructure/security/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Accounts')
@ApiBearerAuth()
@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new virtual account' })
  @ApiResponse({ status: 201, description: 'Account created successfully' })
  async createAccount(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.createAccount(createAccountDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('deposit')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Deposit funds into an account' })
  async depositFunds(@Body() depositDto: DepositDto) {
    return this.accountService.deposit(depositDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('withdraw')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Withdraw funds from an account' })
  async withdrawFunds(@Body() withdrawDto: WithdrawDto) {
    return this.accountService.withdraw(withdrawDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('transfer')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Transfer funds between accounts' })
  async transferFunds(@Body() transferDto: TransferDto) {
    return this.accountService.transferFunds(transferDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/balance')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get account balance' })
  async getAccountBalance(@Param('id') accountId: string) {
    return this.accountService.getBalance(accountId);
  }
}
