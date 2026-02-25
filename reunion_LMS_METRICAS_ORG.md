Te voy a pasar una reunion de definicion de features para Acadion, aca tenes el back y la web con el sistema hasta ahora.
En la reunion hablamos de varios cambios, implementalos. Create cuantos agent teams sean necesarios para dividir bien las tareas.

Ademas te voy a pasar un documento y su resumen con caracteristicas de como deberia ser el LMS, implementalas.
Si tenes dudas o hay contradicciones, preguntamelas.

Ademas implementa un Portfolio, es una web separada del raiz y de /dashboard.
Y debe existir una direccion por cada usuario, por ejemplo /p/{user_name}
Los user_name tienen que ser campos unicos por usuario, se le pregunta en el registro y se lo puedo cambiar luego desde el dashboard de la tipica pagina de Account.
en la image portfolio.png tenes un ejemplo de como debe verse esa pagina de portfolio.
La imagen debe ser configurable por el dueño del portfolio en una seccion Portfolio del dashboard. Lo mismo que el titulo, descripcion y que cursos son visibles en ese portfolio.

<reunion>
00:00:02 Esteban
Sí, en este momento no, pero rapidito, vamos a hablar de acá. Yo soy Esteban. Bueno, nos quedamos en. Nos quedamos a grandes rasgos qué módulo necesitamos. Yo empiezo: LMS, generador de cursos, portfolio.

00:00:25 Vanesa
Son esos tres. ¿Y cómo hacemos el detalle de cada uno.

00:00:31 Esteban
No, aprendizaje asistido. ¿Qué hacemos con eso.

00:00:34 Vanesa
Eso es. No se llama aprendizaje. Se llama aprendizaje adaptativo.

00:00:38 Esteban
Adaptativo. ¿Qué hacemos.

00:00:39 Vanesa
Eso es que el LMS. Eso significa que el LMS permite generar recorridos diferenciados según lo que sabe o lo que le cuesta a la persona que está cursando. Entonces combina características del LMS con el generador de cursos. Quiere decir que cuando uno hace aprendizaje adaptado, tiene que haber como actividades diferenciadas, según por dónde anda la persona y el LMS tiene que poder identificar, porque la persona le da como input para ofrecerle un recorrido particular del curso.

00:01:14 Vanesa
Por eso tiene que estar unidos. No tiene nada que ver con portfolio.

00:01:18 Esteban
¿Y sería la misma interfaz que el generador de cursos.

00:01:27 Vanesa
No. Porque eso sí, lo que hay que pensar es que está destinado al estudiante. Entonces lo único que el estudiante ve es el portfolio y el LMS. En ningún caso el estudiante accede al generador de cursos. Entonces el estudiante va a ver su aprendizaje adaptado en el LMS.

00:01:45 Esteban
Pero el que genera el curso, ¿generaría el aprendizaje adaptativo con el generador de cursos o tuviera que ser otro generador de cursos.

00:01:55 Vanesa
No, es el mismo generador. Podría pensarse que hay un curso por default que es para un estudiante estándar, vamos a decirlo así, no un estudiante. Vamos a imaginar que el estudiante estándar en un ejemplo hago un curso de Scrum, un estudiante estándar es aquella persona que no sabe nada de metodologías ágiles. Entonces el generador de cursos hace el curso estándar, no introducción a metodologías ágiles, que es Scrum, que se diferencia de otros, bla bla. Y después uno tiene una capa como más de diferenciado, por ejemplo.

00:02:27 Vanesa
Cómo ese curso se rediseña en el caso de que la persona ya sepa de metodologías ágiles, pero no de scrap.

00:02:33 Esteban
Bien, ¿cómo sabemos que el estudiante sabe de metodologías.

00:02:37 Vanesa
Porque cuando el curso arranca, hay una primera parte que le tiene que hacer preguntas al estudiante. Le hace preguntas sobre esto. ¿Interactuaste en un momento? ¿Participaste de algún equipo.

00:02:50 Esteban
Ok, stop acá. Esto lo metemos en la interfaz, onda en el formulario de inicio le ponemos: ¿Querés que sea un curso adaptativo? ¿Voy a generar preguntas.

00:02:59 Vanesa
No, no. Cualquier curso tiene que arrancar con indagación de conocimientos previos. No importa cómo sea, cualquier curso, la primera parte lo primero que ve el estudiante es una serie de preguntas que le hacen preguntas sobre aquello que va a aprender, con la intención de que se pueda saber cuánto sabe, cuán lejos o cuán cerca está de lo que se va a enseñar. ¿Hasta ahí me seguís? Y lo ideal sería que esas preguntas que se hacen al inicio, cuando la persona es la unidad cero, vamos a decir, esas preguntas se vuelvan a hacer al final y el LMS le arroje al estudiante la comparativa.

00:03:36 Vanesa
Che, mira, vos al principio marcaste un del uno al 5, marcaste un 2, como que sabías más o menos de metodologías ágiles. Ahora que hiciste todo el curso, te volvemos a preguntar y ahora decís que sabes cuatro. Este curso te permitió mejorar.

00:03:53 Esteban
Cuando yo genere un curso sí o siempre, a partir de ahora esto no estaba antes. A partir de ahora vamos a generar preguntas para indagar los conocimientos previos del estudiante. Exactamente. En base a esas preguntas, yo tengo que generar el curso adaptativo. El camino adaptativo. Se lo dejamos todo a la AI y que resuelva, hacer. Che, contestó bien esta primera pregunta. Le preguntamos: "¿Qué es un Sprint?" y lo contestó correctamente.

00:04:24 Esteban
Entonces, quizás acá vos me dirás ¿se saltea la parte de Sprint.

00:04:30 Vanesa
Exactamente. Y está bueno que lo haga la IA porque pasa una cosa. Imaginate que esa evaluación inicial de conocimientos previos tenga 10 preguntas que abarcan los conceptos más importantes. Los 10 conceptos centrales de Scrap. y que cada unidad del curso aborda un concepto, lo vamos a decir así bien esquemático. Bueno, supongo que cada persona hay combinaciones no infinitas de posibles soluciones de eso. Ponele que a la primera pregunta sobre Sprint, Sprint uno diga 5, lo reconozco, te doy a 4, te doy a 3.

00:05:00 Vanesa
Como son tantas las combinaciones posibles, ahí la IA debería ayudar, uno no puede hacer todos los cursos específicos según cada posible combinación de qué respuesta dio la persona. Entonces la IA debería tener algún criterio, por ejemplo, Si en la pregunta sobre cuánto sabe de Sprint, la persona respondió 4 o 5, bueno, podríamos decir que saltea la unidad Sprint. Si respondió 3, bueno, la ve a la unidad. Si respondió 1 o 2, la ve y hace más ejercicios para asegurarnos que lo sepan.

00:05:33 Vanesa
Habría que darle como un criterio para que pueda tener alguna lógica de cómo va a desarrollar el curso cada persona. Pero es verdad que la persona, el diseñador, no puede desarrollar todas las opciones posibles de respuestas y combinaciones de respuestas que el estudiante.

00:05:49 Esteban
Siempre la lógica sería una unidad, un concepto, le hacemos preguntas sobre todos esos conceptos al inicio, si lo sabe, salte a la unidad, ¿eso sería como la lógica básica o a ver una lógica básica.

00:06:04 Vanesa
Hay un detalle más, si lo sabe muy bien, ponele que pone 5 como lo resé, Se puede prescindir de esa unidad, no hace falta ni que la haga. Si lo sabe 4, puede hacer, te lo desagrego.

00:06:17 Esteban
Entonces son varias preguntas por unidad, no una sola. Hay que indagarlo mucho sobre esa unidad.

00:06:21 Vanesa
No, no. La unidad se llama Sprint y la pregunta de la evaluación inicial es: ¿Cuánto sabés de Sprint? Del 1 al 5 es 1 es nada, 5 es un montón. Lo tengo clarísimo. La persona puso 5. Cuando termina de responder todo, arranca su curso.

00:06:36 Esteban
Ah, no le está preguntando, ah, yo pensé que le preguntaba conceptos, onda, ¿qué es un sprint? No, no, no, es solamente preguntarle cuánto sabés, cuánto sabés de esto. ¿Por eso confía demasiado ahí en el estudiante.

00:06:49 Vanesa
Sí, pero es 1000 veces mejor que decirle qué es un sprint y que la persona por intentar resolverlo bien Sara se o que vaya a ChatGPT y le pregunte. O sea, la idea es cuánto vos sentís seguridad.

00:07:00 Esteban
¿Cómo se llama este formulario inicial de indagación de conocimientos previos? OK, OK.

00:07:05 Vanesa
por decirle alguna cosa. No estamos viendo exactamente qué sabe, sólo estamos preguntándole cuán seguro se siente. Normalmente la gente lo que tiende a hacer es no poner 5 como lo rese. La gente suele bajar su conocimiento. Entonces habría que pensar del 1 al 5, que es una buena escala, qué pasa cuando la persona responde 1 "no sé nada", qué pasa cuando responde 2 y ahí hay un desagregado posible. Yo me imagino esto. Si responde 5, soy un crack, recelo que es un sprint. Ni se le ofrece la unidad, se la da por aprendida y acreditada.

00:07:36 Vanesa
Si responde 4, no tiene acceso al contenido de la unidad, sólo va a resolver algunas preguntas para corroborar que esté todo ok. Y ahí sí son preguntas. Un sprint es "multiple choices". O uní la definición con la palabra y que haya un distractor. Como ejercicios para chequear efectivamente que lo sepa.

00:07:55 Esteban
¿Cuándo al final o después de esa.

00:07:59 Vanesa
No, es que ni siquiera entra a la parte de contenidos de la unidad. Toda unidad tiene un desarrollo de contenidos, se ponen en preguntas, que es el knowledge check.

00:08:07 Esteban
¿Esto que vos dijiste, es el knowledge check.

00:08:08 Vanesa
Claro, siempre hablo de knowledge check.

00:08:10 Esteban
En el mismo lugar que estuvo siempre.

00:08:11 Vanesa
Claro, al final, la unidad puede tener adentro una pregunta.

00:08:14 Esteban
Vos lo que estás diciendo es si el puso 4, solo un knowledge check y ya está.

00:08:18 Vanesa
Claro, no hacemos que lea el contenido, que vea el video. Si responde 3, significa que está más o menos. Bueno, ahí hace completo todo. Hace todo el contenido, que adentro quizás tiene alguna preguntita de seguimiento y hace el noledge check.

00:08:29 Esteban
Ok, entonces tenemos tres ámbitos: 1, 2, 3, 4 o 5. Eso sería 1, 2, 3 y no hace todo.

00:08:35 Vanesa
Eso fue 5, 4, 3. Estoy lleno de jazz.

