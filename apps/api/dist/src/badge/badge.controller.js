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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgeController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const badge_service_1 = require("./badge.service");
const badge_dto_1 = require("./dto/badge.dto");
const prisma_service_1 = require("../prisma/prisma.service");
const pagination_dto_1 = require("../common/dto/pagination.dto");
let BadgeController = class BadgeController {
    badgeService;
    prisma;
    constructor(badgeService, prisma) {
        this.badgeService = badgeService;
        this.prisma = prisma;
    }
    getMyBadges(req) {
        return this.badgeService.getMyBadges(req.user.id);
    }
    getAllBadges(req, pagination) {
        return this.badgeService.getAllBadges(req.user.id, pagination);
    }
    getOrgBadges(orgKey) {
        return this.badgeService.getOrgBadges(orgKey);
    }
    getBadgeDetail(id) {
        return this.badgeService.getBadgeDetail(id);
    }
    async createBadge(orgKey, dto) {
        const org = await this.prisma.organization.findFirst({
            where: { key: orgKey },
        });
        if (!org)
            throw new common_1.NotFoundException('Organization not found');
        dto.orgId = org.id;
        return this.badgeService.createBadge(dto);
    }
    updateBadge(id, dto) {
        return this.badgeService.updateBadge(id, dto);
    }
    deleteBadge(id) {
        return this.badgeService.deleteBadge(id);
    }
    duplicateBadge(id) {
        return this.badgeService.duplicateBadge(id);
    }
    awardBadge(id, dto) {
        return this.badgeService.awardBadge(id, dto.userId);
    }
};
exports.BadgeController = BadgeController;
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BadgeController.prototype, "getMyBadges", null);
__decorate([
    (0, common_1.Get)('my'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], BadgeController.prototype, "getAllBadges", null);
__decorate([
    (0, common_1.Get)('org/:orgKey'),
    __param(0, (0, common_1.Param)('orgKey')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BadgeController.prototype, "getOrgBadges", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BadgeController.prototype, "getBadgeDetail", null);
__decorate([
    (0, common_1.Post)('org/:orgKey'),
    __param(0, (0, common_1.Param)('orgKey')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, badge_dto_1.CreateBadgeDto]),
    __metadata("design:returntype", Promise)
], BadgeController.prototype, "createBadge", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, badge_dto_1.UpdateBadgeDto]),
    __metadata("design:returntype", void 0)
], BadgeController.prototype, "updateBadge", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BadgeController.prototype, "deleteBadge", null);
__decorate([
    (0, common_1.Post)(':id/duplicate'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BadgeController.prototype, "duplicateBadge", null);
__decorate([
    (0, common_1.Post)(':id/award'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, badge_dto_1.AwardBadgeDto]),
    __metadata("design:returntype", void 0)
], BadgeController.prototype, "awardBadge", null);
exports.BadgeController = BadgeController = __decorate([
    (0, common_1.Controller)('badges'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [badge_service_1.BadgeService,
        prisma_service_1.PrismaService])
], BadgeController);
//# sourceMappingURL=badge.controller.js.map