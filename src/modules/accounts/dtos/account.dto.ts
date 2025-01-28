import { IsNotEmpty, IsUUID, IsNumber, Min, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  @ApiProperty({ example: 'abc123', description: 'Primary account ID' })
  @IsNotEmpty()
  primaryAccountId: string;

  @ApiProperty({ example: 'user123', description: 'User ID' })
  @IsNotEmpty()
  userId: string;
}

export class DepositDto {
  @ApiProperty({ example: 'uuid-of-account', description: 'Account ID to deposit funds into' })
  @IsUUID()
  accountId: string;

  @ApiProperty({ example: 5000, description: 'Amount to deposit', minimum: 1 })
  @IsNumber()
  @Min(1)
  amount: number;
}

export class WithdrawDto {
  @ApiProperty({ example: 'uuid-of-account', description: 'Account ID to withdraw funds from' })
  @IsUUID()
  accountId: string;

  @ApiProperty({ example: 2000, description: 'Amount to withdraw', minimum: 1 })
  @IsNumber()
  @Min(1)
  amount: number;
}

export class TransferDto {
  @ApiProperty({ example: 'uuid-of-from-account', description: 'Account ID of sender' })
  @IsUUID()
  fromAccountId: string;

  @ApiProperty({ example: 'uuid-of-to-account', description: 'Account ID of receiver' })
  @IsUUID()
  toAccountId: string;

  @ApiProperty({ example: 1000, description: 'Amount to transfer', minimum: 1 })
  @IsNumber()
  @Min(1)
  amount: number;
}

