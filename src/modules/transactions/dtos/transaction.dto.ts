import { IsUUID, IsNumber, Min, IsOptional, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum TransferType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  TRANSFER = 'TRANSFER',
}
export class TransactionFilterDto {
  @ApiProperty({ example: 'uuid-of-account', description: 'Filter by account ID', required: false })
  @IsUUID()
  @IsOptional()
  accountId?: string;

  @ApiProperty({ example: 1, description: 'Page number for pagination', required: false })
  @IsNumber()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiProperty({ example: 10, description: 'Number of records per page', required: false })
  @IsNumber()
  @Min(1)
  @IsOptional()
  limit?: number = 10;

  @ApiProperty({ example: 'TRANSFER', description: 'Transaction type (DEPOSIT, WITHDRAWAL, TRANSFER)', required: false })
  @IsOptional()
  type?: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER';
}

export class CreateTransactionDto {
  @ApiProperty({ example: 'uuid-of-from-account', description: 'Account ID of sender' })
  @IsUUID()
  fromId: string;

  @ApiProperty({ example: 'uuid-of-to-account', description: 'Account ID of receiver (optional)', required: false })
  @IsUUID()
  @IsOptional()
  toId?: string;

  @ApiProperty({ example: 500, description: 'Amount to transfer', minimum: 1 })
  @IsNumber()
  @Min(1)
  amount: number;

  @ApiProperty({ example: 'TRANSFER', description: 'Transaction type (DEPOSIT, WITHDRAWAL, TRANSFER)' })
  
  @IsEnum(TransferType)
  @IsNotEmpty()
  type: TransferType;
}