00:08:37 Esteban
El 2 es diferente.

00:08:38 Vanesa
Vamos al 2. El 2 es que tiene alguna idea. Bueno, ahí se puede intensificar. Entonces, por ejemplo, está el desarrollo de la unidad y adentro se le meten más ejercicios en el medio antes del noledge check. "Che, no tengo idea, no sé de qué me estás hablando". Bueno, el 1 tiene que ser súper, tiene que ser el contenido completo. Adentro ejercicios de seguimiento y el knowledge check un poquito más largo para asegurarnos que hizo todo eso, que es mucho esfuerzo, pero nos aseguramos que la persona que no tenía nada más variedad de ideas está re convencido.

00:09:08 Vanesa
Ya tiene clarísimo lo que es un sprint.

00:09:10 Esteban
Este mecanismo de aprendizaje adaptativo, ¿lo hacemos por defecto para todos los cursos o le damos la opción al usuario del diseñador, de no hacerlo.

00:09:25 Vanesa
Puede ser una feature que se agrega como un plus también.

00:09:29 Esteban
No, pero concretamente yo le doy la opción de no hacerlo si no lo quieren hacer. Si el diseñador no quiere que eso esté.

00:09:34 Vanesa
Es que el diseñador solo, en uno o en otro yo me imagino que haría lo mismo siempre. Si elige no hacerlo, va a desarrollar un curso con la IA, que va a tener ejercicios al final en una leche, que eso es un curso básico sin nada de esto. ¿Qué sería con esto? Bueno, que ahí la inteligencia, Con estos parámetros que le damos de ese curso que la persona hizo normalmente contenido, agrega o saca según el tipo de respuesta que dio la persona, pero eso no lo es el diseñador. El diseñador en ambos casos diseña lo mismo, ¿entendés? La IA, y eso sería el plus recopado, la IA le arma toda esta estructura adaptativa, en caso de que el diseñador diga "sí, lo quiero adaptativo".

00:10:12 Vanesa
Pero no es que el diseñador se pone a armar. Ahora esta opción, ahora tengo que hacerle más ejercicios.

00:10:18 Esteban
Mi pregunta es, va a haber diseñadores que no quieren hacer aprendizaje adaptativo. No lo quiero. Entonces tiene que estar con una opción, tiene que ser una opción para elegir o no si queremos, genera el aprendizaje adaptativo y toda la lógica o no.

00:10:32 Vanesa
Sí, lo que sí te quiere decir es, en uno o en otro, si esto le tiene que dar claro al diseñador. No es que si elijo adaptativo tengo que trabajar 18 veces más.

00:10:40 Esteban
No, claro, todo lo hace.

00:10:42 Vanesa
Entonces yo siempre invitaría a que hagan el adaptativo, que a nivel formativo es mil veces mejor que un curso estándar. Lo que tenemos ahora es un curso estándar. No importa si vos sabés o no, tenés que hacer todo el contenido, hacer un check.

00:10:58 Esteban
Hablemos del LMS. Entiendo lo que es, pero necesito como un montón de detalles finos. Capaz que esto me lo pasé por otro lado pero. ¿Querés que te lo describa? Pero el detalle. Todas estas métricas. Quiero medir todo esto de lo que pasa en el curso.

00:11:16 Vanesa
El LMS es el entorno al que accede el estudiante. El único entorno, se loguea y entra. lo que encuentra el estudiante cuando accede es un dashboard, en donde debería tener variaciones.

00:11:29 Esteban
Hablemos del logueo. Vayamos al logueo.

00:11:34 Vanesa
Mis preguntas para la experta son: ¿Cómo se loguea el usuario.

00:11:56 Esteban
¿Qué hay que tener en consideración cosas de seguridad? ¿Se va a loguear con el mail de la empresa? ¿Va a crear una cuenta personal con Google? Tiene que tener Google, me imagino que sí. Single Sign On de Google. ¿Qué más te logueo? ¿Es por invitación? ¿Cómo hacemos? Que no se pueda registrar ni loguear, sólo por invitación. ¿Cómo manejamos eso.

00:12:22 Vanesa
No sé el detalle de todas. Te puedo contar un ejemplo. En el caso de Dochevo, que es este LMS, vos tenés dos opciones. Si vos no pertenecés a BeWay ni a ningún cliente de la empresa, que ha usado Chevo, vos te podés loguear, pero entrás y el dashboard está absolutamente vacío, no podés hacer nada. No sé si es un error de diseño o si tiene una intención, pero para mí tiene sentido que existe la opción de que cualquier persona random se pueda loguear.

00:12:47 Esteban
Eso sí, claro.

00:12:48 Vanesa
Se pueda loguear y entre. Si esto lo va a trabajar una empresa, la empresa tiene que decir "che, yo quiero que haya algún curso, no sé, introducción a mi producto, para cualquier persona que en el mundo quiera loguearse y hacerlo, ¿O es un LMES que yo como empresa lo contrato para capacitar a mis empleados? Y se acabó. Entonces no voy a liberar ningún contenido a nadie.

00:13:11 Esteban
Por lo que decime queda claro que es por invitación. O sea, vos registrate con tu mail de tu empresa si querés, pero hasta que no te invite, no tenés acceso a los cursos.

00:13:17 Vanesa
Ahora, si estamos hablando. Eso sí, uno habla de empresas. Si uno es un diseñador freelance y acá le ofrece un LMES, que es una opción súper interesante, bueno, ahí sí, ahí está más liberado. Hay dos opciones, o que ese freelance, use el LMS y libere cursos, y los pague, y entonces la gente los compra, cualquier persona se lo vea, compra el curso y lo hace, como el caso de Terra, por ejemplo. O que el Diseñador Instruccional tenga su LMS y arme planes de aprendizaje y a ciertas personas las matricule.

00:13:51 Vanesa
"No, no, yo a este curso que pagaron tal, tal y tal, manualmente voy a inscribirlos como estudiante a tal, tal". O sea que esas personas cuando entren a su dashboard. Entonces podemos decir que el LMS.

00:14:03 Esteban
El LMS, cuando vos te lo veas sin ningún tipo de invitación, vas a ver un repositorio, una lista de cursos a la venta, públicos. Esto es para el mundo freelance. No es para el mundo freelance, es para la gente que hace cursos, mejor dicho. No para el diseñador, sino sería otro cliente, sería el cliente. Una empresa. Alguien que quiere generar. No, no la empresa. Yo soy Juan, quiero dar un curso de cerámica y y quiero venderlo. Entonces lo publico ahí, es público, todos lo pueden ver, pero para entrar tienen que pagar.

00:14:34 Esteban
Exactamente. Bueno, eso es otra parte del negocio. ¿La queremos incluir acá.

00:14:39 Vanesa
Sí, porque es la parte en la que el usuario, nuestro cliente, es un freelance.

00:14:44 Esteban
Está bien, pero nosotros habíamos hablado de freelance diseñadores, no freelance vendedores de cursos.

00:14:49 Vanesa
¿Queremos hacer eso? Es que muchas veces el diseñador es el que vende el curso. Es lo que yo siempre quise hacer y nunca me siento a hacerlo. Parame, algo que es importante también y que suma como a la usar.

00:15:02 Esteban
No, yo creo que tenemos que, de nuevo, ahí nos fuimos a otro tema. Tenemos que focalizarnos en un cliente que sería diseñador instruccional freelance y empresas chiquitas que venden cursos y empresas grandes que tienen un departamento interno de educación. ¿Nos enteramos ahí? Porque el otro me parece que ya existe un montón de competencias.

00:15:24 Vanesa
O sea, ya hay un montón. No hay tantas competencias de LMS para gente, es un buen tema. Si yo, Vanessa, diseñador instruccional, quiero hacer cursos y venderlos. Yo hoy sólo tengo Moodle porque es gratis, pero es re difícil de gestionar yo solita y Dochevo y todas las olas son bastante caras. Entonces hoy en día para aquel. Diseñador de instrucción el que quiere los cursos que armó venderlos por su cuenta. No hay algo. Casi todos son para empresas, para muchos usuarios.

00:15:52 Esteban
Yo hablo de plataformas como Platzi, como ya existen. O sea, creas tu curso y lo vendés.

00:15:57 Vanesa
Bueno, pero Platzi vos estás comprando un servicio que tenés que pagar, se llevan una comisión, todo. O sea, es otra cosa. Acá vos estás toqueteando todo. Vos a Platzi le mandas el coso, como mucho diseñarás la landing, pero Platzi funciona por adentro con sus administradores. Acá el diseñador. Puede toquetear, puede hacer cosas. Bueno, no sé, yo. Bueno, no nos vayamos por ahí.

00:16:17 Esteban
No, no, es que me parece que es otro. Bueno, está mandando otra cosa. Lo que sí es importante. Hay que pensarlo. Yo lo había descartado completo, ya lo habíamos hablado.

00:16:26 Vanesa
No, lo que hablamos es que el portfolio. No, y tuvimos un montón de discusiones. Lo que hablamos es que el portfolio sea ejecutable. Eso fue nuestra última conversación, para que si una persona se muestra ante un posible empleador.

00:16:39 Esteban
Pero un diseñador instruccional, siempre bueno para un diseñador instruccional.

00:16:42 Vanesa
Siempre. habíamos dicho que eso fue hasta donde llegamos, que el diseño de instruccional tenga la forma de que quien está mirando su portfolio pueda navegar un curso. Eso es lo que hablamos en su momento, que el portfolio sea ejecutable, lo vamos a decir. Que haya una suerte de recorrer el curso, no capturas de pantalla como es lo que hay ahora en cualquier portfolio.

00:17:06 Esteban
Sí, me acuerdo, pero no, estás mezclando, vos estás confundida. Estás mezclando otra vez el tipo de clientes. Por ahora vamos a apuntar sólo a estos clientes. Diseñadores instruccionales freelance, agencias que venden cursos, empresas grandes que tienen departamentos adentro. No una señora que hace cerámica y quiere vender un curso. Eso no.

00:17:26 Vanesa
Porque eso no es lo que yo estoy diciendo. No estoy diciendo un diseñador instruccional que vende sus cursos. Si vos me decís que la señora que hace cerámica es una diseñadora instruccional, bueno, entra en la categoría. ¿Entendés? Yo hablo del diseñador instruccional que vende sus cursos. No importa, nos estamos yendo porque la pregunta que me hiciste fue "logueo" y ahora nos tenemos que poner ahí. Entonces, según las personas que vos me acabas de decir que serán los destinatarios, los logueos serán los que correspondan. En cualquiera de esos ejemplos, lo que sí estaría bueno que pasa es que haya un curso, que en lugar de hacer un tutorial de cómo usar el LMS,

