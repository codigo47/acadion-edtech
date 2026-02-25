import { IsString, IsOptional, IsEmail, IsEnum } from 'class-validator';

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
