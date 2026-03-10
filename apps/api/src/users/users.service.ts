import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: { accounts: true },
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async create(data: {
    email: string;
    name?: string;
    password?: string;
    image?: string;
    username?: string;
  }) {
    if (data.username) {
      const existingUsername = await this.findByUsername(data.username);
      if (existingUsername) {
        throw new ConflictException('Username already taken');
      }
    }

    const hashedPassword = data.password
      ? await bcrypt.hash(data.password, 10)
      : null;

    return this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
        image: data.image,
        username: data.username,
      },
    });
  }

  async createWithOAuth(data: {
    email: string;
    name?: string;
    image?: string;
    provider: string;
    providerAccountId: string;
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
  }) {
    const existingUser = await this.findByEmail(data.email);

    if (existingUser) {
      const existingAccount = existingUser.accounts.find(
        (acc) =>
          acc.provider === data.provider &&
          acc.providerAccountId === data.providerAccountId,
      );

      if (!existingAccount) {
        await this.prisma.account.create({
          data: {
            userId: existingUser.id,
            type: 'oauth',
            provider: data.provider,
            providerAccountId: data.providerAccountId,
            access_token: data.accessToken,
            refresh_token: data.refreshToken,
            expires_at: data.expiresAt,
          },
        });
      } else {
        await this.prisma.account.update({
          where: { id: existingAccount.id },
          data: {
            access_token: data.accessToken,
            refresh_token: data.refreshToken,
            expires_at: data.expiresAt,
          },
        });
      }

      return existingUser;
    }

    return this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        image: data.image,
        emailVerified: new Date(),
        accounts: {
          create: {
            type: 'oauth',
            provider: data.provider,
            providerAccountId: data.providerAccountId,
            access_token: data.accessToken,
            refresh_token: data.refreshToken,
            expires_at: data.expiresAt,
          },
        },
      },
    });
  }

  async updateProfile(
    userId: string,
    data: { name?: string; image?: string; username?: string },
  ) {
    if (data.username) {
      const existing = await this.findByUsername(data.username);
      if (existing && existing.id !== userId) {
        throw new ConflictException('Username already taken');
      }
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.image !== undefined && { image: data.image }),
        ...(data.username !== undefined && { username: data.username }),
      },
    });
  }

  async validatePassword(email: string, password: string) {
    const user = await this.findByEmail(email);

    if (!user || !user.password) {
      return null;
    }

    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }
}
