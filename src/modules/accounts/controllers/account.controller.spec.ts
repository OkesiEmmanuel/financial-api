// import { Test, TestingModule } from '@nestjs/testing';
// import { AccountController } from './account.controller';
// import { AccountService } from '../services/account.service';

// describe('AccountController', () => {
//   let controller: AccountController;
//   let service: AccountService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [AccountController],
//       providers: [
//         {
//           provide: AccountService,
//           useValue: {
//             createAccount: jest.fn(),
//             deposit: jest.fn(),
//             withdraw: jest.fn(),
//             transferFunds: jest.fn(),
//             getBalance: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     controller = module.get<AccountController>(AccountController);
//     service = module.get<AccountService>(AccountService);
//   });

//   it('should create a new account', async () => {
//     const mockAccount = { id: 'uuid', virtualAccountNumber: 'VA-123456', balance: 0 };
//     jest.spyOn(service, 'createAccount').mockResolvedValue(mockAccount);

//     const result = await controller.createAccount({ primaryAccountId: 'primary123' });

//     expect(result).toEqual(mockAccount);
//     expect(service.createAccount).toHaveBeenCalledWith({ primaryAccountId: 'primary123' });
//   });

//   it('should deposit funds', async () => {
//     const mockAccount = { id: 'uuid', balance: 1500 };
//     jest.spyOn(service, 'deposit').mockResolvedValue(mockAccount);

//     const result = await controller.depositFunds({ accountId: 'uuid', amount: 500 });

//     expect(result).toEqual(mockAccount);
//     expect(service.deposit).toHaveBeenCalledWith({ accountId: 'uuid', amount: 500 });
//   });

//   it('should withdraw funds', async () => {
//     const mockAccount = { id: 'uuid', balance: 500 };
//     jest.spyOn(service, 'withdraw').mockResolvedValue(mockAccount);

//     const result = await controller.withdrawFunds({ accountId: 'uuid', amount: 500 });

//     expect(result).toEqual(mockAccount);
//     expect(service.withdraw).toHaveBeenCalledWith({ accountId: 'uuid', amount: 500 });
//   });

//   it('should transfer funds', async () => {
//     jest.spyOn(service, 'transferFunds').mockResolvedValue({ message: 'Funds transferred successfully' });

//     const result = await controller.transferFunds({
//       fromAccountId: 'from-id',
//       toAccountId: 'to-id',
//       amount: 500,
//     });

//     expect(result.message).toEqual('Funds transferred successfully');
//     expect(service.transferFunds).toHaveBeenCalledWith({
//       fromAccountId: 'from-id',
//       toAccountId: 'to-id',
//       amount: 500,
//     });
//   });

//   it('should get account balance', async () => {
//     jest.spyOn(service, 'getBalance').mockResolvedValue({ balance: 1000 });

//     const result = await controller.getAccountBalance('uuid');

//     expect(result.balance).toEqual(1000);
//     expect(service.getBalance).toHaveBeenCalledWith('uuid');
//   });
// });