00:18:01 Vanesa
aparezca en formato de curso. Eso está buenísimo, te ayuda. Entonces, cualquier persona, sea de afuera, de adentro, cualquiera sea, tiene siempre un curso que aparece visible que es "aprender a usar este LMS".

00:18:13 Esteban
Un curso, sería un curso de la misma plataforma.

00:18:15 Vanesa
Exacto. En vez de que haya un pdf tutorial.

00:18:18 Esteban
Como una "bienvenida".

00:18:19 Vanesa
Claro, ¿querés conocer? Bueno, en este curso te enseñamos cómo y eso sirve un montón.

00:18:23 Esteban
Cuando terminemos, generamos un curso que haga todo eso.

00:18:26 Vanesa
Y que siempre, cualquier persona, no importa qué tipo de usuario es, siempre va a tener acceso a ese curso, que le va a mostrar todas las funcionalidades, cómo se hace, bla. Eso tiene que estar. Bueno, ese es el MS. Eso es el odio.

00:18:42 Esteban
¿Qué otra cosa? El usuario entra y como estamos ahora, va a haber una lista de cursos, va a haber solamente un curso de bienvenida propio nuestro, que después yo lo genero con Aiday, y no va a haber más nada hasta que alguien lo invite. O le de acceso de alguna forma. Bueno, ahí el diseñador instruccional o la empresa, el usuario administrador, porque tiene que haber varios tipos de usuarios, tiene que haber grupos y permisos.

00:19:14 Esteban
Tiene que haber un grupo que me imagino es súper admin. Ese hace todo, ese agrega gente, agrega usuarios. Manda invitaciones, agrega usuarios como diseñadores instruccionales para que tengan acceso a los cursos. O sea, ese súper admin va a ver toda la lista de cursos de la empresa, de la cuenta. También necesitamos una entidad organización que creo que ya existe en la base. El súper admin va a ser dueño de esa organización. Los cursos van a depender de la organización. El súper admin va a decir este curso lo puede ver tal diseñador instruccional.

00:19:48 Esteban
¿Eso está bien.

00:19:49 Vanesa
Vamos a decirlo mejor, usemos Moodle como ejemplo. Moodle tiene super admin, ¿no? Y después tiene profesor, profesor sin. permisos de edición, estudiante como medio básico, pero creo que nos va a ayudar. Cuando yo digo profesor, estoy diciendo profesor con permisos de edición, que básicamente es el profesor que tiene permisos para en el LMS configurar la propuesta, no el curso.

00:20:19 Vanesa
Ahí estamos hablando del diseñador instruccional, hasta ahí me seguís. ¿Por qué? Porque básicamente puede tocar, hacer cosas, subir, cambiar, vamos a decir, generar el curso, también montarlo, retocarlo, todo lo que fuera. Ese sería el que viene después del administrador. No tiene permisos para tocar otros cursos en donde no esté como asignado.

00:20:41 Esteban
Digamos, no, bueno, después está.

00:20:43 Vanesa
El profesor sin permisos de edición y ahí vamos a poner agente. Que tiene que por pronto entrar al curso porque no sé, es colega de este diseñador, son otros diseñadores, le hacen QA, es el jefe, es otra gente que no estudia el curso, pero que tiene que haber como toda la propuesta, pero no tiene permisos de edición, no puede tocar nada, no puede cambiar, sólo puede acceder como si fuera profe sin ningún cambio, profesor sin permisos de edición. Ahí normalmente se suelen meter a los jefes de los diseñadores instruccionales, a los que hacen QA, a gente de diseño.

00:21:19 Esteban
Está bien, yo para no creemos, no para, creemos profesor, está bien profesor sin permisos de edición, me parece muy largo. Pongámosle, no puede ser visor, visualizador y Q A, otra cosa, otro permiso, porque es otra cosa. Entonces que el que pueda ver no pueda hacer Q A, separémoslo todo y que alguien lo ponga y lo configure como quiera. Total, vos. Yo a una persona le puedo dar más de un grupo, le puedo decir: "Che, vos sos profesor y cuán". Podés ver cursos y podés hacer cuán? Bueno, se puede.

00:21:49 Vanesa
En Moodle, y te digo como buena práctica en Moodle, sos una cosa o sos la otra. No compartís varios roles porque se te pisan permisos. Lo mismo pasaba en Fidias.

00:21:59 Esteban
No, no se pisan, se suman. No se pisan, se suman.

00:22:02 Vanesa
Pero esta lista que te acabo de hacer, cada uno trae más que el otro. Estudiante es muy básico. Profesor sin permiso de edición ve más que el estudiante, profesor ve más que los otros dos, es acumulativo. Esto que te dije de QA, no hay una cosa específica que viera el de QA, que no puede ver otro.

00:22:22 Esteban
Espera, no pensemos en los permisos, decime qué necesitamos que hagan las personas. Dijimos, profesor puede editar, profesor sin permiso de edición puede ver, nada más.

00:22:31 Vanesa
Puede ver la propuesta con los ojos del profesor.

00:22:34 Esteban
Bien, y ese puede ser QA, decías.

00:22:35 Vanesa
Claro, porque por ejemplo hace eso, puede mirar. No, no deja comentarios. Comentarios de QA. Sí, en un LMS no se dejan comentarios.

00:22:43 Esteban
Comentarios de QA.

00:22:44 Vanesa
Tampoco. Cuando digo QA me refiero a algo muy general, gordo, que se hace un proceso de QA. Normalmente cuando algo se monta ya está totalmente revisado.

00:22:51 Esteban
Pero no estamos hablando de los profesores sin permiso de edición, va a entrar al curso, además del LMS. Va a entrar al curso, al editor de curso. ¿Por qué hace tanto calor.

00:23:04 Vanesa
No sé. ¿Qué te digo ahí? Hay un montón de veces en las que, por ejemplo, un diseñador instruccional quiere ver otro curso que hizo otro, para ver cómo lo hizo, para ver la estructura. Entonces no necesita editarlo, solo entrar a mirar. Podemos decir que es un lector.

00:23:23 Esteban
Pero ese es buen ejemplo. Si yo quiero que el tipo vea un curso nada más, quiero que un diseñador instruccional o un profesor vea un curso, pero que no haga QA.

00:23:32 Vanesa
Que no haga nada.

00:23:33 Esteban
No haga nada. Profesor, sin permisos de edición, me dijiste que puede hacer QA. Entonces por eso yo decía separarlo.

00:23:41 Vanesa
Claro, pero te desarrollo lo que yo dije cuando me refiero a QA. Cuando pienso en QA es, por ejemplo, puede ser el líder. Che, ya monté todo el curso en LMS, lo podés mirar, dale, lo miro, hace una revisión, vamos a decir algo más liviano que un QA. Hace una revisión, se fija que todo esté bien. Que esté bien montado, que no haya algún error de diseño. No necesariamente es un coa forzosamente que le deja comentarios, que es alguien que pueda mirar. ¿Por qué? Porque lo que ve el profesor es distinto a lo que ve el estudiante.

00:24:12 Esteban
¿Qué pasa si yo tengo una persona que no es profesor ni es diseñador instruccional y quiero que mire un curso.

00:24:17 Vanesa
Profesor sin permisos de edición.

00:24:19 Esteban
Entonces entendés que el nombre está mal, porque no es profesor, no es diseñador, pero yo le di permiso para que mire un curso. Hay que usar otro nombre. Yo le pondría visor, visualizador, Bueno, entendé lo que digo para usar bien los nombres, pero es un tema de nombres, cambiarle el nombre, nada más. No le digamos profesor, además es muy largo. Entonces, digámosle, yo estoy usando Moodle como referencia, es el mejor sitio. Yo me sentaría más en la función, quizás sería mejor. Editor, QA, visualizador, ¿me entendés?

00:24:49 Esteban
Cámbialo si querés el nombre, pero me enfocaría más en la.

00:24:52 Vanesa
Yo no me enfocaría en funciones, sino en los permisos como Google.

00:24:56 Esteban
No, la función te da el permiso, te da los permisos.

00:24:59 Vanesa
Ahí te estás mirando con QA. Olvídate de QA porque se nos hace el lío. Tiene que ser alguien que pueda editar, alguien que pueda ver.

00:25:05 Esteban
Necesitamos alguien que pueda ver y alguien que pueda editar. Y alguien que pueda hacer QA? Olvídate de QA. No, el QA es re importante. Le tenemos que dar permisos a alguien para que haga QA. Sólo haga QA, no edite ni nada más. ¿Eso está bien o mal.

00:25:20 Vanesa
No, está mal porque está mal en este sentido. No quiere decir que no sea deseable. No existe hoy ningún LMS donde se puede.

00:25:26 Esteban
No, eso no me importa. No es que no me importa si existe o no.

00:25:29 Vanesa
Bueno, no le encuentro sentido y por eso creo que ningún LMS lo implementa para que se haga un QA adentro del montado del enmaquetado del proyecto.

00:25:39 Esteban
Nadie habló de enmaquetado, nadie habló de nada de eso. Yo lo que estoy diciendo es que se diseña el curso, nadie habló del LMS de nada.

00:25:45 Vanesa
Estamos hablando del LMS.

00:25:47 Esteban
No, no, estamos hablando de todo el sistema. No, ah, bueno, eso estoy hablando. Esperá, todo el sistema, qué permisos, usuarios y cosas necesitamos. Necesitamos mandar invitación para que se sumen al LMS. Necesitamos mandar invitación para que se sumen como editores o profesores. Necesitamos mandar invitaciones para que lo vean solo visores, visualizadores.

00:26:13 Vanesa
Es muy difícil diagramar esto si mezclamos LMS con generador de cursos, porque son dos cosas distintas. Que Acadion ofrezca las dos no significa que estén juntas. Son dos instancias distintas.

00:26:23 Esteban
Estoy de acuerdo, pero están muy relacionadas.

00:26:25 Vanesa
Está bien, pero no podemos forzar los usuarios como aparecen en un LMS respecto a qué es lo que pasa en el generador de cursos. Es como mezclar RAIS con 2 chevos. Son dos cosas distintas. Lo que pasa es que Acadion las va a ofrecer.

00:26:38 Esteban
Centralicemos en el editor. Vamos al editor. Yo soy, tengo una organización, soy el súper admin. Necesito que los empleados empiecen a trabajar, o sea, los diseñadores empiecen a trabajar en hacer cursos. Entonces les doy acceso. Yo diría que hagamos lo típico, que es una parte de usuarios, agregar miembros, agregar usuarios, lo que sea. Cuando le ponen el mail, Pepito, no sé qué, se le manda una invitación, el tipo hace click, va, se loguea, tiene que tener el mismo mail, hacemos todo ese chequeo de seguridad y qué sé yo.

