import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { OrganizationService } from '../organization/organization.service';
import { RegisterDto } from './dto/register.dto';

interface AuthUser {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
  username?: string | null;
}

interface GoogleUser {
  email: string;
  name: string;
  image?: string;
  accessToken: string;
  refreshToken: string;
  providerAccountId: string;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private organizationService: OrganizationService,
  ) {}

  async validateUser(email: string, password: string) {
    return this.usersService.validatePassword(email, password);
  }

  async login(user: AuthUser) {
    const payload = { email: user.email, sub: user.id };

    // Auto-accept pending invitations for this user
    try {
      await this.organizationService.acceptPendingInvitations(user.id, user.email);
    } catch (error) {
      this.logger.warn(`Failed to auto-accept invitations for ${user.email}`, error);
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        username: user.username,
      },
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const user = await this.usersService.create({
      email: registerDto.email,
      password: registerDto.password,
      name: registerDto.name,
      username: registerDto.username,
    });

    return this.login(user);
  }

  async googleLogin(googleUser: GoogleUser) {
    if (!googleUser) {
      throw new UnauthorizedException('No user from Google');
    }

    const user = await this.usersService.createWithOAuth({
      email: googleUser.email,
      name: googleUser.name,
      image: googleUser.image,
      provider: 'google',
      providerAccountId: googleUser.providerAccountId,
      accessToken: googleUser.accessToken,
      refreshToken: googleUser.refreshToken,
    });

    return this.login(user);
  }

  async getProfile(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      username: user.username,
    };
  }
}
