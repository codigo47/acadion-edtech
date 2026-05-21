import { GroupService } from './group.service';
import { CreateGroupDto, UpdateGroupDto, AddGroupMemberDto } from './dto/group.dto';
export declare class GroupController {
    private readonly groupService;
    constructor(groupService: GroupService);
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
    getGroupDetail(id: number): Promise<{
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
    updateGroup(id: number, dto: UpdateGroupDto): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        key: string;
        orgId: number;
        description: string | null;
    }>;
    deleteGroup(id: number): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        key: string;
        orgId: number;
        description: string | null;
    }>;
    addMember(id: number, dto: AddGroupMemberDto): Promise<{
        createdAt: Date;
        userId: string;
        groupId: number;
    }>;
    removeMember(id: number, userId: string): Promise<{
        createdAt: Date;
        userId: string;
        groupId: number;
    }>;
}
