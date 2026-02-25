# Acadion — Feature Status

> Last updated: 2026-02-25

---

## ✅ Implementado

### Autenticación y usuarios
- [x] Registro con email/password
- [x] Login con email/password
- [x] Login con Google OAuth (SSO)
- [x] JWT tokens con guard global
- [x] Campo `username` único por usuario (editable desde Account)
- [x] Página Account (`/dashboard/account`) — editar nombre, username, ver URL de portfolio
- [x] Roles y permisos: `super_admin`, `org_admin`, `editor`, `commenter`, `viewer`, `student`
- [x] Permisos acumulativos por organización

### Generador de cursos con AI
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
- [x] Generador separado del LMS (accesos independientes)

### Portfolio
- [x] Web separada de `/dashboard` — URL pública `/p/{username}`
- [x] SSR con metadata SEO, retorna 404 si privado
- [x] Dashboard de configuración `/dashboard/portfolio` — título, bio, cursos visibles, toggle público/privado
- [x] Imagen configurable, título configurable, descripción configurable
- [x] Selección de cursos visibles en el portfolio
- [x] Portfolio ejecutable — permite navegar cursos desde `/p/{username}/{courseKey}`
- [x] Temas visuales configurables
- [x] Tracking de visitas al portfolio
- [x] Formulario de contacto público
- [x] Backend completo (`GET`, `PUT` settings, `PUT` courses)

### Notificaciones
- [x] Modelo `Notification` con tipos: `enrolled`, `learning_plan_assigned`, `course_completed`, `course_failed`, `badge_earned`, `invitation`
- [x] Backend: `GET /notifications`, `GET /notifications/unread-count`, `PATCH /:id/read`, `PATCH /read-all`
- [x] Hook `useNotifications` (React Query)
- [x] Componente `NotificationBell` — ícono con contador, dropdown con colores por tipo, marcar leídas
- [x] Integrado en el navbar del dashboard

### Organizaciones
- [x] Entidad `Organization` con cursos asociados
- [x] Backend: crear org, listar, obtener detalle, invitar miembro (por email), cambiar rol, remover miembro
- [x] Invitaciones por mail con validación de registro
- [x] Permisos por usuario y curso dentro de la organización
- [x] Hook `useOrganizations` (React Query)
- [x] UI `/dashboard/organizations` — lista de orgs con rol propio, crear nueva org
- [x] UI `/dashboard/organizations/[key]` — tabla de miembros, dropdown de rol editable, invitar por email
- [x] Grupos (`Group` / `UserGroup`) — UI para crear grupos y asignar usuarios dentro de la org
- [x] Gestión de badges por organización (`/dashboard/organizations/[key]/badges`)
- [x] Gestión de learning plans por organización (`/dashboard/organizations/[key]/learning-plans`)

### LMS — Experiencia de estudiante
- [x] Dashboard de estudiante (`/lms`) con cursos ordenados (en progreso → no iniciados → completados)
- [x] Lista de cursos en progreso con porcentaje de avance
- [x] Botón continuar curso
- [x] Learning plans con barras de progreso
- [x] Backend `LmsModule` con endpoints:
  - `GET /lms/dashboard` — cursos + learning plans del estudiante
  - `GET /lms/courses/:key` — contenido del curso (componentes por unidad)
  - `POST /lms/courses/:key/enroll` — auto-matrícula
  - `PATCH /lms/courses/:key/progress` — tracking de tiempo y completado por unidad
  - `POST /lms/courses/:key/complete` — finalizar curso con score y passed
- [x] Modelo `Enrollment` con startedAt, completedAt, passed, score, attempts
- [x] Modelo `CourseUnitProgress` — progreso por unidad (tiempo activo + completado)
- [x] Course player completo (`/lms/[courseKey]`):
  - Sidebar con todas las unidades (íconos: completada, activa, bloqueada)
  - Barra de progreso en navbar
  - Renderiza los mismos componentes del editor (reutiliza `BlockComponents`)
  - Time tracking activo (se pausa cuando la pestaña pierde foco)
  - Botón "Complete & Continue" que avanza unidad a unidad
  - Botón "Finish Course" en la última unidad
- [x] Acceso al LMS solo para estudiantes (separado del generador)

### Badges
- [x] Modelo `Badge` con tipos: `progress`, `level`, `excellence`, `role`
- [x] Modelo `UserBadge` — badges ganadas con earnedAt
- [x] Backend: servicio/controlador para crear, listar y otorgar badges
- [x] Otorgamiento de badges con notificación automática
- [x] UI: sección "Achievements" en el dashboard del estudiante (`/lms/achievements`)
- [x] UI: configuración de badges en el panel de organización
- [x] Hook `useBadges` (React Query)

### Learning Plans
- [x] Modelos completos: `LearningPlan`, `LearningPlanCourse`, `UserLearningPlan`
- [x] Jerarquía padre/hijo, correlatividad, estimatedDays, badgeName, badgeImage
- [x] Backend: CRUD completo, agregar/reordenar cursos, asignar a usuarios/grupos
- [x] UI: gestión de planes desde organización (`/dashboard/organizations/[key]/learning-plans`)
- [x] UI: detalle de plan con cursos asignados (`/dashboard/organizations/[key]/learning-plans/[planId]`)
- [x] Vista de learning plan desde LMS del estudiante (`/lms/plans/[planId]`)

