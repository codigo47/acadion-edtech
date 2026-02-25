import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrisma = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  account: { create: jest.fn(), update: jest.fn() },
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('creates user without username', async () => {
      mockPrisma.user.create.mockResolvedValue({
        id: 'new-id',
        email: 'a@b.com',
        name: null,
        image: null,
        username: null,
      });
      const user = await service.create({ email: 'a@b.com', password: 'pass' });
      expect(user.email).toBe('a@b.com');
      expect(mockPrisma.user.findUnique).not.toHaveBeenCalled();
    });

    it('throws ConflictException when username is taken', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({ id: 'other', username: 'taken' });
      await expect(
        service.create({ email: 'new@b.com', password: 'pass', username: 'taken' }),
      ).rejects.toThrow(ConflictException);
      expect(mockPrisma.user.create).not.toHaveBeenCalled();
    });

    it('creates user with available username', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null); // username not taken
      mockPrisma.user.create.mockResolvedValue({
        id: 'new-id',
        email: 'a@b.com',
        username: 'myuser',
      });
      const user = await service.create({ email: 'a@b.com', password: 'pass', username: 'myuser' });
      expect(user.username).toBe('myuser');
    });
  });

  describe('updateProfile', () => {
    it('updates name and username when username is free', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null); // username free
      mockPrisma.user.update.mockResolvedValue({ id: 'uid', name: 'New', username: 'newname' });

      await service.updateProfile('uid', { name: 'New', username: 'newname' });
      expect(mockPrisma.user.update).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: 'uid' } }),
      );
    });

    it('allows keeping the same username (owner)', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({ id: 'uid', username: 'same' }); // same user
      mockPrisma.user.update.mockResolvedValue({ id: 'uid', username: 'same' });

      await service.updateProfile('uid', { username: 'same' });
      expect(mockPrisma.user.update).toHaveBeenCalled();
    });

    it('throws ConflictException when username is taken by another user', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({ id: 'other-id', username: 'taken' });
      await expect(
        service.updateProfile('my-id', { username: 'taken' }),
      ).rejects.toThrow(ConflictException);
    });

    it('updates only provided fields', async () => {
      mockPrisma.user.update.mockResolvedValue({ id: 'uid', name: 'Only Name' });
      await service.updateProfile('uid', { name: 'Only Name' });
      const call = mockPrisma.user.update.mock.calls[0][0];
      expect(call.data.username).toBeUndefined();
    });
  });

  describe('validatePassword', () => {
    it('returns null when user not found', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      const result = await service.validatePassword('a@b.com', 'pass');
      expect(result).toBeNull();
    });

    it('returns null when user has no password (OAuth)', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({ id: 'uid', password: null, accounts: [] });
      const result = await service.validatePassword('a@b.com', 'pass');
      expect(result).toBeNull();
    });
  });
});
