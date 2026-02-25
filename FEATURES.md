# Acadion — Feature Status

> Last updated: 2026-02-24

---

## ✅ Implementado

### Autenticación y usuarios
- [x] Registro con email/password
- [x] Login con email/password
- [x] Login con Google OAuth (SSO)
- [x] JWT tokens con guard global
- [x] Campo `username` único por usuario (editable desde Account)
- [x] Página Account (`/dashboard/account`) — editar nombre, username, ver URL de portfolio

### Generador de cursos (Creator)
- [x] Flujo de creación de curso por chat (topic → audience → objectives → structure → content)
- [x] Pipeline de generación IA con LangChain + OpenAI (6 handlers)
  - `index.handler` — estructura del curso
  - `objectives.handler` — objetivos de aprendizaje
  - `intro-unit.handler` — unidad de introducción
  - `content-unit.handler` — unidades de contenido (Gagné, Bloom)
  - `module-evaluation.handler` — evaluación por módulo
  - `course-evaluation.handler` — evaluación final
- [x] SSE para actualizaciones en tiempo real durante la generación
- [x] Editor de curso con preview de componentes
- [x] Branding configurable (colores, tipografía)
- [x] Tipos de ejercicios configurables
- [x] Más de 40 componentes de contenido (párrafos, tablas, galería, ejercicios, múltiple opción, etc.)

### Portfolio
- [x] Página pública `/p/{username}` — SSR con metadata SEO, retorna 404 si privado
- [x] Dashboard de configuración `/dashboard/portfolio` — título, bio, cursos visibles, toggle público/privado
- [x] Backend completo (`GET`, `PUT` settings, `PUT` courses)

### Notifications
- [x] Modelo `Notification` con tipos: `enrolled`, `learning_plan_assigned`, `course_completed`, `course_failed`, `badge_earned`, `invitation`
- [x] Backend: `GET /notifications`, `GET /notifications/unread-count`, `PATCH /:id/read`, `PATCH /read-all`
- [x] Hook `useNotifications` (React Query)
- [x] Componente `NotificationBell` — ícono con contador, dropdown con colores por tipo, marcar leídas
- [x] Integrado en el navbar del dashboard

### Organizations
- [x] Modelo `Organization` con roles: `super_admin`, `org_admin`, `editor`, `commenter`, `viewer`, `student`
- [x] Backend: crear org, listar, obtener detalle, invitar miembro (por email), cambiar rol, remover miembro
- [x] Hook `useOrganizations` (React Query)
- [x] UI `/dashboard/organizations` — lista de orgs con rol propio, crear nueva org
- [x] UI `/dashboard/organizations/[key]` — tabla de miembros, dropdown de rol editable, invitar por email

### LMS — Vista de estudiante
- [x] Backend `LmsModule` con endpoints:
  - `GET /lms/dashboard` — cursos + learning plans del estudiante
  - `GET /lms/courses/:key` — contenido del curso (componentes por unidad)
  - `POST /lms/courses/:key/enroll` — auto-matrícula
  - `PATCH /lms/courses/:key/progress` — tracking de tiempo y completado por unidad
  - `POST /lms/courses/:key/complete` — finalizar curso con score y passed
- [x] Modelo `Enrollment` con startedAt, completedAt, passed, score, attempts
- [x] Modelo `CourseUnitProgress` — progreso por unidad (tiempo activo + completado)
- [x] Hook `useLms` (React Query) — dashboard, course content, progress, complete
- [x] Página `/learn` — dashboard del estudiante con cursos ordenados (en progreso → no iniciados → completados), learning plans con barras de progreso
- [x] Página `/learn/[courseKey]` — course player completo:
  - Sidebar con todas las unidades (íconos: completada ✓, activa, bloqueada 🔒)
  - Barra de progreso en navbar
  - Renderiza los mismos componentes del editor (reutiliza `BlockComponents`)
  - Time tracking activo (se pausa cuando la pestaña pierde foco)
  - Botón "Complete & Continue" que avanza unidad a unidad
  - Botón "Finish Course" en la última unidad

