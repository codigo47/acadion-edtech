import { UnauthorizedException } from '@nestjs/common';
import { LocalStrategy } from './local.strategy';
import { UsersService } from '../../users/users.service';

describe('LocalStrategy', () => {
  let strategy: LocalStrategy;
  const mockUsersService = { validatePassword: jest.fn() } as unknown as UsersService;

  beforeEach(() => {
    strategy = new LocalStrategy(mockUsersService);
    jest.clearAllMocks();
  });

  it('returns user when credentials are valid', async () => {
    const user = { id: 'uid', email: 'a@b.com' };
    (mockUsersService.validatePassword as jest.Mock).mockResolvedValue(user);
    const result = await strategy.validate('a@b.com', 'pass');
    expect(result).toEqual(user);
  });

  it('throws UnauthorizedException when credentials are invalid', async () => {
    (mockUsersService.validatePassword as jest.Mock).mockResolvedValue(null);
    await expect(strategy.validate('a@b.com', 'wrong')).rejects.toThrow(UnauthorizedException);
  });
});
