export declare class CreateOrganizationDto {
    name: string;
    logo?: string;
}
export declare class InviteMemberDto {
    email: string;
    role: string;
}
export declare class UpdateMemberRoleDto {
    role: string;
}
export declare class AcceptInvitationDto {
    token: string;
}
declare class BulkMemberItemDto {
    email: string;
    name: string;
    role: string;
}
export declare class BulkInviteMembersDto {
    members: BulkMemberItemDto[];
}
export {};