### Aprendizaje adaptativo
- [x] Evaluación diagnóstica inicial obligatoria (pre-assessment) — confianza por tema, escala 1-5
- [x] Evaluación final (post-assessment) que repite las mismas preguntas para comparativa
- [x] Recorridos diferenciados según autopercepción:
  - Score 5 → unidad salteada (acreditada)
  - Score 4 → solo knowledge check
  - Score 3 → contenido completo
  - Score 2 → contenido + ejercicios extra (extended)
  - Score 1 → contenido reforzado + más ejercicios + knowledge check extendido (deep)
- [x] Lógica por unidad, concepto por unidad
- [x] Posibilidad de saltar unidades
- [x] Modelo `AdaptiveAssessment` para pre/post assessments
- [x] Backend: `AdaptiveService` con cálculo de rutas adaptativas
- [x] Frontend: páginas de pre-assessment y post-assessment (`/lms/[courseKey]/pre-assessment`, `/lms/[courseKey]/post-assessment`)
- [x] Tracking de focus loss durante ejercicios

### Métricas y Analytics
- [x] Tracking de tiempo activo por unidad (`timeSpentSeconds` en `CourseUnitProgress`)
- [x] Tracking de cambios de pestaña / pérdida de foco durante ejercicios
- [x] Backend `AnalyticsModule`: analytics por curso (enrollments, completion rates, pass rates, average scores)
- [x] Analytics a nivel de unidad (tiempo promedio, progreso)
- [x] Analytics a nivel de organización
- [x] Dashboard de métricas para admin (`/dashboard/analytics`, `/dashboard/analytics/[courseKey]`)
- [x] Dashboard de analytics para estudiante (`/lms/analytics`)
- [x] Hook `useAnalytics` (React Query)

### Base de datos (schema)
- [x] `LearningPlan` — jerarquía padre/hijo, correlatividad, estimatedDays, badgeName, badgeImage
- [x] `LearningPlanCourse` — cursos en planes con orden y required
- [x] `UserLearningPlan` — inscripción con deadline y completedAt
- [x] `Badge` — tipo, condición configurable, targetId
- [x] `UserBadge` — badges ganadas con earnedAt
- [x] `Group` / `UserGroup` — grupos dentro de organizaciones
- [x] `AdaptiveAssessment` — evaluaciones pre/post adaptativas
- [x] `KnowledgeCheckAttempt` — intentos de evaluaciones

---

## 🚧 Parcialmente implementado

### Editor colaborativo (estilo Google Drive)
- [x] Roles definidos: `editor`, `commenter`, `viewer` en el schema de organización
- [ ] Permisos de acceso al editor por usuario a nivel de curso individual
- [ ] Sistema de comentarios/sugerencias en el editor de curso
- [ ] Interfaz colaborativa estilo Google Drive (comentar, sugerir cambios)

### Onboarding
- [x] Flujo básico de onboarding — setup de organización al primer login (`/onboarding`)
- [ ] Curso público para aprender a usar la plataforma (tutorial del propio LMS)

---

## ❌ Pendiente

### Generador de cursos — Mejoras
- [ ] Generación automática de lógica adaptativa vía AI (opción de activar/desactivar modo adaptativo desde el generador)
- [ ] Integración con el generador para generar contenido adaptativo (nuevo handler o parámetro en los existentes)
- [ ] Foros por curso (preguntas, comentarios de QA)
- [ ] Integración xAPI / SCORM — exportar curso en formato estándar

### LMS — Features avanzados
- [ ] Correlatividad en el course player (bloquear unidad hasta aprobar la anterior)
- [ ] Knowledge check con intentos configurables y tiempo límite
- [ ] Re-matrícula manual por admin cuando el estudiante desaprueba
- [ ] Timer de inactividad ("¿seguís ahí?") con pausa automática

### Métricas y Analytics — Pendientes
- [ ] Comparativa estimado vs real (tiempo por unidad)
- [ ] Resultados de knowledge checks por pregunta
- [ ] Historial de intentos detallado
- [ ] Comparativa pre/post confianza en analytics del estudiante

### Escalabilidad e infraestructura
- [ ] Hosting de imágenes externo (S3, Cloudinary o similar)
- [ ] Evaluación de costos de video
- [ ] Soporte para alto tráfico (optimizaciones de performance)

---

## 📋 Decisiones de arquitectura pendientes

- **Matrícula automática vs manual**: actualmente el endpoint `POST /lms/courses/:key/enroll` es auto-matrícula. Falta el flujo donde un admin matricula a un estudiante desde el panel.
- **Learning Plan correlatividad**: el schema tiene `isCorrelative` y `parentId`, pero la lógica de desbloqueo aún no se aplica en el course player.
- **Cursos públicos / a la venta**: descartado por ahora según decisión en reunión (foco en diseñadores instruccionales + empresas).
- **Cierre de cursos por fecha**: decidido no implementar (los cursos siempre quedan accesibles; solo se incentiva completar en el deadline).
- **Adaptativo desde generador**: la lógica adaptativa funciona en el LMS, pero falta la integración para que el generador de cursos produzca contenido adaptativo automáticamente.
- **Dashboard diferenciado por rol**: actualmente el dashboard muestra las mismas secciones; falta personalizar la vista según el rol del usuario.
