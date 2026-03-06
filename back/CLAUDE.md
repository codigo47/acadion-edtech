# Backend - NestJS 11

## Commands

```bash
npm run start:dev       # Dev server (port 8001, watch mode)
npm run build           # Production build
npm test                # Run Jest tests
npm run test:watch      # Watch mode
npm run test:cov        # Coverage report
npx prisma generate     # Generate Prisma client after schema changes
npx prisma migrate dev  # Run migrations
```

## Architecture

NestJS 11 with modular architecture. Each feature is a self-contained module with:
- Controller (routes) → Service (business logic) → Prisma (database)
- DTOs validated globally via `class-validator` + `ValidationPipe`
- Guards for authentication (`JwtAuthGuard`, `LocalAuthGuard`, `GoogleAuthGuard`)

**API prefix:** All routes under `/api/v1`

## Module Structure

```
src/
├── auth/           # JWT + Google OAuth + Local auth
├── course/         # Course CRUD + AI generation pipeline
│   └── orchestrator/  # BullMQ handlers for async generation
├── lms/            # Enrollment, progress, assessments
├── organization/   # Multi-tenant orgs with roles
├── badge/          # Achievement system
├── learning-plan/  # Curriculum pathways
├── notification/   # Notification system
├── portfolio/      # User portfolios
├── conversation/   # Chat-based course creation
├── queue/          # BullMQ job management
├── email/          # AWS SES email service
├── analytics/      # Usage tracking
├── group/          # User groups
├── users/          # User management
├── prisma/         # Database service (PrismaService)
├── health/         # Health check endpoint
└── common/         # Shared DTOs (PaginationDto, PaginatedResponse)
```

## Key Patterns

### Controller Pattern
```typescript
@Controller('resource')
@UseGuards(JwtAuthGuard)  // Class-level guard for all routes
export class ResourceController {
  constructor(private service: ResourceService) {}

  @Get('my')
  getAll(@Request() req: RequestWithUser, @Query() pagination: PaginationDto) {
    return this.service.getAll(req.user.id, pagination);
  }
}
```

- Always type request as `RequestWithUser` (extends Express `Request` with `user: { id: string }`)
- Use `PaginationDto` for list endpoints returning `PaginatedResponse<T>`
- Course API uses task dispatcher: `POST /course/tasks` with `TaskName` enum

### Service Pattern
```typescript
@Injectable()
export class ResourceService {
  private readonly logger = new Logger(ResourceService.name);
  constructor(private prisma: PrismaService) {}
}
```

- Inject `PrismaService` for database access
- Throw NestJS exceptions: `NotFoundException`, `ConflictException`, `UnauthorizedException`, `BadRequestException`
- Use `Logger` for structured logging

### DTO Pattern
```typescript
export class CreateResourceDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
```

- Always use `class-validator` decorators
- Use `@Type(() => Number)` with `class-transformer` for query params
- Nested objects: `@ValidateNested({ each: true })` + `@Type(() => NestedDto)`

### Test Pattern
```typescript
describe('ResourceController', () => {
  let controller: ResourceController;
  const mockService = { findAll: jest.fn() };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ResourceController],
      providers: [{ provide: ResourceService, useValue: mockService }],
    }).compile();
    controller = module.get(ResourceController);
    jest.clearAllMocks();
  });

  it('delegates to service', async () => {
    mockService.findAll.mockResolvedValue([]);
    const result = await controller.findAll();
    expect(mockService.findAll).toHaveBeenCalled();
  });
});
```

- Mock services with `jest.fn()` and `useValue`
- Clear mocks in `beforeEach`
- Test files: `*.spec.ts` next to source files

### Module Registration
```typescript
@Module({
  imports: [PrismaModule, OtherModule],
  controllers: [ResourceController],
  providers: [ResourceService],
  exports: [ResourceService],  // Only if other modules need it
})
export class ResourceModule {}
```

## Error Handling

- Global `ValidationPipe` with `whitelist: true`, `forbidNonWhitelisted: true`, `transform: true`
- Service methods throw NestJS HTTP exceptions (auto-serialized to JSON)
- Handler errors logged but don't crash the job queue

## Authentication

- JWT in `Authorization: Bearer <token>` header
- `req.user.id` available in guarded routes
- Token payload: `{ sub: userId, email: userEmail }`
- Expires in 7 days (configurable via `JWT_EXPIRES_IN`)

## Environment Variables

Required: `DATABASE_URL`, `REDIS_HOST`, `REDIS_PORT`, `JWT_SECRET`, `OPENAI_API_KEY`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `FRONTEND_URL`

## Course Components API

`GET /course/:key/components` returns:
```typescript
{
  courseId: number;
  components: [...];          // Course's components
  groupVariants: Array<{      // ALL sibling variants for each groupKey
    componentId: number;      // Component table ID
    componentName: string;    // internalName
    name: string;             // display name
    groupKey: string;         // e.g. 'paragraph', 'heading', 'quote'
  }>;
}
```

`groupVariants` enables the frontend style-switching dropdown to show all available variants, not just those present in the current course.

## Naming Conventions

| What | Convention | Example |
|------|-----------|---------|
| Files | kebab-case | `jwt-auth.guard.ts` |
| Classes | PascalCase | `CourseService` |
| Methods | camelCase | `getAllBadges()` |
| Constants | UPPER_SNAKE_CASE | `COURSE_ORCHESTRATION_QUEUE` |
| DB columns | snake_case via @map | `created_at`, `user_id` |
