import { IsString, IsOptional, IsEmail, IsEnum, IsUUID, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrganizationDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  logo?: string;
}

export class InviteMemberDto {
  @IsEmail()
  email: string;

  @IsEnum(['super_admin', 'org_admin', 'editor', 'viewer', 'commenter', 'student'])
  role: string;
}

export class UpdateMemberRoleDto {
  @IsEnum(['super_admin', 'org_admin', 'editor', 'viewer', 'commenter', 'student'])
  role: string;
}

export class AcceptInvitationDto {
  @IsUUID()
  token: string;
}

class BulkMemberItemDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsEnum(['super_admin', 'org_admin', 'editor', 'viewer', 'commenter', 'student'])
  role: string;
}

export class BulkInviteMembersDto {
  @ValidateNested({ each: true })
  @Type(() => BulkMemberItemDto)
  @IsArray()
  members: BulkMemberItemDto[];
}