00:27:09 Esteban
Y esa persona tiene acceso. A la plataforma, después este usuario, este súper admin, tiene que darle permiso a los cursos que quiere hacer o le tiene que dar un permiso de podés crear cursos. Está bien, exacto, después tiene que darle permiso a gente para que haga QA y tiene que darle permiso a esa gente para que vea el diseñador del curso o no, no hace falta eso.

00:27:31 Vanesa
¿Qué significa vea el diseñador del curso.

00:27:33 Esteban
Para que alguien se meta en el diseño del curso, en el editor del curso y lo mire o eso no sirve para nada.

00:27:41 Vanesa
Pensalo así, no decepción, no gorda, es que no está mal la pregunta. Para mí lo que hay que emular en el en la herramienta de Acadion para diseñar cursos es Google Drive, que tenés permiso de edición de lector y uno de comentarista. Veamos esos 3 como al cuál sería el paralelo. El editor es la persona que hace el curso, no el diseñador instruccional.

00:28:05 Esteban
Ya entendí todo, pero es en siempre hablamos en el modo de edición del curso.

00:28:09 Vanesa
Entonces la respuesta era así.

00:28:11 Esteban
La respuesta era así. Queremos a alguien que mire el editor del curso. Hay un chabón caminando por el medio de la calle. Queremos a alguien que edite el curso. Queremos a alguien que haga QR en el curso.

00:28:22 Vanesa
Yo lo voy a llamar comentarista, que es como la opción de Google Drive, que podés mirarlo y dejar comentarios. No impactas el cambio. No sería lo ideal para un QR. Que nadie venga y te lo toque, sino que te dejo un comentario.

00:28:33 Esteban
Perfecto.

00:28:36 Vanesa
Eso es en el vamos a hablar del proyecto del curso, como si fuera Quintasio.

00:28:41 Esteban
Y voy a agregar otro tipo de usuario más, que sería como un administrador de cursos, donde esto es tema mío, no es pregunta. Voy a agregar otro tipo de usuario que se llama administrador de cursos, que va a ser un tipo de usuario que tiene permisos para asignar a diseñadores a cursos. Sería como un. Asistente del Super Admin, que es la clásica. Che, no podés crear usuarios, pero sí quiero tener a alguien que tenga permisos para decir: "Pepito va a trabajar en tal curso, Josecito puede hacer QA en tal curso" o "Juancito puede ver tal curso".

00:29:18 Esteban
Otro usuario que viene.

00:29:19 Vanesa
En mi analogía de Google Drive, el Super Admin es el dueño del Drive que crea todas las carpetas y todo. Este que estás nombrando es el que se le da permiso a una carpeta. en esa carpeta puede crear todos los trayectos. Por ejemplo, la carpeta puede ser onboarding, tal sector de la empresa. Y ahí en toda esa carpeta arma todos los documentos, que cada documento sería un proyecto, un curso. Entonces dice "Ah, bueno, en este documento va a trabajar fulano o mengano, en este curso va a trabajar fulano". Es esa persona que sólo mira su carpetita.

00:29:49 Esteban
Ahí lo que podemos hacer, dentro de la administración de usuarios, es darle permisos al usuario que nosotros querramos, a que sea dueño de una carpeta, no un tipo de, usuario, sino vos sos administradora de cursos, te hago dueña de una carpeta. Sí, ahí se me mezcla con.

00:30:09 Vanesa
La carpeta contiene proyectos, cada proyecto es.

00:30:12 Esteban
¿Y quién creó el proyecto.

00:30:15 Vanesa
¿Quién creó el administrador de la carpeta.

00:30:19 Esteban
Claro, pero el curso se crea con AI, por los diseñadores instruccionales, la carpeta.

00:30:23 Vanesa
Entonces es el diseñador. Pero en algún lado, cuando uno hace el caminito que ya está armado de AI, ese caminito tiene que estar anidado en un árbol, vamos a decirlo.

00:30:35 Esteban
Claro, organización, carpeta o carpetas.

00:30:39 Vanesa
Y dentro de cada carpeta, proyecto, que es un curso. Como si fuera Adobe, proyecto.

00:30:44 Esteban
Vamos a llamarlo a proyecto.

00:30:46 Vanesa
Cuando se renderiza, se manda al LMS. Claro. Pero yo, Vanessa, a mí me dijeron "bueno, vamos a hacer un curso de Scrum". Ok, listo, empiezo todo. Ahora, ¿en qué se anida dentro del árbol? Y ahí alguien me tuvo que decir: "Bueno, Vanessa puede crear los cursos de Scrum van a estar acá, en este arbolito". Y yo, Vanessa, sólo puedo trabajar en el curso de Scrum. Capaz que puedo trabajar en otros, pero estoy como enfocada en esto.

00:31:20 Vanesa
Bueno, avanzamos con LMS, que era lo que nos juntamos a hablar.

00:31:23 Esteban
Vamos a hablar usuarios del LMS.

00:31:26 Vanesa
Ahora vamos al LMS, perfecto.

00:31:27 Esteban
Usuarios del LMS. Tenemos: "Yo soy el diseñador instruccional o soy el super admin, entonces yo a mi curso".

00:31:36 Vanesa
¿Cuál sos? ¿Sos uno o soy el otro.

00:31:38 Esteban
Soy el super admin.

00:31:39 Vanesa
Super admin es el primero.

00:31:41 Esteban
Puedo hacer todo, puedo crear cursos, carpetas, dar acceso, todo. Entonces yo tengo un curso creado, ya está creado el curso, listo. Quiero que los estudiantes, O los empleados accedan. Entonces empiezo a invitar gente y darle acceso como estudiante, que es otro tipo de usuario. Que es uno nuevo.

00:32:01 Vanesa
Claro, que solo existe en el LMS porque no accede.

00:32:04 Esteban
Existe en todo el sistema, se le da, pero va a tener acceso solo al.

00:32:07 Vanesa
LMS y solo va a tener.

00:32:09 Esteban
Acceso al LMS que el admin o el que tenga permisos le da. O sea, tengo que decir este usuario puede acceder a este curso.

00:32:17 Vanesa
Una cosa ahí para tener en cuenta, normalmente en los LMs vos tenés los cursos donde te matriculan, que es lo que vos llamas invitación, pero por el nombre adecuado sería "sos matriculado" y también tienes cursos de automatriculación, cursos que están disponibles y vos sólo decís "quiero entrar a este curso" y te anotas como estudiante y entras, que sería por ejemplo el curso que aparece inicial de cómo usar esta plataforma Hasta ahí me seguís.

00:32:48 Vanesa
Entonces hablemos siempre, no de invitación, sino de cómo es la matriculación a un curso, como se dice este estudiante que está asignado a este curso, que puede ser porque alguien te matricula, o bien porque vos te auto matriculas. En los procesos de Onboarding, normalmente vos entras a una empresa como empleado, y tenés disponibles todos los iniciales de compliance, de cómo trabajar acá, no sé qué, y vos entras en, No hay un botón donde dice auto matricularse, pero vos entrás y ya te estás auto matriculando sin que vos lo veas visualmente.

00:33:19 Esteban
No está bien, eso es porque yo entiendo que a vos el súper admin te agregó como usuario en la plataforma y te dijo y te designó un camino o una lista de cursos.

00:33:27 Vanesa
Bueno, ahí hay 2 posibilidades. Una es que la plataforma del LMS de la empresa tenga los 5 cursos para cualquier persona que entra a la empresa disponibles en el dashboard y la gente entra y lo hace. Esa es una opción que puede existir. Y después hay aprendizajes puntuales según el rol. Y ahí sí, te tienen que matricular. O puede ser que la empresa sea un poquito más grande, como es Accenture, y cualquier persona que entra a la empresa se le asigna un paquete de cursos que se llama Onboarding.

00:33:57 Vanesa
Todo depende del tamaño de la empresa.

00:33:59 Esteban
Espera, entonces estoy encontrando como una categoría nueva en cursos que podría ser. ¿Cómo le podemos decir? ¿Camino, recorrido.

00:34:05 Vanesa
Se llama Path, Learning Path o Learning Plan. Es el camino de aprendizaje. Learning Plan sería lo más fácil de entender.

00:34:15 Esteban
Vamos a crear una categoría nueva para los cursos que se llama Learning Plan, que es básicamente una agrupación de cursos. Tiene que tener un nombre, un ID y lo que queremos es que tiene que tener.

00:34:26 Vanesa
¿Y qué? Tiene que tener un destinatario.

00:34:29 Esteban
Claro, primero se creamos toda la categoría Learning Plan y después el super admin o el administrador de cursos. Va a elegir a un usuario o a muchos usuarios, necesitamos una interfaz para eso, y les va a asignar este learning plan. Puede ser uno o muchos learning planes. ¿Tiene que haber un orden, tiene que activarse uno después que el otro o algo así.

00:34:51 Vanesa
Bueno, eso también depende. Eso lo suelen elaborar. No los diseñadores instruccionales, sino los que están arriba de los diseñadores instruccionales, más vinculados a la empresa, que dicen: "Bueno, entró una persona de recursos humanos". Esa persona de Recursos Humanos tiene que hacer el Learning Plan de Onboarding a la empresa, que es general para cualquier rol. Y además tiene que hacer otro Learning Plan que es Onboarding al Departamento de Recursos Humanos. Suponte que después haya otro Learning Plan que sea Onboarding para el uso de Jira.

00:35:19 Esteban
Suponete que entra a Recursos Humanos. Le habilito Onboarding de Compliance y Onboarding de Recursos Humanos. ¿Crees que haga uno primero que el otro.

00:35:27 Vanesa
Eso tiene que ser customizable por cada empresa.

00:35:30 Esteban
O sea, hasta cuando termines Conpliance, ¿no se te activa el otro.

00:35:33 Vanesa
Tiene que ser customizable.

00:35:35 Esteban
Sí, entonces la respuesta es sí, después el no siempre está, pero sí, la respuesta es sí y no, puede ser. La respuesta es sí, después opcional. La respuesta es sí, tenemos que construirla. Tenemos que construir el mecanismo para permitir eso. Los learning plan, pueden estar anidados o correlativos. En algún lugar tenemos que configurar learning plans con, relativo. Tengo que darle la posibilidad al super admin o vamos a crear un nuevo grupo de usuarios que se llama Learning Plan Admin.

00:36:11 Esteban
Y esa es una persona que va a agarrar cursos y meternos adentro de un learning plan. Crear un learning plan. Estoy pensando, es como que hay learning plans anidados. Tenemos recursos humanos y adentro tenés compliance, learning plans que, Recursos Humanos. Learning plan, compliance, learning plan, recursos humanos, buenas prácticas. Perfecto.

00:36:38 Vanesa
Casi siempre hay uno que le excede a cualquier área, que es el propio de la empresa.

