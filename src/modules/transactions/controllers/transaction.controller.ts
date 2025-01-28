import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { TransactionFilterDto, CreateTransactionDto } from '../dtos/transaction.dto';
import { JwtAuthGuard } from '../../../infrastructure/security/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiQuery, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Transactions')
@ApiBearerAuth()
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(JwtAuthGuard)
  @Get('history')
  @ApiOperation({ summary: 'Retrieve transaction history with filters and pagination' })
  @ApiResponse({ status: 200, description: 'Transaction history retrieved successfully' })
  async getTransactionHistory(@Query() filterDto: TransactionFilterDto) {
    return this.transactionService.getTransactions(filterDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiOperation({ summary: 'Create a transaction (transfer, deposit, withdrawal)' })
  @ApiResponse({ status: 201, description: 'Transaction created successfully' })
  async createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.createTransaction(createTransactionDto);
  }
}
