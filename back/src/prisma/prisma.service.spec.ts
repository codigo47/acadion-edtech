import { PrismaService } from './prisma.service';

// Mock PrismaClient and PrismaPg before importing
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: class MockPrismaClient {
      $connect = jest.fn();
      $disconnect = jest.fn();
      $queryRaw = jest.fn();
      constructor() {}
    },
  };
});

jest.mock('@prisma/adapter-pg', () => {
  return {
    PrismaPg: class MockPrismaPg {
      constructor() {}
    },
  };
});

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(() => {
    process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';
    service = new PrismaService();
  });

  it('connects on module init', async () => {
    await service.onModuleInit();
    expect(service.$connect).toHaveBeenCalled();
  });

  it('disconnects on module destroy', async () => {
    await service.onModuleDestroy();
    expect(service.$disconnect).toHaveBeenCalled();
  });

  it('returns postgres version', async () => {
    (service.$queryRaw as jest.Mock).mockResolvedValue([{ version: 'PostgreSQL 15.0' }]);
    const version = await service.getPostgresVersion();
    expect(version).toBe('PostgreSQL 15.0');
  });
});
