import type { Response, Request as ExpressRequest } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
interface AuthenticatedUser {
    id: string;
    email: string;
    name?: string;
}
interface GoogleUser {
    email: string;
    name: string;
    image?: string;
    accessToken: string;
    refreshToken: string;
    providerAccountId: string;
}
interface RequestWithUser extends ExpressRequest {
    user: AuthenticatedUser;
}
interface RequestWithGoogleUser extends ExpressRequest {
    user: GoogleUser;
}
export declare class AuthController {
    private authService;
    private configService;
    constructor(authService: AuthService, configService: ConfigService);
    register(registerDto: RegisterDto): Promise<{
        user: {
            id: string;
            email: string;
            name: string | null | undefined;
            image: string | null | undefined;
            username: string | null | undefined;
        };
        accessToken: string;
    }>;
    login(req: RequestWithUser): Promise<{
        user: {
            id: string;
            email: string;
            name: string | null | undefined;
            image: string | null | undefined;
            username: string | null | undefined;
        };
        accessToken: string;
    }>;
    googleAuth(): Promise<void>;
    googleAuthCallback(req: RequestWithGoogleUser, res: Response): Promise<void>;
    getProfile(req: RequestWithUser): Promise<{
        id: string;
        email: string;
        name: string | null;
        image: string | null;
        username: string | null;
    }>;
    logout(): {
        message: string;
    };
}
export {};