00:36:42 Esteban
Entonces vamos a tener learning plan, padres e hijos. Van a ser como un árbol y queremos que haya correlatividad. Hasta que el usuario no termina y aprueba un learning plan, no se le activa el otro.

00:36:55 Vanesa
Que sea posible la correlatividad.

00:36:57 Esteban
No lo puede ver. También podemos desactivar esa correlatividad. Pero creemos las tablas y las tablas.

00:37:02 Vanesa
Una cosa para que sepas. Un Learning Plan, vamos a imaginar este curso ejemplo de Scrum. El curso Scrum puede aparecer en el Learning Plan para consultores.

00:37:13 Esteban
Pero quedó claro la idea.

00:37:15 Vanesa
No, no hace falta ejemplo, pero no es un ejemplo. Es una condición. Un curso puede aparecer en más de un Learning Plan. ¿Querés que tenga un ejemplo.

00:37:26 Esteban
Sí, por supuesto. Claro, un learning plan puede tener uno o muchos cursos y se pueden repetir en diferentes learning planes, no hay problema con eso.

00:37:37 Vanesa
Claro, porque son combinaciones posibles. Lo que tiene que tener claro un learning plan es esto: primero, ¿para quién es el destinatario? O sea, ¿por qué estoy juntando estos cursos? ¿en qué persona estoy pensando? ¿en qué estudiante estoy pensando? O sea, destinatario tiene que tener clarísimo. Después tiene que haber claridad sobre si hay correlatividad interna dentro del learning plan, no sólo con otros. Yo quiero que haga el curso 1234 y 5 en orden o es indistinto. Puede empezar por cualquiera. Por ejemplo, los de a veces los de compliance son sueltos.

00:38:08 Vanesa
Sin embargo, si yo le tengo que enseñar algo como un método que se implementa, tengo que enseñar primero tenés que hacer este que te da la introducción, después tenés que hacer este que te explica la fase uno. Bueno, eso también tiene que permitirse que uno pueda configurar la correlatividad. dentro de cada learning plan. Y el learning plan tiene que tener, para el estudiante, cuando lo mira, tiene que tener identidad visual. Esto es re importante. Yo tengo que saber que estoy en el learning plan de onboarding y que ahora me fui, ahora estoy en el learning plan de onboarding recursos humanos.

00:38:39 Vanesa
Tiene que haber una identidad visual, tiene que tener un banner, tiene que, Tiene que haber algo visual.

00:38:44 Esteban
Agreguemos imagen para los learning plans, agreguemos descripción, título.

00:38:49 Vanesa
Tiempo estimado de resolución. Cada curso se le asigna un tiempo estimado. Este curso dura dos horas. Yo en un learning plan puse dos cursos. Bueno, este learning plan tiene una duración estimada.

00:38:59 Esteban
Tiempo estimado, agregalo como texto.

00:39:03 Vanesa
Normalmente el texto tiene que ser la descripción del conjunto de esos, la descripción de qué se espera.

00:39:10 Esteban
Después lo que pone está bien eso. Lo importante son los campos. Dijimos, obviamente un código, un nombre. Obviamente los learning plan pertenecen a una organización. Las organizaciones tienen que ser obligatorias para todos los usuarios que se registren como creadores de cursos. Va a ser nuestro nodo padre para todo lo demás. Todo está dentro de una organización. Aunque lo cree un freelance, tiene que crear una organización.

00:39:45 Esteban
Cuando un usuario tiene, se le asignan varios learning planes y se mete en su dashboard de empleado de estudiante en el LMS. Quiero que les muestres todos los learning plans que tienes en el orden que pusimos correlativo, si es que está marcado como correlativo, pero los que no puede hacer que estén desactivados o disabled en gris, pero que el usuario pueda ver que le queda todo ese camino.

00:40:15 Esteban
No oculten los cursos de los learning plans que todavía no puede hacer porque están bloqueados porque no terminó el correlativo correspondiente.

00:40:28 Vanesa
Después hay todos otros sistemas, si querés centrarnos en eso o te mando el documento que yo armé para VWA, como quieras, que tiene que ver con insignias y cierta gamificación y asignarle badges, medallas al terminar un curso al interior de un learning plan, al terminar un learning plan, que en el dashboard que ve la persona haya una sección que diga tus logros. Terminaste el learning plan onboard, entonces tenés una medallita que tiene un símbolo asociado. Terminaste, sos consultor junior porque hiciste el learning plan, consultoría inicial.

00:40:59 Esteban
Ok, para los Learning Plan agreguemos otro campo que sea "batch", "ganado" y que tengan lo que dijo Vanessa, como "bueno, ahora sos Junior Compliance", "Expert Compliance", cosas así, a llenar.

00:41:16 Vanesa
Al terminar este curso obtendrás la medalla tal.

00:41:19 Esteban
Y también agregar una imagen para que se pueda subir ese batch como imagen.

00:41:25 Vanesa
Después hay otras insignias al interior. Por ejemplo, si terminás este curso en el tiempo asignado, ganaste la medalla a mayor rapidez. Estoy diciendo un ejemplo malo, pero puede haber otras que sean transversales, que no están asignadas a un learning plan, sino a generales. ¿Completaste en una semana, lograste siete cursos? Bueno, tenés la medalla a.

00:41:48 Esteban
Ok, buen punto. Déjame desarrollar eso para que sea más programable. Entonces, un curso tiene un tiempo estimado de duración. Eso es desde que el usuario empieza el curso. Porque una vez que se empieza el curso hay que terminarlo. No se puede dejar a la mitad. Se puede dejar a la mitad, pero estaría tardando. Estás demorando la resolución del curso? ¿Cómo cuento el tiempo en el que estuviste haciendo el curso? Cuando tenés abierta la interfaz o si vos lo cerraste hoy y lo abriste mañana, cuento todo el.

00:42:16 Vanesa
Tiempo en el mes.

00:42:17 Esteban
Entonces el tiempo del curso se cuenta cómo, Cuando la interfaz del curso está abierta en el LMS, lo mismo para el learning plan. Entonces crea una columna para los learning plan y para los cursos que sea tiempo estimado, pero que sea tipo hora, hora y minuto o lo que sea para poder medirlo. Elimina el campo que decía descripción del tiempo, tiempo estimado como texto.

00:42:48 Esteban
Eso no va más. Entonces si el tipo lo termina a tiempo, ¿qué pasa.

00:42:56 Vanesa
Bueno, si lo hace en el tiempo que estaba estimado, puede ganar una insignia de "cumpliste el estudiante más eficaz", no se me ocurre ahora cómo pensarlo, habría que pensar opciones. Obviamente si no cumple, no hay ninguna insignia. Otras insignias podrían ser respecto a las respuestas de los cuestionarios. Imaginate que en un curso cada "knowledge check" de cada unidad, vos la terminás 10 sobre 10. 10 sobre 10, 10 sobre 10, 10 sobre 10. El score final tuyo va a ser 100% o sea, hiciste todo perfecto.

00:43:28 Vanesa
Deberías ganar una insignia por. sos un genio en ese tema. Podría ser, si el resultado es mayor a 90% de respuestas correctas, te llevás una insignia que puede estar asignada al curso o al learning plan.

00:43:42 Esteban
Bueno, vamos a sistematizarlo porque es más complejo esto.

00:43:45 Vanesa
Yo lo tengo todo en un documento, después te lo mando.

00:43:49 Esteban
¿Lo tenés escrito al detalle en el documento? Lo más detallado que me sale. Estoy pensando, decime si está bien, es lo que dice el documento. Entonces, en total, enuméralos nada más. ¿Cuántos batch podés tener en un curso? Bueno, entonces está bien. Es uno por terminar el tiempo y otro por la calificación de los resultados. ¿Hay más.

00:44:16 Vanesa
No, eso es asociado a un curso. Ahora, asociado al learning plan podría haber uno. Por ejemplo, si el learning plan es consultoría inicial, tu insignia es consultor junior, que se yo.

00:44:29 Esteban
Está bien, uno por terminarlo, uno por terminarlo en menos tiempo del indicado y otro por el resultado. A mí se me ocurre otro que podría ser, no sé si te interesa o no, que es como un ranking. Lo terminaste primero en toda tu organización.

00:44:42 Vanesa
Eso se llama. Label, Label tiene un nombre, eso que es como el ranking interno y ahí se pueden cruzar muchísimas variables. Eso se puede, sí, yo digo que sí, la única cosa sí se suma, la única cosa es no quiere decir que esto es absolutamente para todos los cursos, para todos los.

00:44:58 Esteban
No, esto es todo. Definamos la estructura, sí, entiendo, entiendo super general y después que el usuario lo desactiva, porque si no activa todo eso, por supuesto. Hace esto a nivel estructura de las tablas. Queremos muchas batch por curso y una o muchas, o sea, cero una o muchas batch por learning plan, que van a ser configurables, pero básicamente tenemos cuatro: por terminar el curso, por terminarlo en un tiempo, en un tiempo menor al establecido por el curso, al tiempo recomendado, no me acuerdo como era el campo.

00:45:39 Esteban
Otro por el resultado en base al knowledge check, vamos a dejarlo configurable abierto para que el usuario pueda decir si el resultado fue respuestas correctas, siempre hablamos, respuestas correctas son incorrectas, mayor al 80%, digamos eso por defecto, después lo cambiamos, se le da ese batch. Y el otro es si dentro de tu organización vos fuiste el que lo terminaste más rápido aprobándolo, obviamente. Tenés otro batch y otro por, si sos el que lo terminó en tu organización, con el resultado más alto.

00:46:16 Esteban
Son 5 como por defecto, pero que sea ampliable a muchos.

00:46:20 Vanesa
Quiero modificar el 2, que lo terminas más rápido, porque me acerqué a una cosa. Ese no debería, cuando yo me refiero al tiempo asignado, está el tiempo que se espera que se resuelva un curso. Y después está el tiempo que se le da al empleado/estudiante, a que tiene tiempo de completarlo. Normalmente suele ser así. El onboarding te dicen tenés dos semanas para completar todos los cursos del onboarding, desde que entraste hasta que se cumplan las dos semanas. No la rapidez que lo hizo, porque a veces insistir con que lo hagan rápido quiere decir que no lo van a prestar atención y eso juega en contra en el aprendizaje.

00:46:54 Vanesa
Entonces ahí yo lo que me imagino es, desde el momento en que se te asignó el learning plan de onboarding, contás con dos semanas, para resolverlo. Sigue abierto después, no es que se cierra. Si vos en dos semanas o antes lograste terminar todos los cursos asignados, tienes una medalla. Pero si el curso está estimado que dure 2 horas, no es que si yo lo hago en una hora 50 me gano, porque si no estoy incentivando que no lo lean en profundidad, que no miren los gráficos. Entonces no quiero asociarlo, eso es.

