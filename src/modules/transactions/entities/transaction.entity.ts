export class Transaction {
    id: string;
    fromId: string;
    toId?: string;
    amount: number;
    type: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER';
    createdAt: Date;
  }
  