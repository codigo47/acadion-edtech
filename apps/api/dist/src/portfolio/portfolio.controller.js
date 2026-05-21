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
exports.PortfolioController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const portfolio_service_1 = require("./portfolio.service");
const update_portfolio_dto_1 = require("./dto/update-portfolio.dto");
const contact_portfolio_dto_1 = require("./dto/contact-portfolio.dto");
const track_visit_dto_1 = require("./dto/track-visit.dto");
let PortfolioController = class PortfolioController {
    portfolioService;
    constructor(portfolioService) {
        this.portfolioService = portfolioService;
    }
    getMyPortfolio(req) {
        return this.portfolioService.getMyPortfolio(req.user.id);
    }
    updatePortfolio(req, dto) {
        return this.portfolioService.upsertPortfolio(req.user.id, dto);
    }
    updateCourses(req, dto) {
        return this.portfolioService.updateCourses(req.user.id, dto);
    }
    getAnalytics(req) {
        return this.portfolioService.getPortfolioAnalytics(req.user.id);
    }
    getByUsername(username) {
        return this.portfolioService.getByUsername(username);
    }
    trackVisit(username, dto) {
        return this.portfolioService.trackVisit(username, dto);
    }
    sendContact(username, dto) {
        return this.portfolioService.sendContactMessage(username, dto);
    }
};
exports.PortfolioController = PortfolioController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me/settings'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PortfolioController.prototype, "getMyPortfolio", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('me/settings'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_portfolio_dto_1.UpdatePortfolioDto]),
    __metadata("design:returntype", void 0)
], PortfolioController.prototype, "updatePortfolio", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('me/courses'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_portfolio_dto_1.UpdatePortfolioCoursesDto]),
    __metadata("design:returntype", void 0)
], PortfolioController.prototype, "updateCourses", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me/analytics'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PortfolioController.prototype, "getAnalytics", null);
__decorate([
    (0, common_1.Get)(':username'),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PortfolioController.prototype, "getByUsername", null);
__decorate([
    (0, common_1.Post)(':username/visit'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Param)('username')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, track_visit_dto_1.TrackVisitDto]),
    __metadata("design:returntype", void 0)
], PortfolioController.prototype, "trackVisit", null);
__decorate([
    (0, common_1.Post)(':username/contact'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Param)('username')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, contact_portfolio_dto_1.ContactPortfolioDto]),
    __metadata("design:returntype", void 0)
], PortfolioController.prototype, "sendContact", null);
exports.PortfolioController = PortfolioController = __decorate([
    (0, common_1.Controller)('portfolio'),
    __metadata("design:paramtypes", [portfolio_service_1.PortfolioService])
], PortfolioController);
//# sourceMappingURL=portfolio.controller.js.map