00:47:25 Vanesa
Si el administrador de cursos te asignó este learning plan, Y te pide que en no más de un mes vos lo tengas resuelto, si vos lo resolvés en un mes o antes, te ganas una medalla.

00:47:36 Esteban
La idea es que la gente se. Pero el tema de fechas es otra cosa.

00:47:40 Vanesa
No es lo mismo del tiempo. Ahí es cuando yo hacía tiempo estimado, no me refería a resolución del curso, sino al tiempo que se supone que vos tenés para hacerlo, que te brinda la empresa. Te dice "che, estos cursos tratas de hacerlo esta semana".

00:47:52 Esteban
Eso es a nivel learning plan.

00:47:54 Vanesa
Learning plan, sí.

00:47:55 Esteban
Y a nivel curso podría ser también.

00:47:56 Vanesa
Podría pasar que la empresa saque un curso suelto, que dicen "esto es obligatorio para todo el mundo, esta semana todos tienen que tenerlo suelto". Desde el momento en que te matriculan en el curso, empieza a contar una semana de tiempo.

00:48:09 Esteban
Bien, entonces el tiempo estimado de los learning plan y los cursos deben ser días y tenemos que registrar la primera vez que el estudiante abre el curso.

00:48:22 Vanesa
No, desde el momento en que se lo matricula. Porque si a mí me manipulan hoy.

00:48:26 Esteban
En el momento que se le manda la invitación, que le vamos a decir matriculación.

00:48:30 Vanesa
Se llama matriculación.

00:48:31 Esteban
Es cuando empieza a contar ese tiempo. Entonces tenemos que registrar un timestamp del usuario cuando le es enviada la invitación. Eso es por usuario.

00:48:41 Vanesa
Y el administrador de cursos.

00:48:43 Esteban
Perdón, por usuario, por learning plan. Necesitamos una tabla también para graficar eso.

00:48:47 Vanesa
El administrador de cursos es quien tiene que definir, personas van a hacer un learning plan y el tiempo asignado. Que puede ser ningún tiempo asignado. El learning plan queda a disposición del empleado. O al contrario. Bueno, voy a asignar a este grupo de personas y les voy a dar un mes para que lo hagan. Que no significa que el curso pasado el mes se cierra, sino que sigue vigente. Yo incentivo a que la gente lo complete en el primer mes de asignación. Y debería estar la opción de que la persona, cuando yo soy empleada y se me está asignando un learning plan, debería recibir un mail al.

00:49:20 Vanesa
alguna notificación dentro de la plataforma, algo que me diga: "se te ha asignado un nuevo Learning Plan, contás con una semana para hacerlo". Eso yo, como estudiante, debería estar notificada de eso.

00:49:33 Esteban
Bien, una vez que empiezo a hacer el curso, ¿qué métricas queremos registrar.

00:49:39 Vanesa
Hay dos tipos de métricas para mí, las que ve el estudiante y las que ve el diseñador instruccional. Todos los roles de la empresa, vamos a decir que ahí pueden ser el líder.

00:49:49 Esteban
Primero, numerame todas las métricas en forma de numerada. Voy a pensar en esta que es la más grande. Sin detalles.

00:49:56 Vanesa
¿Cuánto tiempo tarda por unidad desde que abre la unidad? hasta que la termine, hasta que termine el no le check. Cuánto tiempo le llevó resolver toda la unidad. Después, cuánto le llevó resolver todo el curso. Desde el momento que lo abrió e hizo las preguntas iniciales hasta la última pregunta que hizo.

00:50:16 Esteban
Sin contar los tiempos en el que cerró la aplicación.

00:50:20 Vanesa
Claro, no contaría esos tiempos, claro. Otra métrica que yo quiero saber es, esto ya es en recursos, por ejemplo, Si hay un descargable en la unidad, por ejemplo, descargate.

00:50:32 Esteban
Esta no es ejemplo, si hay un descargable.

00:50:34 Vanesa
Sería un descargable si la persona lo descargó.

00:50:36 Esteban
Ok.

00:50:37 Vanesa
Si hay un video de tiempo de visualización. ¿Cuánto vio del video.

00:50:47 Esteban
Clicks en botones, en actividades.

00:50:49 Vanesa
Sí, todo lo que sea, como es la temperatura, eso, las zonas calientes, ¿no? O sea, donde hace clic también sería importante, poder dar la usabilidad, o sea que eso sí. Ahí yo no sé mucho detalle cómo es, pero es una información. Sí, tal cual.

00:51:05 Esteban
¿Escroleo si vio todo el curso, si bajó, si subió, todo eso? ¿O es mucho.

00:51:12 Vanesa
No hacen falta métricas ahí, porque para que pueda pasar de un momento a otro debería haber un botón que sólo existe si lo hizo. O sea, si escroleó, sólo se habilita el botón.

00:51:21 Esteban
¿Querés saber cuántas veces el tipo abrió y cerró el curso? ¿Cuántas veces entró en el curso? Cada vez que entra al curso lo registramos, el tipo lo abrió, lo miró una carilla, cerró.

00:51:33 Vanesa
Eso sirve para ver en qué momento del día, por ejemplo, lo hace.

00:51:37 Esteban
Tenemos un problema grande acá. El usuario abre el curso y lo deja ahí, deja el tabla abierto y se va. Tenemos que contarlo como que se está cerrando el curso. Lo que se puede hacer es poner un timer que pase 1 minuto y le diga: "Che, seguís ahí" y deje de contar el tiempo.

00:51:53 Vanesa
Bueno, tal cual.

00:51:54 Esteban
¿Seguís ahí.

00:51:56 Vanesa
Sí, sí, porque es verdad, lo dejas en otra pantalla.

00:51:59 Esteban
Hagamos como hace Google Meet, que tiene como un chequeo de si estás vivo, digamos, no sé cómo llamarlo, que es abre una ventana y dice "estás ahí" y ahí deja de contar los tiempos.

00:52:09 Vanesa
Hay otra cosa que no sé si tiene algo métricas, pero que ayuda, que es que si yo estoy en el curso reproduciendo un video y me quiero ir a otra pestaña o me quiero ir a otro navegador, El video deja de reproducirse. Entiende que dejaste de estar en el curso. No sé cómo afecta a la métrica, pero la única forma de que yo pueda ver el curso es si solo tengo esa ventana abierta y solo estoy mirando eso.

00:52:32 Esteban
Sí, eso lo podemos bloquear. Cambia de tabs y fren el video.

00:52:35 Vanesa
Eso, deja de contar como que estás en el curso. Bueno, eso es métrica de lo que estoy haciendo. Después hay un montón de métricas.

00:52:43 Esteban
Queremos medir cuando el usuario, suponte que está contestando un "nolish check" y deja el foco de la ventana. Sabemos que está en otra ventana. ¿Queremos contar eso.

00:52:53 Vanesa
Sí, podemos contarlo y pensar si está usando otra ayuda.

00:52:58 Esteban
Bien, entonces queremos saber cuándo pierde el foco la ventana porque se fue a otra ventana. Queremos medir eso en el navegador y contarlo todas las veces que sea necesario.

00:53:06 Vanesa
Bueno, después hay otras métricas que son súper interesantes del estilo. Cómo le fue en cada una de las preguntas que se le hizo. Entonces, todas las métricas de resultados de las preguntas tienen que estar.

00:53:17 Esteban
Claro, hay que guardar todos los resultados de las preguntas.

00:53:19 Vanesa
Lo mismo, si es primer intento, segundo intento, si se le habilitó cada tres veces, tiene tres intentos para hacer un knowledge check. Bueno, las métricas de primero son un data set.

00:53:28 Esteban
Entonces, necesitamos una tabla que guarde los intentos de curso. Vamos a decirle intentos de curso. Significa la instancia en la que un usuario específico está en, ejecutando o viendo o haciendo un curso específico. ¿Cómo se miden las instancias? Cuando el usuario se lo invita a un curso, abre el curso.

00:54:02 Esteban
Ahí empieza una instancia. El usuario pasa el tiempo recomendado, termina la instancia o lo dejamos infinitamente que vea que puede hacer el curso.

00:54:13 Vanesa
Para entenderlo mejor eso es que el curso sigue abierto y disponible para consultar, siempre los cursos tienen que quedar disponibles para el usuario.

00:54:20 Esteban
Ah, lo puede hacer cuando él quiera.

00:54:21 Vanesa
Lo puede hacer idealmente en el tiempo en el que al administrador se lo asigna, le dice tenés un mes para hacerlo. Ahora, el curso tiene que quedar disponible en el LMS porque después el estudiante quiere volver a mirar algo que recuerda o por lo que fuera, incluso habiéndolo terminado.

00:54:37 Esteban
No, yo no hablo de terminado, hablo cuando está en proceso. ¿Nunca se lo bloqueamos ni cerramos. ¿Ni siquiera opcional.

00:54:44 Vanesa
Bueno, opcional sí, es bastante duro hacer eso. No es una buena práctica.

00:54:49 Esteban
¿Hay alguien que lo hace, que sepamos que lo hace.

00:54:51 Vanesa
No.

00:54:51 Esteban
Bien, entonces no hagamos nada de eso. Entonces, el usuario abre el curso, ahí empieza la instancia. Si el usuario llega al final del curso y le va mal o le va bien, terminó la instancia. Llega al final y haciéndole check.

00:55:08 Vanesa
¿Qué significa que le va bien.

00:55:09 Esteban
Si el usuario aprueba o no aprueba, terminó una instancia. Perfecto. Entonces, si el usuario aprueba, no vuelve a hacer una instancia de ese curso. Ya está, ya lo probó.

00:55:23 Vanesa
Claro, lo puede revisitar, puede volver a mirar los contenidos, pero no tiene que hacer los ejercicios otra vez.

00:55:28 Esteban
Los cursos en la interfaz de usuario siempre tienen que estar accesibles. Si yo terminé un curso, lo aprobé o desaprobé, lo que sea, siempre tengo que poder volver al curso y verlo. Quizás si aprobé, ya está bloqueado el null check.

00:55:38 Vanesa
No vuelvo a hacer los ejercicios.

00:55:39 Esteban
Perfecto, si yo ya aprobé, el knowledge check ya tiene que estar bloqueado, pero puedo revisitar mi curso y que contesté y todo eso. Si no lo aprobé, pero hice el knowledge check y no lo aprobé, termina la instancia y ahí un administrador o alguien me va a dar otra vez acceso al curso, hay que mandar una notificación a alguien.

