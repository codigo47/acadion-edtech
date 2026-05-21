import type { Request as ExpressRequest } from 'express';
import { PortfolioService } from './portfolio.service';
import { UpdatePortfolioDto, UpdatePortfolioCoursesDto } from './dto/update-portfolio.dto';
import { ContactPortfolioDto } from './dto/contact-portfolio.dto';
import { TrackVisitDto } from './dto/track-visit.dto';
interface RequestWithUser extends ExpressRequest {
    user: {
        id: string;
        email: string;
    };
}
export declare class PortfolioController {
    private readonly portfolioService;
    constructor(portfolioService: PortfolioService);
    getMyPortfolio(req: RequestWithUser): Promise<({
        courses: ({
            course: {
                id: number;
                key: string;
                status: import("@prisma/client").$Enums.CourseStatus;
                title: string | null;
            };
        } & {
            courseId: number;
            order: number;
            portfolioId: number;
        })[];
        images: {
            url: string;
            id: number;
            createdAt: Date;
            description: string | null;
            order: number;
            portfolioId: number;
        }[];
        videos: {
            url: string;
            id: number;
            createdAt: Date;
            description: string | null;
            order: number;
            portfolioId: number;
        }[];
    } & {
        id: number;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        title: string | null;
        tagline: string | null;
        bio: string | null;
        portraitImage: string | null;
        coverImage: string | null;
        phone: string | null;
        theme: string | null;
        skills: string[];
        languages: string[];
        socialLinkedin: string | null;
        socialTwitter: string | null;
        socialInstagram: string | null;
        socialCustom: import("@prisma/client/runtime/client").JsonValue | null;
        isPublic: boolean;
    }) | {
        id: null;
        title: null;
        tagline: null;
        bio: null;
        portraitImage: null;
        coverImage: null;
        email: null;
        phone: null;
        theme: string;
        skills: never[];
        languages: never[];
        socialLinkedin: null;
        socialTwitter: null;
        socialInstagram: null;
        socialCustom: never[];
        isPublic: boolean;
        courses: never[];
        images: never[];
        videos: never[];
    }>;
    updatePortfolio(req: RequestWithUser, dto: UpdatePortfolioDto): Promise<({
        courses: ({
            course: {
                id: number;
                key: string;
                status: import("@prisma/client").$Enums.CourseStatus;
                title: string | null;
            };
        } & {
            courseId: number;
            order: number;
            portfolioId: number;
        })[];
        images: {
            url: string;
            id: number;
            createdAt: Date;
            description: string | null;
            order: number;
            portfolioId: number;
        }[];
        videos: {
            url: string;
            id: number;
            createdAt: Date;
            description: string | null;
            order: number;
            portfolioId: number;
        }[];
    } & {
        id: number;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        title: string | null;
        tagline: string | null;
        bio: string | null;
        portraitImage: string | null;
        coverImage: string | null;
        phone: string | null;
        theme: string | null;
        skills: string[];
        languages: string[];
        socialLinkedin: string | null;
        socialTwitter: string | null;
        socialInstagram: string | null;
        socialCustom: import("@prisma/client/runtime/client").JsonValue | null;
        isPublic: boolean;
    }) | {
        id: null;
        title: null;
        tagline: null;
        bio: null;
        portraitImage: null;
        coverImage: null;
        email: null;
        phone: null;
        theme: string;
        skills: never[];
        languages: never[];
        socialLinkedin: null;
        socialTwitter: null;
        socialInstagram: null;
        socialCustom: never[];
        isPublic: boolean;
        courses: never[];
        images: never[];
        videos: never[];
    }>;
    updateCourses(req: RequestWithUser, dto: UpdatePortfolioCoursesDto): Promise<({
        courses: ({
            course: {
                id: number;
                key: string;
                status: import("@prisma/client").$Enums.CourseStatus;
                title: string | null;
            };
        } & {
            courseId: number;
            order: number;
            portfolioId: number;
        })[];
        images: {
            url: string;
            id: number;
            createdAt: Date;
            description: string | null;
            order: number;
            portfolioId: number;
        }[];
        videos: {
            url: string;
            id: number;
            createdAt: Date;
            description: string | null;
            order: number;
            portfolioId: number;
        }[];
    } & {
        id: number;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        title: string | null;
        tagline: string | null;
        bio: string | null;
        portraitImage: string | null;
        coverImage: string | null;
        phone: string | null;
        theme: string | null;
        skills: string[];
        languages: string[];
        socialLinkedin: string | null;
        socialTwitter: string | null;
        socialInstagram: string | null;
        socialCustom: import("@prisma/client/runtime/client").JsonValue | null;
        isPublic: boolean;
    }) | {
        id: null;
        title: null;
        tagline: null;
        bio: null;
        portraitImage: null;
        coverImage: null;
        email: null;
        phone: null;
        theme: string;
        skills: never[];
        languages: never[];
        socialLinkedin: null;
        socialTwitter: null;
        socialInstagram: null;
        socialCustom: never[];
        isPublic: boolean;
        courses: never[];
        images: never[];
        videos: never[];
    }>;
    getAnalytics(req: RequestWithUser): Promise<{
        totalVisits: number;
        visitsPerDay: {
            date: string;
            count: number;
        }[];
        courseOpens: {
            courseId: number | null;
            title: string;
            count: number;
        }[];
        countries: {
            country: string;
            count: number;
        }[];
    }>;
    getByUsername(username: string): Promise<{
        user: {
            id: string;
            name: string | null;
            image: string | null;
            username: string | null;
        };
        portfolio: null;
    } | {
        user: {
            id: string;
            name: string | null;
            image: string | null;
            username: string | null;
        };
        portfolio: {
            title: string | null;
            tagline: string | null;
            bio: string | null;
            portraitImage: string | null;
            coverImage: string | null;
            email: string | null;
            phone: string | null;
            theme: string;
            skills: string[];
            languages: string[];
            socialLinkedin: string | null;
            socialTwitter: string | null;
            socialInstagram: string | null;
            socialCustom: string | number | true | import("@prisma/client/runtime/client").JsonObject | import("@prisma/client/runtime/client").JsonArray;
            courses: {
                id: number;
                key: string;
                title: string | null;
                status: import("@prisma/client").$Enums.CourseStatus;
                order: number;
            }[];
            images: {
                id: number;
                url: string;
                description: string | null;
                order: number;
            }[];
            videos: {
                id: number;
                url: string;
                description: string | null;
                order: number;
            }[];
        };
    }>;
    trackVisit(username: string, dto: TrackVisitDto): Promise<{
        id: number;
        createdAt: Date;
        courseId: number | null;
        country: string | null;
        portfolioId: number;
    }>;
    sendContact(username: string, dto: ContactPortfolioDto): Promise<{
        message: string;
        id: number;
        createdAt: Date;
        portfolioId: number;
        senderName: string;
        senderEmail: string;
    }>;
}
export {};
