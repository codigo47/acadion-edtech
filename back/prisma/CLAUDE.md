# Prisma Schema Conventions

## Database

PostgreSQL with Prisma ORM v7. Uses `@prisma/adapter-pg` for connection.

## Commands

```bash
npx prisma generate       # Regenerate client after schema changes
npx prisma migrate dev    # Create and apply migration
npx prisma db push        # Push schema without migration (dev only)
npx prisma studio         # Visual database browser
```

## Naming Conventions

| Prisma Model | DB Table | Example |
|-------------|----------|---------|
| PascalCase | snake_case via @@map | `CourseComponent` → `course_components` |
| camelCase fields | snake_case via @map | `userId` → `user_id` |
| Relations | No @map needed | `user User @relation(...)` |

## Column Patterns

```prisma
model Example {
  id        String   @id @default(uuid()) @db.Uuid @map("id")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  // Foreign keys
  userId    String   @db.Uuid @map("user_id")
  user      User     @relation(fields: [userId], references: [id])

  // JSON data
  data      Json?    @default("{}")
  input     Json?

  // Enums
  status    CourseStatus @default(draft)

  // BigInt for sequences
  sequence  BigInt   @default(autoincrement())

  @@map("examples")
}
```

## Key Models

### User
- UUID id, email (unique), name, image, password, username (unique)
- Relations: courses, conversations, organizations, accounts, badges, notifications

### Course
- UUID key (unique), title, status enum (draft/generating/completed/failed)
- JSON fields: input (metadata), output (results)
- Relations: components, steps, enrollments, conversations

### CourseComponent
- Links Course to Component (block type)
- module/unit/sequence for positioning
- data: JSON blob with all block-specific props
- groupKey: for component group identification

### Component
- Global block type definitions
- componentName (e.g., "ParagraphBlock"), type (static/dynamic), subtype (content/exercise)
- groupKey: groups related block variants (e.g., all quote styles share "quote" group)

### Organization
- Multi-tenant: slug (unique), courses, users via OrgMembership
- Roles: admin, instructor, student (OrgRole enum)

### Enrollment
- User + Course (unique constraint: [userId, courseId])
- Progress tracking: passed, score, unitProgress relation

## Enums

```prisma
enum CourseStatus    { draft generating completed failed }
enum StepStatus      { pending running completed failed }
enum ComponentType   { static dynamic }
enum ComponentSubtype { content exercise }
enum OrgRole         { admin instructor student }
enum MessageRole     { user assistant system }
enum BadgeType       { MANUAL COURSE_COMPLETION ASSESSMENT_SCORE COURSE_COUNT STREAK MODULE_COMPLETION LEARNING_PLAN_COMPLETION }
enum NotificationType { BADGE_AWARDED COURSE_COMPLETED ENROLLMENT ORGANIZATION_INVITE GENERAL }
```

## Migration Naming

Format: `YYYYMMDDHHMMSS_description_in_snake_case`

Example: `20260228000000_add_component_group_key`

## Adding a New Model

1. Define model in `schema.prisma` with proper naming (@map, @@map)
2. Add relations to existing models if needed
3. Run `npx prisma migrate dev --name describe_change`
4. Run `npx prisma generate`
5. Create module/service/controller in `src/`
6. Inject `PrismaService` in the service

## JSON Fields

Several models use `Json` type for flexible data:
- `Course.input` - Course creation metadata (topic, audience, objectives, modules)
- `Course.output` - Generated content summary
- `CourseComponent.data` - Block-specific props (content, styles, items)
- `CourseStep.payload` - Step execution data
- `Badge.conditionValue` - Badge trigger conditions

Always validate JSON structure in the service layer, not at the Prisma level.
