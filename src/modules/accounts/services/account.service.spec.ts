// import { Test, TestingModule } from '@nestjs/testing';
// import { AccountService } from './account.service';
// import { AccountRepository } from '../repositories/account.repository';
// import { NotFoundException, BadRequestException } from '@nestjs/common';

// describe('AccountService', () => {
//   let service: AccountService;
//   let repository: AccountRepository;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         AccountService,
//         {
//           provide: AccountRepository,
//           useValue: {
//             createAccount: jest.fn(),
//             findAccountById: jest.fn(),
//             updateBalance: jest.fn(),
//             transferFunds: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     service = module.get<AccountService>(AccountService);
//     repository = module.get<AccountRepository>(AccountRepository);
//   });

//   it('should create a new account', async () => {
//     const mockAccount = { id: 'uuid', virtualAccountNumber: 'VA-123456', balance: 0 };
//     jest.spyOn(repository, 'createAccount').mockResolvedValue(mockAccount);

//     const result = await service.createAccount({ primaryAccountId: 'primary123' });

//     expect(result).toEqual(mockAccount);
//     expect(repository.createAccount).toHaveBeenCalledWith('primary123');
//   });

//   it('should deposit funds into an account', async () => {
//     const mockAccount = { id: 'uuid', balance: 1000 };
//     jest.spyOn(repository, 'findAccountById').mockResolvedValue(mockAccount);
//     jest.spyOn(repository, 'updateBalance').mockResolvedValue({ ...mockAccount, balance: 1500 });

//     const result = await service.deposit({ accountId: 'uuid', amount: 500 });

//     expect(result.balance).toEqual(1500);
//     expect(repository.updateBalance).toHaveBeenCalledWith('uuid', 500, 'deposit');
//   });

//   it('should throw error when withdrawing from a non-existent account', async () => {
//     jest.spyOn(repository, 'findAccountById').mockResolvedValue(null);

//     await expect(service.withdraw({ accountId: 'uuid', amount: 500 })).rejects.toThrow(NotFoundException);
//   });

//   it('should throw error when insufficient balance for withdrawal', async () => {
//     const mockAccount = { id: 'uuid', balance: 300 };
//     jest.spyOn(repository, 'findAccountById').mockResolvedValue(mockAccount);

//     await expect(service.withdraw({ accountId: 'uuid', amount: 500 })).rejects.toThrow(BadRequestException);
//   });

//   it('should transfer funds between accounts', async () => {
//     const mockFromAccount = { id: 'from-id', balance: 2000 };
//     const mockToAccount = { id: 'to-id', balance: 1000 };

//     jest.spyOn(repository, 'findAccountById').mockResolvedValueOnce(mockFromAccount).mockResolvedValueOnce(mockToAccount);
//     jest.spyOn(repository, 'transferFunds').mockResolvedValue(undefined);

//     const result = await service.transferFunds({
//       fromAccountId: 'from-id',
//       toAccountId: 'to-id',
//       amount: 500,
//     });

//     expect(result.message).toEqual('Funds transferred successfully');
//     expect(repository.transferFunds).toHaveBeenCalledWith('from-id', 'to-id', 500);
//   });
// });
