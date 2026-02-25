import { GoogleStrategy } from './google.strategy';
import { ConfigService } from '@nestjs/config';

describe('GoogleStrategy', () => {
  let strategy: GoogleStrategy;
  const mockConfigService = {
    get: jest.fn((key: string) => {
      const map: Record<string, string> = {
        GOOGLE_CLIENT_ID: 'client-id',
        GOOGLE_CLIENT_SECRET: 'client-secret',
        GOOGLE_CALLBACK_URL: 'http://localhost/callback',
      };
      return map[key];
    }),
  } as unknown as ConfigService;

  beforeEach(() => {
    strategy = new GoogleStrategy(mockConfigService);
  });

  it('extracts user info from Google profile', () => {
    const profile = {
      id: 'gid',
      name: { givenName: 'John', familyName: 'Doe' },
      emails: [{ value: 'john@google.com' }],
      photos: [{ value: 'https://photo.jpg' }],
    };
    const done = jest.fn();

    strategy.validate('access-token', 'refresh-token', profile as any, done);

    expect(done).toHaveBeenCalledWith(null, {
      email: 'john@google.com',
      name: 'John Doe',
      image: 'https://photo.jpg',
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
      providerAccountId: 'gid',
    });
  });

  it('handles missing profile fields gracefully', () => {
    const profile = {
      id: 'gid',
      name: {},
      emails: [],
      photos: [],
    };
    const done = jest.fn();

    strategy.validate('at', 'rt', profile as any, done);

    expect(done).toHaveBeenCalledWith(null, expect.objectContaining({
      email: '',
      name: '',
    }));
  });
});
