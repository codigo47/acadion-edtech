import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const mockAuthService = {
  register: jest.fn(),
  login: jest.fn(),
  googleLogin: jest.fn(),
  getProfile: jest.fn(),
};

const mockConfigService = {
  get: jest.fn().mockReturnValue('http://localhost:8000'),
};

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();
    controller = module.get<AuthController>(AuthController);
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('delegates to authService.register', async () => {
      mockAuthService.register.mockResolvedValue({ accessToken: 'token' });
      const result = await controller.register({ email: 'a@b.com', password: 'pass', name: 'Test' });
      expect(result.accessToken).toBe('token');
    });
  });

  describe('login', () => {
    it('delegates to authService.login', () => {
      mockAuthService.login.mockReturnValue({ accessToken: 'token' });
      const req = { user: { id: 'uid', email: 'a@b.com' } };
      const result = controller.login(req as any);
      expect(result.accessToken).toBe('token');
    });
  });

  describe('googleAuthCallback', () => {
    it('redirects with token', async () => {
      mockAuthService.googleLogin.mockResolvedValue({
        accessToken: 'jwt',
        user: { id: 'uid', email: 'g@g.com', name: 'G User' },
      });
      const redirect = jest.fn();
      const req = { user: { email: 'g@g.com', name: 'G', accessToken: 'at', refreshToken: 'rt', providerAccountId: 'gid' } };
      await controller.googleAuthCallback(req as any, { redirect } as any);
      expect(redirect).toHaveBeenCalledWith(expect.stringContaining('token=jwt'));
    });
  });

  describe('getProfile', () => {
    it('returns profile for authenticated user', async () => {
      mockAuthService.getProfile.mockResolvedValue({ id: 'uid', email: 'a@b.com' });
      const req = { user: { id: 'uid' } };
      const result = await controller.getProfile(req as any);
      expect(result.id).toBe('uid');
    });
  });

  describe('logout', () => {
    it('returns success message', () => {
      const result = controller.logout();
      expect(result.message).toBe('Logged out successfully');
    });
  });
});
