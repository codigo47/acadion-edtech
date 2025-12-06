import { Injectable } from '@nestjs/common';
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

  async create(data: {
    email: string;
    name?: string;
    password?: string;
    image?: string;
  }) {
    const hashedPassword = data.password
      ? await bcrypt.hash(data.password, 10)
      : null;

    return this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
        image: data.image,
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
    // Check if user already exists
    const existingUser = await this.findByEmail(data.email);

    if (existingUser) {
      // Check if this OAuth account is already linked
      const existingAccount = existingUser.accounts.find(
        (acc) =>
          acc.provider === data.provider &&
          acc.providerAccountId === data.providerAccountId,
      );

      if (!existingAccount) {
        // Link the OAuth account to existing user
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
        // Update tokens
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

    // Create new user with OAuth account
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

  async validatePassword(email: string, password: string) {
    const user = await this.findByEmail(email);

    if (!user || !user.password) {
      return null;
    }

    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }
}
