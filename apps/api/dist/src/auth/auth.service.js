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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const organization_service_1 = require("../organization/organization.service");
let AuthService = AuthService_1 = class AuthService {
    usersService;
    jwtService;
    organizationService;
    logger = new common_1.Logger(AuthService_1.name);
    constructor(usersService, jwtService, organizationService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.organizationService = organizationService;
    }
    async validateUser(email, password) {
        return this.usersService.validatePassword(email, password);
    }
    async login(user) {
        const payload = { email: user.email, sub: user.id };
        try {
            await this.organizationService.acceptPendingInvitations(user.id, user.email);
        }
        catch (error) {
            this.logger.warn(`Failed to auto-accept invitations for ${user.email}`, error);
        }
        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                image: user.image,
                username: user.username,
            },
            accessToken: this.jwtService.sign(payload),
        };
    }
    async register(registerDto) {
        const existingUser = await this.usersService.findByEmail(registerDto.email);
        if (existingUser) {
            throw new common_1.ConflictException('Email already registered');
        }
        const user = await this.usersService.create({
            email: registerDto.email,
            password: registerDto.password,
            name: registerDto.name,
            username: registerDto.username,
        });
        return this.login(user);
    }
    async googleLogin(googleUser) {
        if (!googleUser) {
            throw new common_1.UnauthorizedException('No user from Google');
        }
        const user = await this.usersService.createWithOAuth({
            email: googleUser.email,
            name: googleUser.name,
            image: googleUser.image,
            provider: 'google',
            providerAccountId: googleUser.providerAccountId,
            accessToken: googleUser.accessToken,
            refreshToken: googleUser.refreshToken,
        });
        return this.login(user);
    }
    async getProfile(userId) {
        const user = await this.usersService.findById(userId);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            username: user.username,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        organization_service_1.OrganizationService])
], AuthService);
//# sourceMappingURL=auth.service.js.map