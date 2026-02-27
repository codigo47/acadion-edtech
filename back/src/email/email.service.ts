import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

@Injectable()
export class EmailService {
  private readonly ses: SESClient;
  private readonly fromEmail: string;
  private readonly frontendUrl: string;
  private readonly logger = new Logger(EmailService.name);

  constructor(private configService: ConfigService) {
    this.ses = new SESClient({
      region: this.configService.get<string>('AWS_SES_REGION', 'us-east-1'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_SES_ACCESS_KEY_ID', ''),
        secretAccessKey: this.configService.get<string>('AWS_SES_SECRET_ACCESS_KEY', ''),
      },
    });
    this.fromEmail = this.configService.get<string>('AWS_SES_FROM_EMAIL', 'noreply@acadion.ai');
    this.frontendUrl = this.configService.get<string>('FRONTEND_URL', 'http://localhost:8000');
  }

  async sendEmail(to: string, subject: string, htmlBody: string): Promise<void> {
    const command = new SendEmailCommand({
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
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}`, error);
      throw error;
    }
  }

  async sendInvitationEmail(
    email: string,
    orgName: string,
    role: string,
    inviteToken: string,
  ): Promise<void> {
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
}
