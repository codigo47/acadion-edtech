import type { Request as ExpressRequest } from 'express';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
interface RequestWithUser extends ExpressRequest {
    user: {
        id: string;
        email: string;
    };
}
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    updateProfile(req: RequestWithUser, dto: UpdateProfileDto): Promise<{
        id: string;
        email: string;
        name: string | null;
        image: string | null;
        username: string | null;
    }>;
    getPublicProfile(username: string): Promise<{
        id: string;
        name: string | null;
        image: string | null;
        username: string | null;
    } | null>;
}
export {};