00:55:56 Vanesa
Cuando se arma el knowledge check final se suele poner en la configuración cuántos intentos y cuánto tiempo le querés asignar a la persona. Por ejemplo, lo usual es que, en el knowledge check final haya solo 2 intentos con 20 minutos cada uno. Si es un banco de preguntas de 10 preguntas, eso es como un estándar. Si son 10 preguntas, tiene 20 minutos para resolverlo y tiene solamente 2 intentos. Si el primer intento lo resolvió mal, le dice "lo resolviste mal", volvé a hacerlo una vez más, vuelve otra vez al punto cero, resuelve.

00:56:27 Vanesa
Si le fue mal, bueno, no está aprobado el curso. Y ahí el administrador de curso tiene que decidir qué opción se le da. lo re matricula, porque necesitamos clickear ese dato. Hay un botón automático que aparece que dice "volvé a hacer el curso de cero, como si no lo hubieras hecho nunca, todo otra vez". Eso tiene que ser configurable.

00:56:45 Esteban
Entonces agreguemos en la configuración del curso. ¿Cómo se llama? ¿Reintento? ¿Cómo le decimos? Recursar. Las opciones son "no". La otra opción es un número, puede recursar una, dos, tres, diez veces, lo que sea, un número configurable. Y la otra opción es infinito? Ilimitado, esa es otra opción. El usuario puede recursar las veces que quiera.

00:57:13 Vanesa
En todos los casos que sea que lo hizo mal, debería llegarle una notificación, un aviso, una alerta al administrador porque es una buena meta.

00:57:25 Esteban
Necesitamos una tabla de notificaciones. para todos los usuarios y vamos a necesitar tipos de notificaciones. Una notificación, un tipo de notificación nueva, o la primera que vamos a usar es, que sería "Usuario probó". Usuario aprobó, usuario desaprobó. ¿Todos van a tener acceso a esas notificaciones o sólo algunos tipos de usuarios.

00:57:55 Vanesa
Por lo pronto, nunca el estudiante y el SuperAdmin, el administrador de cursos, no es algo que necesite saber el diseñador instruccional, el que crea el curso, pero si el que organiza el Learning Plan.

00:58:14 Esteban
Bien, hagamos eso y después definimos más cosas de notificaciones.

00:58:17 Vanesa
Otra que mencionamos antes de notificaciones es que cuando yo soy estudiante y me asignan un Learning Plan, me tengo que enterar, que se me asignó un Learning Plan, el tiempo que tengo, si es que está configurado con un tiempo, cuánto tiempo tengo para hacerlo. Es una notificación re importante.

00:58:32 Esteban
Cada vez que se manda un mail a un usuario con invitación o algo, también se carga en la tabla de notificaciones asignada a ese usuario y eso también tiene que ser visible en la interfaz como la típica campañita en el header de notificaciones. Aunque la primera obviamente del primer mail que llega al usuario con la invitación para matricularse, no es necesario que aparezca en la interfaz.

00:58:55 Vanesa
Otras métricas importantes. Sería bueno tener, relacionar cursos y duración estimada de resolución del curso y duración de elaboración del curso. Son independientes, pero yo tengo el curso Scrum. Yo quiero saber cuánto tiempo se desarrolló el curso, desde el momento en que el diseño instruccional lo empezó a hacer, hasta que se implementa en el LMS. cuánto tiempo de desarrollo insumió ese curso.

00:59:28 Vanesa
Después está la otra métrica vinculada a un curso que es cuánto tiempo se le asigna de resolución. El diseñador instruccional dice, bueno este curso se tiene que desarrollar en el lapso de dos horas. Se estima que el estudiante dedique dos horas para resolver el curso completo. Ahí normalmente lo que se hace es que el diseñador instruccional vuelve a hacer todo el curso y le duplica el tiempo que demoró. Si yo haciéndolo tarda una hora, estimo que un estudiante estará dos horas para hacerlo. Porque es una métrica importante y cruzado a eso hay que medir.

01:00:00 Vanesa
cuánto tiempo el estudiante, efectivamente, demoró en hacer el curso. Y ahí yo puedo contrastar si las estimaciones iniciales están acertadas o no. Y tener una idea, si lo están desarrollando en más tiempo del estimado, en menos. Si un learning plan tiene cursos correlativos, yo necesito saber si la gente se demora mucho, en un curso en particular que lo frena para avanzar.

01:00:33 Vanesa
Entonces yo debería también medir el tiempo que le destina una persona a desarrollar un "learning plan", que seguramente son días, no solo minutos, horas. Si un curso está asignado en 7 días y yo empiezo a hacerlo, y en el quinto día no pude avanzar y no veo avances, si esto está asociado a que estoy en un curso, es que ese curso es muy difícil, o que tiene algo que traba.

01:00:54 Esteban
Lo que venimos viendo es que hay 2 tiempos a medir. Uno es el tiempo efectivo desde que se abre la interfaz hasta que se termina el curso, siempre con la interfaz abierta, no cuando se cierra, para eso tenemos ese control que hablamos, sino que además un tiempo en días, que es un tiempo, el curso esté abierto o no. Y lo que dijo Vanessa, para medir esas cosas. Y esto tiene que estar dentro del dashboard de los learning plan y dentro del dashboard de los cursos. para el admin o el administrador de cursos, para el Super Admin o el administrador de cursos.

01:01:28 Vanesa
¿Qué métricas tiene que ver el estudiante de todas estas? Sólo cuáles son las métricas de su desarrollo. Entonces, ¿cuánto tiempo le llevó hacer un curso y un Learning Plan en cuestión? ¿Cuánto tiempo le llevó? También debería el estudiante poder ver qué notas se sacó, qué resultados tienen de sus cursos, con cuánto lo aprobó. ¿Qué otras métricas hace el estudiante? Siempre hay una métrica que es 5 de 7, o sea, cuánto le falta para llegar a completar un learning plan.

01:02:02 Vanesa
Eso lo tiene que ver porque lo visualiza en gris, lo que le falta o porque hay como una barra de progreso.

01:02:07 Esteban
Así, agregar una barra de progreso para los learning plan y para los cursos que muestra el progreso.

01:02:11 Vanesa
Eso siempre, claro.

01:02:19 Esteban
¿Cómo medimos el progreso en un curso.

01:02:22 Vanesa
De desarrollo, si son 10 unidades y están las 7 y son 70 por ciento.

01:02:28 Esteban
¿Cómo marcamos por los knowledge check que hizo en el medio? ¿Los ejercicios que hizo en el medio, mejor dicho.

01:02:33 Vanesa
Para mí el progreso es desde el momento en que arranca el curso con las preguntas hasta la última pregunta del knowledge check final. Ese es el 100 por ciento. Y depende de cuántas unidades tenga, se fracciona.

01:02:48 Esteban
Pero aparte que el curso es una sábana. Vos podés escrolear hasta el fondo, para arriba, para abajo. No sabemos dónde está. ¿Cómo sabemos dónde está? Por los ejercicios que va haciendo en el medio.

01:02:57 Vanesa
Yo no me imagino midiendo ese detalle. Yo me imagino que si estás en la unidad 1 hiciste el 10% del curso.

01:03:03 Esteban
No, pero ves todas las unidades juntas, no estás en una unidad, estás en todas juntas. No, porque es una página web.

01:03:08 Vanesa
Sí, pero vos no ves todas las unidades. Cada unidad cuando termina tiene que haber un botón. se activa.

01:03:14 Esteban
No, habíamos hablado de Saura. Habíamos hablado de Saura. ¿Eso lo cambiamos.

01:03:17 Vanesa
No, no, no lo cambiamos, gordo. Visualmente luce como una sábana.

01:03:21 Esteban
No, está bien, es otra cosa. No es una sábana. Yo entiendo, visualmente no es una sábana. Vamos a relatar esto entonces. Corregime si estoy mal. Empiezo con la unidad 1, llego al final, no puedo ver la unidad 2, ¿hasta que no haga qué.

01:03:39 Vanesa
Hasta que. Dos opciones. Si vos, diseñador del curso, seleccionaste que es sólo por scroleo, efectivamente cuando scroleaste hasta el final se te habilita un botón que dice "avanzar con la unidad 2". Apretás el botón y estás visualizando lo que sigue debajo. Eso es la más simple, por scroleo. El botón aparece cuando scroleas. La que se suele usar, la buena práctica, es que haya una pregunta, el cierre, un ejercicio antes de avanzar, que cuando vos lo resolvés, no importa si bien o mal, eso se configura, empezás a visualizar la página que sigue.

01:04:12 Esteban
¿Y por qué no con slides eso, en vez de una página corrida? ¿No es más cómodo? ¿O más ejeculado.

01:04:18 Vanesa
Es más fácil scrollear una página de medio sábana que movernos. Hay que emular. Nunca voy a mostrar.

01:04:28 Esteban
El curso todo junto.

01:04:30 Vanesa
Claro, el estudiante nunca lo va a ver todo junto, salvo que uno lo active y lo deje que sería una mala práctica, pero no imposible.

01:04:38 Esteban
El curso no se va a ver todo junto, se va a ver por unidad y al terminar el Knowledge Check, si lo aprueba, ve la siguiente unidad.

01:04:48 Vanesa
Depende de cómo esté configurado. Puede ser solo si lo resuelve, porque lo puede resolver. Equivocarse y lo habilita porque no es excluyente.

01:04:55 Esteban
Es excluyente el ejercicio. El Knowledge Check sí.

01:04:59 Vanesa
Es configurable eso también. Todo tendría que ser configurable. A veces conviene y a veces no.

01:05:05 Esteban
Entonces en estados de cursos tenemos iniciado, tenemos terminado, aprobado, desaprobado.

01:05:13 Vanesa
Sí. Y tendría que haber un cuarto que es en donde vos podés hacerlo y no resolver las actividades. Pero sí con "escroleo". Yo lo hago, veo un ejercicio, lo desestimo, pero sí cuando bajé ahí se me habilita el botón de "aprobado". que hago clic, avanzo que sigue. Porque me complica a mí pensar cómo me dice el inicio de un cierre de una unidad.

01:05:42 Esteban
Claro, por eso hacen dos slides.

01:05:44 Vanesa
Claro, para mí el formato tiene que ser sábana.

01:05:46 Esteban
Es que es lo mismo, técnicamente es lo mismo.

01:05:48 Vanesa
Bueno, Rice usa sábana.

01:05:49 Esteban
Es una forma de visualizar, ¿entendés.

01:05:51 Vanesa
Rice usa sábana, y a veces en el medio de una unidad, que es una sábana, te pone un ejercicio y te pone un botón, cuya condición dice: "Sólo se habilita este botón de continuar si el ejercicio se resuelve correctamente". Vos estás en la unidad 1.

