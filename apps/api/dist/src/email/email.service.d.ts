import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private configService;
    private readonly ses;
    private readonly fromEmail;
    private readonly frontendUrl;
    private readonly logger;
    constructor(configService: ConfigService);
    sendEmail(to: string, subject: string, htmlBody: string): Promise<void>;
    sendInvitationEmail(email: string, orgName: string, role: string, inviteToken: string): Promise<void>;
}
