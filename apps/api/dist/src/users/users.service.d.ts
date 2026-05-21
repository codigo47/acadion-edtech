import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<({
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
    findById(id: string): Promise<{
        username: string | null;
        password: string | null;
        name: string | null;
        id: string;
        email: string;
        emailVerified: Date | null;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findByUsername(username: string): Promise<{
        username: string | null;
        password: string | null;
        name: string | null;
        id: string;
        email: string;
        emailVerified: Date | null;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    create(data: {
        email: string;
        name?: string;
        password?: string;
        image?: string;
        username?: string;
    }): Promise<{
        username: string | null;
        password: string | null;
        name: string | null;
        id: string;
        email: string;
        emailVerified: Date | null;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createWithOAuth(data: {
        email: string;
        name?: string;
        image?: string;
        provider: string;
        providerAccountId: string;
        accessToken?: string;
        refreshToken?: string;
        expiresAt?: number;
    }): Promise<{
        username: string | null;
        password: string | null;
        name: string | null;
        id: string;
        email: string;
        emailVerified: Date | null;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateProfile(userId: string, data: {
        name?: string;
        image?: string;
        username?: string;
    }): Promise<{
        username: string | null;
        password: string | null;
        name: string | null;
        id: string;
        email: string;
        emailVerified: Date | null;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    validatePassword(email: string, password: string): Promise<({
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
}