01:06:06 Esteban
No, está bien. En el fondo sigue siendo un slice. Es una forma diferente de visualizarlo. Hasta la tenía más rebuscada. No me importa lo que es. No se habilita uno, si no está la otra, todo configurado.

01:06:16 Vanesa
Eso también no me interesa. A mí me interesa la experiencia del usuario. Y el usuario lo vive como una sábana. Y para mí eso es muy importante. No que lo viva como un PPT.

01:06:25 Esteban
Como un PPT. Está bien eso. Entonces el progreso del curso lo vamos a medir por eso que acabamos de decir. Todo esto es opcional, puede y tiene que ser configurable por el diseñador del curso. Tiene que poder decir, bueno, se avanza de unidad únicamente si aprobó, se avanza de unidad, no importa que se avanza de unidad, haya aprobado o no, se avanza de unidad, aunque no haya hecho nada, solo escroleando.

01:06:56 Esteban
Siempre con un botón para acceder a la próxima unidad.

01:06:58 Vanesa
Siempre tiene que haber una acción proactiva del estudiante que lo cambie de unidad.

01:07:02 Esteban
Siempre hay un botón al final de la unidad para pasar a la siguiente unidad para poder marcar este progreso que estamos hablando del curso.

01:07:07 Vanesa
Y que el estudiante tiene que proactivamente hacer clic para que se le habilite lo que sigue, porque es la forma también de que sea consciente de que pasó de una unidad a otra.

01:07:16 Esteban
Bien, hagamos eso.

01:07:21 Vanesa
Quiero volver a esto que creo que nos sirve con el inicio. La estructura de un curso, debiera ser, y esto es nuevo porque yo lo veo nuevo en Beway. Cualquier curso tiene que permitir la posibilidad de que comience con una serie de preguntas, que rastrean la confianza que tiene el estudiante sobre los temas que se van a trabajar. Después viene el curso propiamente dicho, que tiene unidades. Cada unidad suele terminar con un knowledge check de esa unidad, y cada unidad adentro puede tener ejercicios internos,

01:07:55 Vanesa
que pueden ser obligatorios de aprobar o no. Suelen ser ejercicios más de interacción, de hacer cosas. Y dije que cada unidad termina con un knowledge check, que suele dar feedback siempre. Y hacia el final, hay otra evaluación que tiene que preguntar lo mismo que se preguntó al inicio respecto a confianza, que mida y compare, y eso debería el estudiante poder al final tener sus datos. Decir, yo primero respondí que no sabía nada sobre esto, Respondió un 1 y ahora puso un 4.

01:08:26 Vanesa
Y podría haber un porcentaje que se le brinda al estudiante cuando terminó el curso de "con este curso aprendiste un 40% más de lo que sabías". Que haya un número bien medible que compare con esas cuestiones. Pero, esa evaluación final, no sólo tiene que incluir las 10 preguntas de "¿Cuánto sabés sobre tal tema ahora que hiciste el curso?", sino que además tiene que incluir un montón de otras preguntas de un banco más amplio sobre el contenido. Acá viene Bloom, de Taxonomía de Bloom.

01:08:58 Vanesa
Las preguntas que aparecen en la evaluación final, según la definición que tenga el diseñador instruccional, que el diseñador dice "quiero que este curso sea nivel 1 y 2 de Bloom", o "quiero que sean niveles 3 y 4, o 2, 3 y 4, 2 y 3", eso lo define. Ese banco de preguntas final tiene que responder a lo que el diseñador determinó como niveles esperables. Y tiene que ser un banco amplio y demás. O sea que el curso se aprueba cuando la persona respondió todas esas preguntas y completó la encuesta de cuánto sentís que sabes sobre el tema.

01:09:31 Vanesa
Entonces le va a dar al estudiante dos números: porcentaje de cuánto aprendiste, resultado, te sacaste un 8 de las preguntas que hiciste, te sacaste un 7, te sacaste un 10 sobre 10, te sacaste un 58 sobre 100. Esas serían los dos datos que debería tener. Y el último dato que debería tener es si se ganó alguna insignia al terminar el curso.

01:10:08 Esteban
Bien, LMS. ¿Algo más. LMS. O empezamos con esto y después seguimos.

01:10:15 Vanesa
Yo ahora te voy a pasar el documento que dice mucho mejor lo que yo tengo y te lo paso.

01:10:22 Esteban
Bien. Con todo lo que hablamos, crea un gráfico con Mermaid de componentes, necesito ver mapeado todas estas decisiones, este sistema que estamos hablando en cuanto a, Tipos de usuario, quién accede a que creo que a mí me gustaría ver como un diagrama de componentes, no algo fino, como un diagrama de flujos en Mermaid. Además, hace todo el frontend configurable para usar play rate y generar todos los test para probar todos estos workflow que hablamos.

01:10:53 Esteban
Quiero que poder correr play rate y que se ejecute como un super admin y haga cosas, se ejecute como un administrador de cursos y haga cosas. Traducí todos los nombres que hablamos en castellano al inglés. Como SuperAdmin está bien, administrador de cursos no, ponele otra cosa, project, admin o algo así. Lo mismo con los demás. Y generar unit test para todo el código backend y front-end para probar todo con sólo con unit test.

01:11:26 Esteban
Playback va a probar por usuario.

01:11:37 Vanesa
Es un montón. Sí, ahora el documento te voy a pasar que tiene más detalles.
</reunion>

<resumen_documento>
Desde el punto de vista de un desarrollador que está construyendo un LMS propio, más un generador de cursos y un portfolio para diseñadores instruccionales, este documento es básicamente una especificación funcional encubierta. No está hablando solo de Docebo, está describiendo qué capacidades debería tener un LMS bien diseñado.

Si lo leo como arquitecto de producto, veo estos ejes clave que tu sistema debería soportar nativamente.

Primero, motor de segmentación real, no solo roles técnicos.

El documento diferencia claramente entre:

Rol técnico en la plataforma, admin, instructor, estudiante.

Segmento organizacional o pedagógico, consultor BBVA, staff, líderes, etc.

Para tu LMS eso implica:

Modelo de usuario con campos dinámicos.

Motor de reglas condicionales.

Segmentación múltiple, no jerárquica.

Asignación automática de paths basada en reglas tipo:
si campo A = X y campo B = Y entonces asignar Learning Path Z.

Esto no puede resolverse solo con roles simples, necesitás:

Groups flexibles.

Campos personalizados.

Engine de enrollment dinámico.

Evaluaciones que disparen cambios de segmento.

Segundo, sistema de correlatividad lineal configurable.

El documento propone desbloqueos progresivos y condiciones mínimas de score.

Tu LMS debería permitir:

Secuencias obligatorias.

Unlock condicional.

Visualización clara de bloqueado, disponible y completado.

Control por curso completo, no solo por lección.

Importante: mantenerlo lineal y simple, no árbol académico complejo, pero sí permitir rutas alternativas.

Tercero, motor de evaluación con lógica de decisión.

Esto es el núcleo.

El modelo de 4 capas implica que tu sistema debe soportar:

Banco grande de preguntas.

Randomización.

Reutilización parcial de preguntas entre evaluaciones.

Feedback configurable por pregunta.

Múltiples intentos configurables.

Reglas de ruteo según score.

Evaluaciones que disparen enrollment automático en otra ruta.

En otras palabras, tu LMS necesita un pequeño rule engine interno.

Flujo mínimo que tu sistema debería soportar:

Usuario entra.
Rinde diagnóstico.
El sistema evalúa score.
Si score >= X → asigna ruta A.
Si score < X → asigna ruta B.
Todo con trazabilidad completa.

Esto convierte al LMS en un sistema adaptativo básico.

Cuarto, soporte para rutas diferenciadas sin perder trazabilidad.

El documento insiste en algo clave:
No saltear el curso sin registro.
Reemplazarlo por evidencia equivalente.

Eso implica que tu modelo debe poder registrar:

Curso diagnóstico completado.

Ruta asignada.

Evaluación final completada.

Badge otorgado.

Y que las rutas alternativas sean formalmente cursos o learning plans válidos.

Quinto, gamificación estructurada, no decorativa.

Tu sistema debería permitir:

Badges automáticos por evento.

Badges por completar path.

Badges por score alto.

Badges combinando condiciones.

Badges visibles en perfil.

Idealmente exportables o integrables con otras plataformas.

Y sobre todo:

Lógica condicional para otorgarlos.

Evitar badge inflation.

Sexto, diseño UX orientado a narrativa.

El documento remarca problemas de:

Textos poco motivadores.

Paths sin explicación de propósito.

Optativos sin eje.

Progreso poco claro.

Orden confuso de cursos.

Miniaturas inconsistentes.

Si estás construyendo un generador de cursos para diseñadores instruccionales, eso implica que tu sistema debería permitir:

Plantillas de descripción.

Campos estructurados para objetivos generales y específicos.

Campo explícito de propósito del path.

Campo de tiempo estimado.

Campo de prerequisitos.

Configuración de orden visual personalizado.

Sistema de assets visuales por categoría.

Séptimo, integración real con estándares de contenido.

Hay una mención importante sobre xAPI y carga completa del curso.

Eso implica que tu LMS debería:

Soportar SCORM y xAPI correctamente.

Detectar unidades internas.

Marcar progreso granular.

No tratar cada módulo como curso independiente si no corresponde.

Octavo, foros con trazabilidad y diseño de incentivo.

El documento plantea preguntas que revelan una carencia estructural:

Quién responde.

Notificaciones.

Trazabilidad.

Incentivos.

Para tu sistema eso significa:

Foros asociados a curso.

Notificaciones configurables.

Métricas de participación.

Posibilidad de ligar participación a badges o puntos.

Noveno, problema real que el documento intenta resolver.

El objetivo no es solo mejorar textos.
Es evitar que el LMS sea un sistema administrativo tipo click next.

Desde el punto de vista de producto, el sistema que estás construyendo debería permitir:

Adaptatividad básica.

Segmentación flexible.

Evaluación formativa.

Gamificación con sentido.

Narrativa pedagógica clara.

Trazabilidad total.

Automatización.

Si lo sintetizo como requerimientos para tu propio LMS + generador de cursos:

Tu sistema necesita:

Modelo de usuario extensible.

Engine de reglas condicionales.

Learning Paths con unlock dinámico.

Evaluaciones con banco reutilizable y randomización.

Rutas alternativas basadas en score.

Sistema robusto de badges.

Integración xAPI real.

Plantillas estructuradas para diseñadores instruccionales.

Reporting avanzado.

En resumen, el documento describe el paso de un LMS estático a un LMS adaptativo, segmentado y gamificado.

Si estás construyendo una plataforma propia para diseñadores instruccionales, este documento es básicamente un roadmap de features avanzadas que diferencian un LMS genérico de un LMS pedagógicamente inteligente.
</resumen_documento>