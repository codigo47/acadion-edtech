export declare class SocialCustomLinkDto {
    label: string;
    url: string;
}
export declare class PortfolioMediaItemDto {
    url: string;
    description?: string;
}
export declare class UpdatePortfolioDto {
    title?: string;
    tagline?: string;
    bio?: string;
    portraitImage?: string;
    coverImage?: string;
    email?: string;
    phone?: string;
    theme?: string;
    skills?: string[];
    languages?: string[];
    socialLinkedin?: string;
    socialTwitter?: string;
    socialInstagram?: string;
    socialCustom?: SocialCustomLinkDto[];
    images?: PortfolioMediaItemDto[];
    videos?: PortfolioMediaItemDto[];
    isPublic?: boolean;
}
export declare class UpdatePortfolioCoursesDto {
    courseIds: number[];
}
