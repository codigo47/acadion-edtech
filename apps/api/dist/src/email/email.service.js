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
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_ses_1 = require("@aws-sdk/client-ses");
let EmailService = EmailService_1 = class EmailService {
    configService;
    ses;
    fromEmail;
    frontendUrl;
    logger = new common_1.Logger(EmailService_1.name);
    constructor(configService) {
        this.configService = configService;
        this.ses = new client_ses_1.SESClient({
            region: this.configService.get('AWS_SES_REGION', 'us-east-1'),
            credentials: {
                accessKeyId: this.configService.get('AWS_SES_ACCESS_KEY_ID', ''),
                secretAccessKey: this.configService.get('AWS_SES_SECRET_ACCESS_KEY', ''),
            },
        });
        this.fromEmail = this.configService.get('AWS_SES_FROM_EMAIL', 'noreply@acadion.ai');
        this.frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:8000');
    }
    async sendEmail(to, subject, htmlBody) {
        const command = new client_ses_1.SendEmailCommand({
            Source: this.fromEmail,
            Destination: { ToAddresses: [to] },
            Message: {
                Subject: { Data: subject },
                Body: { Html: { Data: htmlBody } },
            },
        });
        try {
            await this.ses.send(command);
            this.logger.log(`Email sent to ${to}`);
        }
        catch (error) {
            this.logger.error(`Failed to send email to ${to}`, error);
            throw error;
        }
    }
    async sendInvitationEmail(email, orgName, role, inviteToken) {
        const acceptUrl = `${this.frontendUrl}/invite/accept?token=${inviteToken}`;
        const subject = `You've been invited to join ${orgName} on Acadion`;
        const htmlBody = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 0;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;">
                  <tr>
                    <td style="background-color:#18181b;padding:32px;text-align:center;">
                      <h1 style="color:#ffffff;margin:0;font-size:24px;">Acadion</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:40px 32px;">
                      <h2 style="color:#18181b;margin:0 0 16px;">You're invited!</h2>
                      <p style="color:#52525b;font-size:16px;line-height:1.6;margin:0 0 24px;">
                        You've been invited to join <strong>${orgName}</strong> as a <strong>${role}</strong> on Acadion.
                      </p>
                      <table cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
                        <tr>
                          <td style="background-color:#18181b;border-radius:6px;padding:12px 32px;">
                            <a href="${acceptUrl}" style="color:#ffffff;text-decoration:none;font-size:16px;font-weight:600;">
                              Accept Invitation
                            </a>
                          </td>
                        </tr>
                      </table>
                      <p style="color:#a1a1aa;font-size:14px;line-height:1.5;margin:0;">
                        This invitation expires in 7 days. If you didn't expect this email, you can safely ignore it.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color:#f4f4f5;padding:24px 32px;text-align:center;">
                      <p style="color:#a1a1aa;font-size:12px;margin:0;">
                        Acadion - AI-Powered Learning Platform
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;
        await this.sendEmail(email, subject, htmlBody);
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map