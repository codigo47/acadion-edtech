"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulkInviteMembersDto = exports.AcceptInvitationDto = exports.UpdateMemberRoleDto = exports.InviteMemberDto = exports.CreateOrganizationDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateOrganizationDto {
    name;
    logo;
}
exports.CreateOrganizationDto = CreateOrganizationDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrganizationDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrganizationDto.prototype, "logo", void 0);
class InviteMemberDto {
    email;
    role;
}
exports.InviteMemberDto = InviteMemberDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], InviteMemberDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['super_admin', 'org_admin', 'editor', 'viewer', 'commenter', 'student']),
    __metadata("design:type", String)
], InviteMemberDto.prototype, "role", void 0);
class UpdateMemberRoleDto {
    role;
}
exports.UpdateMemberRoleDto = UpdateMemberRoleDto;
__decorate([
    (0, class_validator_1.IsEnum)(['super_admin', 'org_admin', 'editor', 'viewer', 'commenter', 'student']),
    __metadata("design:type", String)
], UpdateMemberRoleDto.prototype, "role", void 0);
class AcceptInvitationDto {
    token;
}
exports.AcceptInvitationDto = AcceptInvitationDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AcceptInvitationDto.prototype, "token", void 0);
class BulkMemberItemDto {
    email;
    name;
    role;
}
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], BulkMemberItemDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkMemberItemDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['super_admin', 'org_admin', 'editor', 'viewer', 'commenter', 'student']),
    __metadata("design:type", String)
], BulkMemberItemDto.prototype, "role", void 0);
class BulkInviteMembersDto {
    members;
}
exports.BulkInviteMembersDto = BulkInviteMembersDto;
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => BulkMemberItemDto),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], BulkInviteMembersDto.prototype, "members", void 0);
//# sourceMappingURL=organization.dto.js.map