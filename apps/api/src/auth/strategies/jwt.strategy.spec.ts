import { UnauthorizedException } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  const mockConfigService = { get: jest.fn().mockReturnValue('test-secret') } as unknown as ConfigService;
  const mockUsersService = { findById: jest.fn() } as unknown as UsersService;

  beforeEach(() => {
    strategy = new JwtStrategy(mockConfigService, mockUsersService);
    jest.clearAllMocks();
  });

  it('returns user when payload is valid', async () => {
    const user = { id: 'uid', email: 'a@b.com' };
    (mockUsersService.findById as jest.Mock).mockResolvedValue(user);
    const result = await strategy.validate({ sub: 'uid', email: 'a@b.com' });
    expect(result).toEqual(user);
  });

  it('throws UnauthorizedException when user not found', async () => {
    (mockUsersService.findById as jest.Mock).mockResolvedValue(null);
    await expect(strategy.validate({ sub: 'invalid', email: 'x@y.com' })).rejects.toThrow(UnauthorizedException);
  });
});
