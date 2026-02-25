import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

const mockUsersService = {
  findByEmail: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  createWithOAuth: jest.fn(),
  validatePassword: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn().mockReturnValue('jwt-token'),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  describe('validateUser', () => {
    it('delegates to usersService.validatePassword', async () => {
      const user = { id: 'uid', email: 'a@b.com' };
      mockUsersService.validatePassword.mockResolvedValue(user);
      const result = await service.validateUser('a@b.com', 'pass');
      expect(result).toEqual(user);
      expect(mockUsersService.validatePassword).toHaveBeenCalledWith('a@b.com', 'pass');
    });
  });

  describe('login', () => {
    it('returns user data and access token', () => {
      const user = { id: 'uid', email: 'a@b.com', name: 'Test', image: null, username: 'test' };
      const result = service.login(user);
      expect(result.accessToken).toBe('jwt-token');
      expect(result.user.id).toBe('uid');
      expect(result.user.email).toBe('a@b.com');
      expect(mockJwtService.sign).toHaveBeenCalledWith({ email: 'a@b.com', sub: 'uid' });
    });
  });

  describe('register', () => {
    it('creates user and returns login result', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);
      const created = { id: 'new', email: 'new@b.com', name: 'New', image: null, username: null };
      mockUsersService.create.mockResolvedValue(created);
      const result = await service.register({ email: 'new@b.com', password: 'pass', name: 'New' });
      expect(result.accessToken).toBe('jwt-token');
      expect(result.user.email).toBe('new@b.com');
    });

    it('throws ConflictException when email exists', async () => {
      mockUsersService.findByEmail.mockResolvedValue({ id: 'existing' });
      await expect(
        service.register({ email: 'a@b.com', password: 'pass', name: 'X' }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('googleLogin', () => {
    it('creates OAuth user and returns login result', async () => {
      const googleUser = {
        email: 'g@g.com',
        name: 'Google User',
        image: 'img.jpg',
        accessToken: 'at',
        refreshToken: 'rt',
        providerAccountId: 'gid',
      };
      mockUsersService.createWithOAuth.mockResolvedValue({
        id: 'uid',
        email: 'g@g.com',
        name: 'Google User',
        image: 'img.jpg',
        username: null,
      });
      const result = await service.googleLogin(googleUser);
      expect(result.accessToken).toBe('jwt-token');
    });

    it('throws UnauthorizedException when no google user', async () => {
      await expect(service.googleLogin(null as any)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('getProfile', () => {
    it('returns user profile', async () => {
      mockUsersService.findById.mockResolvedValue({
        id: 'uid', email: 'a@b.com', name: 'Test', image: null, username: 'test',
      });
      const result = await service.getProfile('uid');
      expect(result.id).toBe('uid');
    });

    it('throws UnauthorizedException when user not found', async () => {
      mockUsersService.findById.mockResolvedValue(null);
      await expect(service.getProfile('invalid')).rejects.toThrow(UnauthorizedException);
    });
  });
});
