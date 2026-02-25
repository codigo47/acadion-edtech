import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const mockUsersService = {
  updateProfile: jest.fn(),
  findByUsername: jest.fn(),
};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();
    controller = module.get<UsersController>(UsersController);
    jest.clearAllMocks();
  });

  describe('updateProfile', () => {
    it('updates and returns profile', async () => {
      mockUsersService.updateProfile.mockResolvedValue({
        id: 'uid', email: 'a@b.com', name: 'New Name', image: null, username: 'user1',
      });
      const req = { user: { id: 'uid' } } as any;
      const result = await controller.updateProfile(req, { name: 'New Name' });
      expect(result.name).toBe('New Name');
    });
  });

  describe('getPublicProfile', () => {
    it('returns public profile when user exists', async () => {
      mockUsersService.findByUsername.mockResolvedValue({
        id: 'uid', name: 'Test', image: null, username: 'test',
      });
      const result = await controller.getPublicProfile('test');
      expect(result!.username).toBe('test');
    });

    it('returns null when user not found', async () => {
      mockUsersService.findByUsername.mockResolvedValue(null);
      const result = await controller.getPublicProfile('nobody');
      expect(result).toBeNull();
    });
  });
});
