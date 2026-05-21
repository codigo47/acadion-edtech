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
export declare class AuthService {
    private usersService;
    private jwtService;
    private organizationService;
    private readonly logger;
    constructor(usersService: UsersService, jwtService: JwtService, organizationService: OrganizationService);
    validateUser(email: string, password: string): Promise<({
        accounts: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            type: string;
            provider: string;
            providerAccountId: string;
            refresh_token: string | null;
            access_token: string | null;
            expires_at: number | null;
            token_type: string | null;
            scope: string | null;
            id_token: string | null;
            session_state: string | null;
        }[];
    } & {
        username: string | null;
        password: string | null;
        name: string | null;
        id: string;
        email: string;
        emailVerified: Date | null;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    login(user: AuthUser): Promise<{
        user: {
            id: string;
            email: string;
            name: string | null | undefined;
            image: string | null | undefined;
            username: string | null | undefined;
        };
        accessToken: string;
    }>;
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
    googleLogin(googleUser: GoogleUser): Promise<{
        user: {
            id: string;
            email: string;
            name: string | null | undefined;
            image: string | null | undefined;
            username: string | null | undefined;
        };
        accessToken: string;
    }>;
    getProfile(userId: string): Promise<{
        id: string;
        email: string;
        name: string | null;
        image: string | null;
        username: string | null;
    }>;
}
export {};
