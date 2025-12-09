import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';

interface AuthUser {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
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
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    return this.usersService.validatePassword(email, password);
  }

  login(user: AuthUser) {
    const payload = { email: user.email, sub: user.id };
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
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
    };
  }
}
