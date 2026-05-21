import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  async check() {
    try {
      const postgresVersion = await this.prisma.getPostgresVersion();
      return {
        status: 'ok',
        postgres: {
          connected: true,
          version: postgresVersion,
        },
      };
    } catch (error) {
      const err = error as Error;
      return {
        status: 'error',
        postgres: {
          connected: false,
          error: err.message,
        },
      };
    }
  }
}
