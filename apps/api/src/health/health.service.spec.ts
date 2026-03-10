import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from './health.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrisma = {
  getPostgresVersion: jest.fn(),
};

describe('HealthService', () => {
  let service: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();
    service = module.get<HealthService>(HealthService);
    jest.clearAllMocks();
  });

  describe('check', () => {
    it('returns ok status when postgres is connected', async () => {
      mockPrisma.getPostgresVersion.mockResolvedValue('PostgreSQL 16.1');
      const result = await service.check();
      expect(result.status).toBe('ok');
      expect(result.postgres.connected).toBe(true);
      expect(result.postgres.version).toBe('PostgreSQL 16.1');
    });

    it('returns error status when postgres fails', async () => {
      mockPrisma.getPostgresVersion.mockRejectedValue(new Error('Connection refused'));
      const result = await service.check();
      expect(result.status).toBe('error');
      expect(result.postgres.connected).toBe(false);
      expect(result.postgres.error).toBe('Connection refused');
    });
  });
});
