import { PrismaService } from '../prisma/prisma.service';
import { CreateGroupDto, UpdateGroupDto, AddGroupMemberDto } from './dto/group.dto';
export declare class GroupService {
    private prisma;
    constructor(prisma: PrismaService);
    getOrgGroups(orgKey: string): Promise<({
        _count: {
            members: number;
        };
    } & {
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        key: string;
        orgId: number;
        description: string | null;
    })[]>;
    getGroupDetail(groupId: number): Promise<{
        members: ({
            user: {
                name: string | null;
                id: string;
                email: string;
                image: string | null;
            };
        } & {
            createdAt: Date;
            userId: string;
            groupId: number;
        })[];
    } & {
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        key: string;
        orgId: number;
        description: string | null;
    }>;
    createGroup(orgKey: string, dto: CreateGroupDto): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        key: string;
        orgId: number;
        description: string | null;
    }>;
    updateGroup(groupId: number, dto: UpdateGroupDto): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        key: string;
        orgId: number;
        description: string | null;
    }>;
    deleteGroup(groupId: number): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        key: string;
        orgId: number;
        description: string | null;
    }>;
    addMember(groupId: number, dto: AddGroupMemberDto): Promise<{
        createdAt: Date;
        userId: string;
        groupId: number;
    }>;
    removeMember(groupId: number, userId: string): Promise<{
        createdAt: Date;
        userId: string;
        groupId: number;
    }>;
}