### Base de datos (schema)
- [x] `LearningPlan` — jerarquía padre/hijo, correlatividad, estimatedDays, badgeName, badgeImage
- [x] `LearningPlanCourse` — cursos en planes con orden y required
- [x] `UserLearningPlan` — inscripción con deadline y completedAt
- [x] `Badge` — tipo, condición configurable, targetId
- [x] `UserBadge` — badges ganadas con earnedAt
- [x] `Group` / `UserGroup` — grupos dentro de organizaciones

---

## 🚧 Parcialmente implementado

### Badges
- [x] Schema: modelos `Badge`, `UserBadge`, enum `BadgeType` (`progress`, `level`, `excellence`, `role`)
- [ ] Backend: servicio/controlador para otorgar badges automáticamente
- [ ] Lógica de otorgamiento: por completar curso, por score > X%, por completar en tiempo, por ser primero en la org
- [ ] UI: sección "Mis logros" en el dashboard del estudiante (`/learn`)
- [ ] UI: configuración de badges en el panel de admin

### Learning Plans
- [x] Schema: modelos completos con jerarquía, correlatividad y deadlines
- [ ] Backend: módulo `LearningPlanModule` con endpoints CRUD
- [ ] UI: `/dashboard/learning-plans` — crear y gestionar planes
- [ ] UI: asignar cursos a un plan con orden y correlatividades
- [ ] UI: asignar planes a usuarios/grupos con deadline

---

## ❌ Pendiente

### Adaptive Learning
- [ ] Pre-assessment de confianza por tema (escala 1-5) al inicio del curso
- [ ] Evaluación final que repite las mismas preguntas para comparar
- [ ] Rutas diferenciadas por score:
  - Score 5 → unidad salteada (acreditada)
  - Score 4 → solo knowledge check
  - Score 3 → contenido completo
  - Score 2 → contenido + ejercicios extra
  - Score 1 → contenido + más ejercicios + knowledge check extendido
- [ ] Opción en el generador de cursos para activar/desactivar modo adaptativo
- [ ] Integración con el generador (nuevo handler o parámetro en los existentes)

### Métricas y Analytics
- [ ] Tracking de tiempo activo por unidad (base en backend — `timeSpentSeconds` en `CourseUnitProgress`)
- [ ] Tracking de cambios de pestaña / pérdida de foco durante ejercicios
- [ ] Timer de inactividad ("¿seguís ahí?") con pausa automática
- [ ] Dashboard de métricas para admin/instructor:
  - Tiempo promedio por unidad y por curso
  - Comparativa estimado vs real
  - Progreso por usuario
  - Resultados de knowledge checks por pregunta
  - Historial de intentos
- [ ] Dashboard de métricas para estudiante:
  - Tiempo total invertido
  - Historial de scores
  - Comparativa pre/post confianza

### LMS — Features avanzados
- [ ] Correlatividad en el course player (bloquear unidad hasta aprobar la anterior)
- [ ] Knowledge check con intentos configurables y tiempo límite
- [ ] Re-matrícula manual por admin cuando el estudiante desaprueba
- [ ] Sistema de notificaciones automáticas al aprobar/desaprobar (ya existe el tipo en BD)
- [ ] Visualización del learning plan completo desde la vista de estudiante

### Organizaciones — Features avanzados
- [ ] Grupos (`Group` / `UserGroup`) — UI para crear grupos y asignar usuarios
- [ ] Asignación de cursos/learning plans a grupos enteros
- [ ] Panel de admin con métricas por organización

### Generador de cursos — Mejoras
- [ ] Foros por curso (preguntas, comentarios de QA)
- [ ] Permisos de acceso al editor por usuario (editor / commenter / viewer por curso)
- [ ] Integración xAPI / SCORM

---

## 📋 Decisiones de arquitectura pendientes

- **Matrícula automática vs manual**: actualmente el endpoint `POST /lms/courses/:key/enroll` es auto-matrícula. Falta el flujo donde un admin matricula a un estudiante desde el panel.
- **Learning Plan correlatividad**: el schema tiene `isCorrelative` y `parentId`, pero la lógica de desbloqueo aún no se aplica en el course player.
- **Cursos públicos / a la venta**: descartado por ahora según decisión en reunión (foco en diseñadores instruccionales + empresas).
- **Cierre de cursos por fecha**: decidido no implementar (los cursos siempre quedan accesibles; solo se incentiva completar en el deadline).
