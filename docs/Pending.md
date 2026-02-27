
crea agent teams para las siguientes tareas:

1. termina la feature de onboarding, tu analisis fue: Onboarding	--	Partial	Pending (page exists, no backend flow)

2. COmpleta estos pendientes para invitations. Para el servicio de email vamos a usar SES de AWS, crea las env variables necesarias, el servicio que envia los emails y todo lo necesario.
pendientes:
  - No hay modelo Invitation en la DB -- no se guardan invitaciones pendientes
  - No se envía email -- no existe servicio de email en todo el proyecto
  - No se crea notificación -- el tipo invitation existe en el enum pero inviteMember()
  nunca llama a notificationService.create()
  - Si el usuario no existe, se pierde -- el response dice "Invitation sent" pero es
  mentira, no se almacena nada
  - Para groups, se agregan miembros por userId directamente (el usuario ya debe existir)

3. completa este tema:
evaluateAndGrantBadges se llama desde un solo lugar:
  - lms.service.ts:364 — dentro de completeCourse(), con type: 'course_completed'
  Nadie llama evaluateAndGrantBadges con type: 'plan_completed'. El badge service sabe
  evaluar esa condición (línea 243), pero nunca se dispara porque no hay código en el
  learning plan service que detecte "este usuario completó todos los cursos del plan" y
  llame a evaluateAndGrantBadges({ type: 'plan_completed', learningPlanId }).

  Lo mismo pasa con completed_in_time — la lógica de evaluación existe en el badge service
  (líneas 220-233) pero depende de recibir un evento plan_completed que nunca llega.

  En resumen: el badge service puede evaluar 5 tipos de condición, pero solo
  course_completed y score_above se disparan realmente (ambos desde completeCourse). Los
  otros 3 (plan_completed, completed_in_time, first_in_org) tienen la lógica lista pero
  nadie los invoca.


Pendientes:
- RBAC no enforceado en endpoints (roles se guardan pero no se verifican)
- Pagos/planes solo visual
- No post-generation content editing (UI buttons exist but are non-functional, no backend endpoints)
- Actualiza mock con print screen del dashboard cuando este terminado
