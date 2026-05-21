"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcryptjs"));
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
            include: { accounts: true },
        });
    }
    async findById(id) {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }
    async findByUsername(username) {
        return this.prisma.user.findUnique({
            where: { username },
        });
    }
    async create(data) {
        if (data.username) {
            const existingUsername = await this.findByUsername(data.username);
            if (existingUsername) {
                throw new common_1.ConflictException('Username already taken');
            }
        }
        const hashedPassword = data.password
            ? await bcrypt.hash(data.password, 10)
            : null;
        return this.prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                password: hashedPassword,
                image: data.image,
                username: data.username,
            },
        });
    }
    async createWithOAuth(data) {
        const existingUser = await this.findByEmail(data.email);
        if (existingUser) {
            const existingAccount = existingUser.accounts.find((acc) => acc.provider === data.provider &&
                acc.providerAccountId === data.providerAccountId);
            if (!existingAccount) {
                await this.prisma.account.create({
                    data: {
                        userId: existingUser.id,
                        type: 'oauth',
                        provider: data.provider,
                        providerAccountId: data.providerAccountId,
                        access_token: data.accessToken,
                        refresh_token: data.refreshToken,
                        expires_at: data.expiresAt,
                    },
                });
            }
            else {
                await this.prisma.account.update({
                    where: { id: existingAccount.id },
                    data: {
                        access_token: data.accessToken,
                        refresh_token: data.refreshToken,
                        expires_at: data.expiresAt,
                    },
                });
            }
            return existingUser;
        }
        return this.prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                image: data.image,
                emailVerified: new Date(),
                accounts: {
                    create: {
                        type: 'oauth',
                        provider: data.provider,
                        providerAccountId: data.providerAccountId,
                        access_token: data.accessToken,
                        refresh_token: data.refreshToken,
                        expires_at: data.expiresAt,
                    },
                },
            },
        });
    }
    async updateProfile(userId, data) {
        if (data.username) {
            const existing = await this.findByUsername(data.username);
            if (existing && existing.id !== userId) {
                throw new common_1.ConflictException('Username already taken');
            }
        }
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                ...(data.name !== undefined && { name: data.name }),
                ...(data.image !== undefined && { image: data.image }),
                ...(data.username !== undefined && { username: data.username }),
            },
        });
    }
    async validatePassword(email, password) {
        const user = await this.findByEmail(email);
        if (!user || !user.password) {
            return null;
        }
        const isValid = await bcrypt.compare(password, user.password);
        return isValid ? user : null;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map