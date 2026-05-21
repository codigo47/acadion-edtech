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
exports.PortfolioService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PortfolioService = class PortfolioService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getByUsername(username) {
        const user = await this.prisma.user.findUnique({
            where: { username },
            include: {
                portfolio: {
                    include: {
                        courses: {
                            include: {
                                course: {
                                    select: {
                                        id: true,
                                        key: true,
                                        title: true,
                                        status: true,
                                    },
                                },
                            },
                            orderBy: { order: 'asc' },
                        },
                        images: { orderBy: { order: 'asc' } },
                        videos: { orderBy: { order: 'asc' } },
                    },
                },
            },
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const userInfo = {
            id: user.id,
            name: user.name,
            image: user.image,
            username: user.username,
        };
        if (!user.portfolio || !user.portfolio.isPublic) {
            return {
                user: userInfo,
                portfolio: null,
            };
        }
        const portfolioCourses = user.portfolio.courses.map((pc) => ({
            id: pc.course.id,
            key: pc.course.key,
            title: pc.course.title,
            status: pc.course.status,
            order: pc.order,
        }));
        let courses = portfolioCourses;
        if (courses.length === 0) {
            const userCourses = await this.prisma.course.findMany({
                where: { userId: user.id, status: 'completed' },
                select: { id: true, key: true, title: true, status: true },
                orderBy: { createdAt: 'desc' },
            });
            courses = userCourses.map((c, i) => ({ ...c, order: i }));
        }
        return {
            user: userInfo,
            portfolio: {
                title: user.portfolio.title,
                tagline: user.portfolio.tagline,
                bio: user.portfolio.bio,
                portraitImage: user.portfolio.portraitImage,
                coverImage: user.portfolio.coverImage,
                email: user.portfolio.email,
                phone: user.portfolio.phone,
                theme: user.portfolio.theme || 'corporate_professional',
                skills: user.portfolio.skills,
                languages: user.portfolio.languages,
                socialLinkedin: user.portfolio.socialLinkedin,
                socialTwitter: user.portfolio.socialTwitter,
                socialInstagram: user.portfolio.socialInstagram,
                socialCustom: user.portfolio.socialCustom || [],
                courses,
                images: user.portfolio.images.map((img) => ({
                    id: img.id,
                    url: img.url,
                    description: img.description,
                    order: img.order,
                })),
                videos: user.portfolio.videos.map((vid) => ({
                    id: vid.id,
                    url: vid.url,
                    description: vid.description,
                    order: vid.order,
                })),
            },
        };
    }
    async getMyPortfolio(userId) {
        const portfolio = await this.prisma.portfolio.findUnique({
            where: { userId },
            include: {
                courses: {
                    include: {
                        course: {
                            select: {
                                id: true,
                                key: true,
                                title: true,
                                status: true,
                            },
                        },
                    },
                    orderBy: { order: 'asc' },
                },
                images: { orderBy: { order: 'asc' } },
                videos: { orderBy: { order: 'asc' } },
            },
        });
        if (!portfolio) {
            return {
                id: null,
                title: null,
                tagline: null,
                bio: null,
                portraitImage: null,
                coverImage: null,
                email: null,
                phone: null,
                theme: 'corporate_professional',
                skills: [],
                languages: [],
                socialLinkedin: null,
                socialTwitter: null,
                socialInstagram: null,
                socialCustom: [],
                isPublic: true,
                courses: [],
                images: [],
                videos: [],
            };
        }
        return portfolio;
    }
    async upsertPortfolio(userId, dto) {
        const { images, videos, ...scalarFields } = dto;
        const portfolio = await this.prisma.portfolio.upsert({
            where: { userId },
            create: {
                userId,
                title: scalarFields.title,
                tagline: scalarFields.tagline,
                bio: scalarFields.bio,
                portraitImage: scalarFields.portraitImage,
                coverImage: scalarFields.coverImage,
                email: scalarFields.email,
                phone: scalarFields.phone,
                theme: scalarFields.theme,
                skills: scalarFields.skills || [],
                languages: scalarFields.languages || [],
                socialLinkedin: scalarFields.socialLinkedin,
                socialTwitter: scalarFields.socialTwitter,
                socialInstagram: scalarFields.socialInstagram,
                socialCustom: scalarFields.socialCustom,
                isPublic: scalarFields.isPublic ?? true,
            },
            update: {
                ...(scalarFields.title !== undefined && { title: scalarFields.title }),
                ...(scalarFields.tagline !== undefined && {
                    tagline: scalarFields.tagline,
                }),
                ...(scalarFields.bio !== undefined && { bio: scalarFields.bio }),
                ...(scalarFields.portraitImage !== undefined && {
                    portraitImage: scalarFields.portraitImage,
                }),
                ...(scalarFields.coverImage !== undefined && {
                    coverImage: scalarFields.coverImage,
                }),
                ...(scalarFields.email !== undefined && { email: scalarFields.email }),
                ...(scalarFields.phone !== undefined && { phone: scalarFields.phone }),
                ...(scalarFields.theme !== undefined && { theme: scalarFields.theme }),
                ...(scalarFields.skills !== undefined && {
                    skills: scalarFields.skills,
                }),
                ...(scalarFields.languages !== undefined && {
                    languages: scalarFields.languages,
                }),
                ...(scalarFields.socialLinkedin !== undefined && {
                    socialLinkedin: scalarFields.socialLinkedin,
                }),
                ...(scalarFields.socialTwitter !== undefined && {
                    socialTwitter: scalarFields.socialTwitter,
                }),
                ...(scalarFields.socialInstagram !== undefined && {
                    socialInstagram: scalarFields.socialInstagram,
                }),
                ...(scalarFields.socialCustom !== undefined && {
                    socialCustom: scalarFields.socialCustom,
                }),
                ...(scalarFields.isPublic !== undefined && {
                    isPublic: scalarFields.isPublic,
                }),
            },
        });
        if (images !== undefined || videos !== undefined) {
            await this.prisma.$transaction(async (tx) => {
                if (images !== undefined) {
                    await tx.portfolioImage.deleteMany({
                        where: { portfolioId: portfolio.id },
                    });
                    if (images.length > 0) {
                        await tx.portfolioImage.createMany({
                            data: images.map((img, index) => ({
                                portfolioId: portfolio.id,
                                url: img.url,
                                description: img.description || null,
                                order: index,
                            })),
                        });
                    }
                }
                if (videos !== undefined) {
                    await tx.portfolioVideo.deleteMany({
                        where: { portfolioId: portfolio.id },
                    });
                    if (videos.length > 0) {
                        await tx.portfolioVideo.createMany({
                            data: videos.map((vid, index) => ({
                                portfolioId: portfolio.id,
                                url: vid.url,
                                description: vid.description || null,
                                order: index,
                            })),
                        });
                    }
                }
            });
        }
        return this.getMyPortfolio(userId);
    }
    async updateCourses(userId, dto) {
        const portfolio = await this.prisma.portfolio.upsert({
            where: { userId },
            create: { userId },
            update: {},
        });
        await this.prisma.portfolioCourse.deleteMany({
            where: { portfolioId: portfolio.id },
        });
        if (dto.courseIds.length > 0) {
            await this.prisma.portfolioCourse.createMany({
                data: dto.courseIds.map((courseId, index) => ({
                    portfolioId: portfolio.id,
                    courseId,
                    order: index,
                })),
            });
        }
        return this.getMyPortfolio(userId);
    }
    async trackVisit(username, dto) {
        const user = await this.prisma.user.findUnique({
            where: { username },
            include: { portfolio: true },
        });
        if (!user?.portfolio)
            throw new common_1.NotFoundException('Portfolio not found');
        return this.prisma.portfolioVisit.create({
            data: {
                portfolioId: user.portfolio.id,
                country: dto.country || null,
                courseId: dto.courseId || null,
            },
        });
    }
    async sendContactMessage(username, dto) {
        const user = await this.prisma.user.findUnique({
            where: { username },
            include: { portfolio: true },
        });
        if (!user?.portfolio)
            throw new common_1.NotFoundException('Portfolio not found');
        const message = await this.prisma.portfolioContactMessage.create({
            data: {
                portfolioId: user.portfolio.id,
                senderName: dto.name,
                senderEmail: dto.email,
                message: dto.message,
            },
        });
        console.log(`[Portfolio Contact] New message for ${username} from ${dto.name} <${dto.email}>: ${dto.message}`);
        return message;
    }
    async getPortfolioAnalytics(userId) {
        const portfolio = await this.prisma.portfolio.findUnique({
            where: { userId },
        });
        if (!portfolio) {
            return {
                totalVisits: 0,
                visitsPerDay: [],
                courseOpens: [],
                countries: [],
            };
        }
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const [totalVisits, recentVisits, courseOpenVisits, countryVisits] = await Promise.all([
            this.prisma.portfolioVisit.count({
                where: { portfolioId: portfolio.id },
            }),
            this.prisma.portfolioVisit.findMany({
                where: {
                    portfolioId: portfolio.id,
                    createdAt: { gte: thirtyDaysAgo },
                },
                select: { createdAt: true },
                orderBy: { createdAt: 'asc' },
            }),
            this.prisma.portfolioVisit.groupBy({
                by: ['courseId'],
                where: {
                    portfolioId: portfolio.id,
                    courseId: { not: null },
                },
                _count: { id: true },
                orderBy: { _count: { id: 'desc' } },
            }),
            this.prisma.portfolioVisit.groupBy({
                by: ['country'],
                where: {
                    portfolioId: portfolio.id,
                    country: { not: null },
                },
                _count: { id: true },
                orderBy: { _count: { id: 'desc' } },
            }),
        ]);
        const visitsPerDayMap = new Map();
        for (const visit of recentVisits) {
            const day = visit.createdAt.toISOString().split('T')[0];
            visitsPerDayMap.set(day, (visitsPerDayMap.get(day) || 0) + 1);
        }
        const visitsPerDay = Array.from(visitsPerDayMap.entries()).map(([date, count]) => ({ date, count }));
        const courseIds = courseOpenVisits
            .map((v) => v.courseId)
            .filter((id) => id !== null);
        let courseTitlesMap = new Map();
        if (courseIds.length > 0) {
            const courses = await this.prisma.course.findMany({
                where: { id: { in: courseIds } },
                select: { id: true, title: true },
            });
            courseTitlesMap = new Map(courses.map((c) => [c.id, c.title || 'Untitled']));
        }
        const courseOpens = courseOpenVisits.map((v) => ({
            courseId: v.courseId,
            title: courseTitlesMap.get(v.courseId) || 'Untitled',
            count: v._count.id,
        }));
        const countries = countryVisits.map((v) => ({
            country: v.country,
            count: v._count.id,
        }));
        return { totalVisits, visitsPerDay, courseOpens, countries };
    }
};
exports.PortfolioService = PortfolioService;
exports.PortfolioService = PortfolioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PortfolioService);
//# sourceMappingURL=portfolio.service.js.map