# Auth Module

## Overview

Three authentication strategies: Local (email+password), JWT (token-based), Google OAuth.

## Strategies

### Local Strategy (`local.strategy.ts`)
- Field override: `usernameField: 'email'`
- Validates via `UsersService.validatePassword(email, password)`
- Throws `UnauthorizedException('Invalid credentials')` on failure
- Used only on `POST /auth/login` via `LocalAuthGuard`

### JWT Strategy (`jwt.strategy.ts`)
- Extracts token from `Authorization: Bearer <token>`
- Secret from `ConfigService.get('JWT_SECRET')`
- Validates user exists via `UsersService.findById(payload.sub)`
- Payload shape: `{ sub: string, email: string }`

### Google Strategy (`google.strategy.ts`)
- OAuth 2.0 with scope: `['email', 'profile']`
- Callback URL from `ConfigService.get('GOOGLE_CALLBACK_URL')`
- Extracts: email, name, image, accessToken, refreshToken, providerAccountId
- Auto-creates user if not exists

## Guards

```typescript
@UseGuards(JwtAuthGuard)   // Most common — protects API routes
@UseGuards(LocalAuthGuard)  // Login only
@UseGuards(GoogleAuthGuard) // OAuth redirect
```

Apply at class level for entire controller, or method level for specific routes.

## Auth Flow

### Registration
```
POST /api/v1/auth/register
Body: { email, password, name?, username? }
→ Check email not taken (ConflictException if exists)
→ Hash password with bcryptjs
→ Create user
→ Return { user, accessToken }
```

### Login
```
POST /api/v1/auth/login
Body: { email, password }
→ LocalAuthGuard validates credentials
→ Accept pending org invitations
→ Return { user, accessToken }
```

### Google OAuth
```
GET /api/v1/auth/google → Redirects to Google
GET /api/v1/auth/google/callback → Creates/updates user
→ Redirects to FRONTEND_URL/login?token=<jwt>&user=<json>
```

### Profile
```
GET /api/v1/auth/profile (JwtAuthGuard)
→ Returns user profile with organizations
```

## JWT Configuration

```typescript
JwtModule.registerAsync({
  useFactory: (config: ConfigService) => ({
    secret: config.get('JWT_SECRET'),
    signOptions: { expiresIn: config.get('JWT_EXPIRES_IN') ?? '7d' },
  }),
})
```

## Password Handling

- Hashing: `bcryptjs` with default salt rounds
- Validation: `UsersService.validatePassword()` uses `bcrypt.compare()`
- Passwords never returned in API responses

## Adding Protected Routes

```typescript
// Protect entire controller
@Controller('my-resource')
@UseGuards(JwtAuthGuard)
export class MyController {
  @Get()
  find(@Request() req: RequestWithUser) {
    // req.user.id is the authenticated user's ID
    return this.service.findByUser(req.user.id);
  }
}
```

## Request Type

Always use this interface for typed access to the authenticated user:

```typescript
interface RequestWithUser extends ExpressRequest {
  user: { id: string };
}
```
