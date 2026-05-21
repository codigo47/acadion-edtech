

------------------------------------

Modifiaciones para el modal de add component en el editor:
- la ventana no debe cambiar de tamaño, hacela grande para que entren 20 componentes, debe ser mas ancha
- saca la categoria All Components
- la primera caregoria debe ser: Recientemente usados
- Al abrir la ventana hace foco en el text de search
- al apretar Escape que se cierre la ventana, agrega esto en todas las ventanas modal


---------------------------------


nueva feature: "Add component":
- en las paginas http://localhost:8000/project/87873ee9-2668-4007-9d94-69127358eeb3, cuando se clickee en  "+ Add component" se tiene que abrir esta nueva ventana modal para agregar componentes.
- Debe aparecer una lista de componentes con un buscador por nombre, la lista deben ser cuadrados como estamos haciendo en /dashboard para mostrar los cursos.
- Debe haber un menu a la izquierda con los grupos o categorias, si el usuario selecciona una categoria, solo mostrar esos componentes.
- Cada componente va a tener una imagen de preview, por ahora no tengo la imagen, usa placeholders
- Cuando el usuario elija el componente haciendo click en Add, un boton en el footer de esta nueva ventana modal, debe cerrarse la ventana, y el componente debe haber sido agregado abajo del boton que se uso para agregarlo, debe volver a aparecer un boton "+ Add component"arriba y abajo de este nuevo componente, como siempre.
- el nuevo componente debe guardarse en la tabla correspondiente. Crea los endpoints necesarios para esto en el proyecto back.


----

- El ImageCropModal debe ser del mismo estilo que "Select Image" modal, ventana blanca, botones del color principal, no full screen
- no agregaste la funcion de CROP que te pedi, no puedo modificar el tamaño de la seleccion para nada y el crop debe dejarme cambiar el tamaño de la seleccion

g
------------------

- El menu paleta de colores, dentro del componente table para una celda, queda con mal z index, aumentalo para que se vea completo.
- En Subheading Editable, oculta el icono de tamaño de texto, no se usa en este componente. Hace lo mismo para componentes que no usen el tamaño.
- En table, en edicion de celda, quiero cambiar, tamaño de tipografia tambien y alineacion del texto, vertical y horizontal.
- En Table Editable, el menu contextual del estilo de edicion de la celda, aparece adentro del componente, debe ser flotante, no debe cambiar el alto del componente al aparecer.
- En Table Editable: el boton style esta mal alineado, los botones no deben tener texto, el texto debe ser un tooltip, deja solo el icono, agrega este informacion para todos los componentes en el CLAUDE.md
- El componente Crop Image, tiene un estilo muy diferente al resto del editor (windows popup, tan grande como sea necesaria, los botones del estilo del editor, todos los botones juntos, Use as is esta arriba, el esto abajo, prefiero todos abajo.), el zindex en principio debe ser mas grande porque ciertos botones del editor siguen quedando por arriba.
- El componente Crop Image no cropea imagenes, la cuadricula puede moverse pero no resizing, agregalo. La imagen resultante por ahora guardala en memoria nada mas.
- En Scenario Editable: la burbuja debe poder moverse haciendo drag and drop
- En Scenario Editable: tambien debe poder cambiarse la direccion de la flecha de la burbuja, top, bottom, left side, right side y la alineacion cuando es top o bottom (left, right middle). Blur debe estar en el footer del estilo del comp.
En Scenario Editable: BG debe ser un boton que aparece sobre la imagen igual que pasa en los componentes IMAGE Editable.
- En Scenario Editable: La burbuja debe tener su serie de estilos propios, background color, tipografia, alineacion del texto, tamaño. Agregalos tambien en el footer. Cuando cambio la alineacion, las respuestas no deben cambiar de alineacion, esas dejalas siempre a la izquierda.
- Cambia la logica de los colores favoritos del menu de paleta de colores: Los favoritos deben ser los colores que actualmente se estan usando en el proyecto en todos los componentes, en letras y fondos, esos colores deben aparecer en favoritos, si un color no esta siendo usando en el proyecto entero entonces removelo de favoritos.


-------------------------------


Si un componente editable no se le puede cambiar el tamaño de la fuente, porque esa feature no esta implementada, entonces oculta el iconito para cambiar el tamaño de la fuente.
En Table Editable, el estilo de la columna donde esta el icono para borrar la fila no debe tener el estilo de la tabla, debe ser sin borde, sin background color, sin bordes, eso es parte de la interfaz de usuario no de la tabla misma. Saca "+ Column" y "Last column" esas funcionalidades deben estar en la misma tabla, El boton e icono "Style" deben estar en el footer de estilo, on dentro del contenido del compoenten. Agrega esa regla a CLAUDE.md: todo lo referente a estilo va en el footer del componente editable. Si el componente no reaccion a una propiedad de estilo, no mostrar esafuncionalidad en el footer.
Sigo con Table: despues de aplicar un estilo preset, quiero igualmente poder modificar a mano el estilo y sobreescribir lo que muestra el preset. Ademas quiero cambiar individualmente el estilo de 1 celda, busca con el plugin frontend-designer como comunicar que se esta trabajando sobre una celda al usuario.
Despues de elegir un color, oculta el menu de paleta de colores.
No quiero tener que hacer click en la estrella de la paleta de colores para guardarlo como favorito, quiero que se guarde automaticamente todo color que yo elija de los colores predefinidos o ingrese custom con HEX.
Modifia el menu de paleta de colores para que muestre tambien el clasico "arcoiris" de colores para que yo pueda elegir un color visualmente tambien.
En el menu Course Structure quiero poder hacer drag and drop de los componentes para cambiarlos de orden. Hace un drag and drop con el clasico fantasma del elemento que estoy moviendo que se vea claramente donde se va a soltar el componente si suelto el click del mouse, puede ser una linea indicativa.

----------------------------

en la pagina /project/{COURSE_KEY} del proyecto web los componentes editables tienen una barra de formato en el footer de cada componente. Para la eleccion de colores quiero que uses un componente de eleccion de colores mas completo, como las color pickers de office, notion, etc. Las funcionalidades que quiero son, poder pegar un HEX o RGB, que cada color custom que elijo se guarde como favorito y aparezca automaticamente en el resto de las paletas de colores de los otros componentes y que sea facil elegirlo, como estan ahora los pocos colores que hay fijos, ademas quiero ver colores basicos como siempre y una seccion de "project colors" que son los que se toman de la primera pantalla para generar el curso.
Intenta reutilizar este componente de colores por supuesto y agrega este instruccion de reutilizacion el CLAUDE.md general del back y web.
El tamaño de la tipografia debe ser un estilo a elegir, ahora veo un icono pero no funciona, asegurate que funcione en todos los componentes.
Para el componente editable "table" quiero unos 10 presets de estilos para headers, filas impares pares, backgrounds colors, tamaño de letra por celda, bordes, crea una popup window para setear los estilos de "table" con un previsualizador para que el usuario vea como va a quedar su diseño de colores etc.
Subheading es un componente que podria convertirse en Heading
Cuando cambio paragraph a "Paragraph + heading" no puedo volver a desplegar el menu para elegir otro tipo decomponente, eso pasa con varios componentes y ademas cambio de opcion y luego no aparecen las mismas, busca ese error y arreglalo.
En Separator move las opciones de estilo al footer, ahora mismo estan adentro del "area del componente" que se va a previsualizar en "modo preview"
El componente EditableQuote no se ve igual que su version read only
En el componente Iamge + Text Left (por ejemplo, pasa en varios otros componentes de imagen) yo selecciono un ancho de imagen y se ve bien, pero en el componente read only no se renderiza de la misma forma. Y esto va todos los componentes, tenes que ver que el codigo o es estilo final de los 2 componentes Editable y Read Only sea el mismo (no se si el codigo va a ser exacto el mismo, pero quizas el html final si debar serlo para que se vean igual)

---------------------

Te voy a pasar una lista de cambios, si tenes preguntas hacelas o si queres que se amplie algo preguntalo.
Usa team agents para trabajar en diferentes partes al mismo tiempo.
1. Editor de imagen en bloques con imagen: reemplazar imagen, crop, mover/reencuadrar para elegir qué parte se ve
2. Ajuste de proporción/tamaño de imagen vs texto (presets tipo 25, 50, 75, 100)
3. Opción “zoomable” para el usuario final, toggle en el editor, al click abre en primer plano con zoom (útil para gráficos)
4. Ventana pop up de configuraciones o propiedades por componente (incluye, por ejemplo, habilitar zoom), agrega un nuevo boton de accion en el header de los componentes del editor, el icono que represente "propiedades"
5. Formato de texto (opciones de styling del texto), en el footer de cada contenedor de los componentes de edicion agrega opciones de estilo, tipografia, color letra, color fondo y otras opciones segun el componente. Como haces en el componente Separator
7. Acordeón: permitir agregar imágenes dentro del contenido, modifica los componentes edicion y lectura de este componente Accordion para que permita agregar imagenes en el contenido de cada item, en los hechos puede tener un componente parrafo, imagen (en todas sus variantes, texto a la izq a la derecha, etc)
8. Tabs: mismas opciones, permitir convertir un bloque en el otro (tabs ↔ acordeón) -> Lo mismo que con Accordion pera para Tabs
10. Fix en preview del componente Tabs: está mostrando íconos de borrar
11. Carrusel: al hover de la imagen tiene que aparecer el botón para cambiar imagen
12. Carrusel: texto opcional, si no hay texto, sacar el sombreado/background asociado al texto
13. Reviews/Testimonial: permitir cargar imagen de avatar (click en imagen para cargar)
14. Avatares: edición de imagen del avatar en los componentes que piden una imagen como avatar, como chat, etc (crop + mover/reencuadrar)
15. Label image / Hotspots: al agregar pin, falta texto de descripción asociado al pin
16. Label image / Hotspots: en el editor, la “ventanita” del pin queda abajo, subir z-index para que quede arriba
17. Label image / Hotspots: opción para elegir estilo de marcadores (números vs iconitos) y color del marcador
18. Comparison: en modo edición, las columnas tienen que estar alineadas en columnas (hoy se ve como filas), no copiar el layout de “before and after”
19. Comparison: opción de meter imágenes dentro del texto
20. Before and after / Mid and facts / Do and don’t / Cost and effect: títulos editables, no fijos
21. Chat: el editor se repite para distintos tipos pero la preview de cada tipo es distinta, corregir para que cada preview sea la correcta
22. Chat: permitir editar la imagen/avatar de cada participante (sender y receiver)
23. Botón: además de URL externa, permitir navegar a una parte específica del curso (unidad 1, unidad 2, etc), deep link interno
24. Quiz/Multiple choice y similares: opción para editar el feedback (por correcto/incorrecto y/o por respuesta)
25. Flashcard: permitir agregar imagen en ambos lados (frente y dorso)
26. Escenario: selector de personaje (avatares predeterminados)
27. Escenario: selector de expresión/pose por pregunta y por respuesta (cambia “la cara” según respuesta)
28. Escenario: permitir bloques de texto intermedios (intro, transiciones, cierre) además de Q/A
29. Escenario: configuración de fondo (default blanco, color, o imagen subida)
30. Escenario: blur del fondo (efecto para usar imagen como fondo sin distraer)
31. Separador/línea: unificar variantes en un solo bloque configurable (línea arriba/abajo, centrado, wide, etc)
32. Imagen: unificar variantes de layout en un solo bloque configurable (posición: arriba, costado, etc, en vez de un bloque por variante)
34. Reordenar UI del header del bloque: invertir orden entre handle de mover (6 puntitos) y tag de tipo, tag de tipo como dropdown para elegir el tipo de bloque, mover estilos al footer del editor y sacar botón “style” de la barra
35. Estilos por bloque: control de espaciado/márgenes arriba y abajo (valores preset)
36. Estilos por bloque: color de fondo seleccionable (incluyendo alto contraste tipo gris, blanco, negro, y colores custom)
37. Colores custom: paleta, favoritos, y que los colores iniciales definidos al crear/configurar el curso aparezcan en los footers de todos los componentes. Guardar los colores favoritos por curso
38. Tabs/Acordeón: permitir editar título con formato (ej, itálicas), no solo texto plano
39. Nuevo bloque o sección global: banner general al inicio del curso (imagen corporativa), con logo y título. Todos los cursos tiene un banner/imagen inicial, el titulo del curso puede estar abajo, adentro de la imagen centrado
40. Preview: agregar modo celular (simular tamaño de pantalla móvil) para ver cómo se vería el curso en responsive

Preguntas de clarificación:

  1. Items 1, 14 (Crop/reencuadrar imagen y avatar): Para el crop, ¿querés una librería
  externa tipo react-cropper o react-easy-crop, o preferís algo custom liviano (drag + zoom
   manual sobre la imagen)? Una librería da mejor UX (área de crop con handles) pero agrega
   dependencia. Respuesta: usa la libreria
  2. Items 26-27 (Escenario: avatares predeterminados y expresiones/poses): ¿De dónde salen
   estos avatares y sus expresiones? ¿Tenés un set de imágenes/SVGs predefinidos, o hay que
   generar algo? ¿O usamos un servicio tipo DiceBear/Multiavatar para generar avatares y
  las "expresiones" serían íconos/emojis superpuestos? Respuesta: si, estan en la carpeta story-telling-block
  3. Items 31-32 (Unificar variantes de Separador e Imagen): Hoy cada variante es un
  componentName distinto en la DB (ej: ImageBlock, ImageWithTextBlock,
  ImageWithTextLeftBlock, etc.). Unificarlos en uno solo configurable implica:
    - ¿Migrar los datos existentes de todos los cursos para que usen un solo componentName
  con un campo layout?
    - ¿O mantener los componentName distintos en DB pero renderizar todo con el mismo
  editor/preview component que lea un campo layout?
  Respuesta: Unificar en 1 componente, no modifiques cursos viejos, yo despues los borro
  4. Item 34 (Tag de tipo como dropdown para elegir tipo de bloque): ¿Esto reemplaza al
  botón "Style" actual y además permite cambiar de tipo completamente (ej: de Paragraph a
  Image)? ¿O solo cambiar entre variantes del mismo grupo (como hace hoy el botón Style)?
    Respuesta: Si reemplaza el style, solo cambia entre componentes del mismo grupo
  5. Item 37 (Colores del curso en footers): ¿Los colores iniciales del curso se definen en
   el paso de branding/visual identity que ya existe? ¿O hay que agregar una sección de
  "paleta de colores" nueva? Respuesta: se definen en ese paso de branding, luego cuando el usuario pueda cmabiar los colores en 1 componente y elije un color custom de una paleta estandar para elegir colores quiero que ese color se guarde como favorito y se muestra en el resto de los estilos de los otros componentes para que pueda ser re usado con facilidad
  6. Item 39 (Banner global): ¿Es un componente nuevo que se agrega automáticamente al
  inicio de cada curso, o el usuario lo agrega manualmente como cualquier otro bloque? Es un bloque nuevo, que se agrega automaticamente en todos los cursos.
  7. Item 23 (Deep link interno en botón): ¿El selector de destino mostraría la estructura
  del curso (módulos/unidades) para elegir a dónde navegar? Respuesta: Si.
  8. Agregado nuevo: en la lista de Course Structure tambien mostra todos los componentes que hay en el curso, bajo su correspondiendo modulo y unidad, asi el usuario puede navegar facilmente haciendo click en esos modulos, unidades o componentes. Ademas que se pueda hacer drag a drop de componentes en esa lista, agrega icono correspondiendo, los modulos y unidades no se puede mover.

------------------------------

vamos a trabajar en este curso:
1- creo que hay mas separadores, agregalos todos al curso
2- Los highlights, agregaste todos, bien, pero fijate que cada highlight necesita su propio componente editor porque ahora mismo todos lucen iguales, seguro usas el mismo componente editor y se ve igual, deberian verse con el estilo correspondiente (si para este esmejor unificar todos los componentes editor en 1 solo con diferentes estilos bievenido)
3- Lo mismo que pasa con highlight pasa con Quote
4- el componente editor de imagen, para el caso de Image + Text Center, el boton para cmabiar la imagen aparece centrado y se overlaping con el texto, move el boton a la borde ingerior, con algo de margen bottom
5- las cruces para borrar cosas en los componentes editores deberian estar visibles siempre, no solo cuando hover
6- el compoente editor Table no es estilo notion, hace que aparezca una ultima fila vacia con placeholders y que la edicion sea inline y pone form de confirmacion antes de delete como en otros componentes
7- rehace el componente Editor de Columns, no se entiende, quisiera ver las columnas directamente, como es el componente original, con edicion de texto inline
8- El componente editor Timeline, no se parece al original, falta la linea, el estilo no es el mismo de los items. Saca New Event, pone un item nuevo con placeholder, tipo notion edicion inline
9- en componente gallery agrega confirmacion antes de borrar una image
10- El componente editor de Carousel deberia ser mas parecido al original con edicion en linea, la imagen se elige con el mismo selector de imagenes que usas en el resto del sistema.
11- Lo mismo que en el punto 10 pero con Testimonial
12- Lo mismo que en el punto 10 pero con Reviews, el componente original no esta renderizando el label, saca el Add review, usa un item de placeholder editable inline para crear nuevos items
13- Lo mismo en Storytelling, ya es editable inline, ok pero que se parezca al original, y agrega mas tipos de componentes Storytelling si es que hay
14- Lo mismo para Labeled Image, debe ser editable estilo notion y de paso arregla que al clickear afuera se cierren las burbujas.
15- Lo mismo para Comparison
16- Lo mismo para todos los componentes editor de Chat y sus variantes, estilo notion, edicion inline, items con placeholders para agregar items
17. Button no debe guardar en cada letra introducida, debe guardar al perder foco, el componente editor debe verse igual al original
18- lo mismo para button stack
19- lo mismo para attachment, carga datos de prueba
20. lo mismo para Sorting
21. lo mismo para Fill in the Blank, carga datos de prueba
22. lo mismo para Flash Card y Scenario


------------

rompiste la UI de varios componentes, arregla lo siguiente:
- List: para editar directamente mostra un item al final con una casilla de texto lista para agregar un texto, con un place holder: "Add a new item here..."
- Cause & Effect creo que no tenian ese diseño antes. Confirmalo, si es asi, volve al diseño anterior. Por alguna razon en el editor no se ve igual el componente que cuando hago Preview, claramente el editor no muestra el diseño correcto.
- Al cambiar de estilo algunos componentes aparecen varios, sin contenido, sin texto, arreglalo.
- Cambiaste la UI de los tabs  de los Accordion, agrega un nuevo item debe ser natural en la UI, para los tabs, simplemente agrega un nuevo tab con un place holder que diga "New tab", que sea editable, si el usuario ingresa un texto y da enter o sale del tab, que quede grabado, tambien debe haber botones para borrar los tabs, con confirmacion, lo mismo para todos los componentes que muestren items.
- muchos componentes no estan mostrand contenido pero cuando previsualizo si aparece en el contenido, el texto

---

Al clickear fuera del dropdown de estilo debe ocultarse

---

El dropdown del boton de estilo se queda corto en ancho, el ancho debe adaptarse al contenido

---

en el componente tabs se ven scroll bars verticales, eliminales

---

los botones de accion no estan centrados con respecto al ancho total del header de acciones, arreglalo

----

el boton Add Component del editor tiene el mis color de fondo que el fondo de la pagina y texto blanco, queda invisible practicamente. Cambia el estilo para que contrastre

-----

cuando se hace el drag and drop de componentes en el editor quiero ver al componente que estoy moviendo tipo fantasma para que el usuario pueda ver el movimiento que esta haciendo. Usa el mismo efecto que Sorting Steps

------------------

hace estos cambios en el Editor de cursos: http://localhost:8000/project/f81078e6-48ce-47fc-95ab-ca2d1383289a

1. asigna un icono a cada bloque y dale un color particular a cada uno, deja el tag que dice por ejemplo "Paragraph with Heading" pero agregale este nuevo iconito, hacelo para todos los bloques o componentes que hay.
2. Resalta el background color del "header de edicion" de cada bloque, que se distinga entre lo que es edicion y lo que es contenido del bloque.
3. cambia el icono de lamparita del boton de AI por el tipico 3 estrellas de la AI, fijate si existe ese icono en la libreria actual que usa el frontend.
4. Agrega un texto en boton "+" que hay entre bloques, que diga "Add component", deja el icono de mas igualmente, quiero ambas cosas en el boton
5. en el header de edicion a la izquierda agrega el tipico icono de drag and drop, suelen ser 6 puntitos u 8 puntitos y agrega funcionalidad para arrastrar y soltar un bloque, la funcionalidad es para cambiar el orden de los bloques. Si no hay endpoint para guardar este cambio, agregalo tambien.
6. cada vez que se haga un cambio, se tiene que guardar automaticamente, pero quiero ver una leyenda en el header tipo google docs que diga que se estan guardando los cambios y que los cambios fueron guardados. Luego de un tiempo, digamos 5 segundos puede desaparecer
7. Agrega las funcionalidades para borrar componentes (con confirmacion)
8. Agrega las funcionalidades para duplicar componentes, simplemente duplicalo abajo del actual.
9. Agrega las funcionalidades para previsualizar el componente, crea una ventana popup que muestre el componente igual que se mostraria en /preview/{key} o lms/{key} para que el editor pueda usarlo, verlo, ejecutarlo
10. Agrega las funcionalidades para el AI button, al clickearlo, debe abrir una popup window con una caja de texto multilinea para ingresar un prompt, con botones que digan Cerrar y Generar. Luego agregamos la funcionalidad, por ahora solo eso.
11. Saca el boton editar
12. Cada componente debe ser editable in place, in line, sin tener que entrar a un modo edicion a saber:
- un texto debe poder editarse, al salir del componente o cada ciertos segundos de edicion del usuario hay que guardar el cambio
- un componente de lista, se deben poder agregar mas bullets
- un componente de imagen debe abrir un popup window para cambiar la imagen, por ahora mostra una lista de imagenes placeholder, no hagas mas funcionalidad que esa.
- un componente cause and effect se debe poder agregar mas items
- lo mismo para un accordion, agregas mas items y editar los existentes.
- lo mismo para un tab, se deben poder agregar mas items
- para los componentes de knowledge check se deben poder modificar las opciones de cada uno en una ventana popup, para marcar respuestas validas o matches o el orden correcto
13. los componentes deben tener un nuevo boton de accion para cambiar el estilo, y debe desplega una lista con los estilos disponibles, por estilo me refiero a los componentes iguales en estructura pero con diseño diferente, por ejemplo: Quote Center Border
Quote Center Light
Quote Left Light
Quote Left
Quote
Quote Image
Hace lo mismo para los otros componentes, si es necesario agregar una columna en la tabla components para guardar esta agrupacion hacelo, determina cuales con los componentes relacionados yo despues lo valida manualmente.
Cuando el usuario cambi el estilo, debe cambiar el componente en el editor automaticamente y verse el nuevo componente.
14.

----------------------------------

en esta pagina http://localhost:8000/dashboard/learning-plans/1
sigue habiendo un remove link como texto y no como icono

En el popup selector de cursos, agrega checkboxes para seleccionar 1 o varios cursos. agrega 2 botones abajo, close y select, que el label cambie a Select All si hay mas de 1 seleccionado.
en la pagina http://localhost:8000/dashboard/learning-plans/1, al recibir el o los cursos seleccionados del popup agregarlos directo a la lista, saca el boton Add
el Remove de la tabla de cursos en learning-plans debe tener una confirmacion in line, como hiciste en otras pantallas.

----

El dropdown esta mejor ahora, fucniona bien. Pero la flecha hacia abajo del dropdown esta muy pegado al texto seleccionado, dale un gap entre estos 2 elementos

----------------------------------

cuando en portfolio desactivo que este publico en "Public portfolio
Anyone with the link can view your portfolio" el portfolio sigue siendo visible, hay que mostrar un mensaje "este portfolio no ha sido publicado todavia"

----------------------------------

en las paginas portfolio y account cuando se scrollea hacia abajo y aparece el footer con los mismos botones del header, esos botones del footer deben estar centrados, no alineados a la izquierda.

El boton View en las tablas no es mas necesario, se accede al registro haciendo click en la fila ahora. Remove ese boton.

El dropdown en http://localhost:8000/dashboard/organizations/24a7d6f4-98a9-46f3-b124-41bc958c9f72, que esta en Invite Member al ser poco angosto aparecen barras de scroll horizaontales y verticales, no debe haber barras, el contenedor de las opciones debe estirarse con el contenido.

La tabla de http://localhost:8000/dashboard/organizations no se puede entrar en los items al hacer click en la fila, ademas cada el link manage, se accede haciendo click en la fila, cambia el cursor a hand cuando se hacer hover sobre las filas
en el hijo de esa pagina, en http://localhost:8000/dashboard/organizations/24a7d6f4-98a9-46f3-b124-41bc958c9f72, on aparece el boton back arriba, copia lo que hace esta pagina para el back: http://localhost:8000/dashboard/badges/3

En esta pagina sigue habendo links con texto en vez de iconos: http://localhost:8000/dashboard/learning-plans/1

-------------------------------------------

Cuando voy a editar un curso, por ejemplo: http://localhost:8000/project/55967267-275f-489b-8f06-4f2934693c58
ME manda al editor, pero veo el chat, no el curso que tengo generado hasta el momento, chequea si este curso tiene contenido y si es asi, por que no lo muestra? una vez encontrado el problema arreglalo para que se vea el editor con los bloques y demas UI.

En la pagina http://localhost:8000/dashboard, saca la lista de projects del menu de la izquierda. Saca los 2 subtitles Projects y Settings, pero si deja todas las opciones bajo Settings: Organizations, Learning Plans, etc. y Agrega como primera opcion en este nuevo menu unico Courses

En la tabla de Badges, quiero poder entrar al badget cuando click en la fila
Ademas quiero que los links de accion sean iconos con un tooltip
Repeti este patro de UX en todas las tablas de la UI en el dashboard y en las paginas dentro de /LMS
Tambien iconos en paginas como http://localhost:8000/dashboard/badges/3 en vez de los links Edit Deactivate Delete

En el header del dashboard, en menu notificatons, esta mostrando por ejemplo: "Notifications
learning plan assigned
1d ago
New notification"
quiero que al hacer click en esa notificacion me lleve a la pagina correspondiente. Hace cambios en el schema de ser necesario

En la pagina http://localhost:8000/dashboard/organizations/24a7d6f4-98a9-46f3-b124-41bc958c9f72:
al cambiar el rol de un usuario mostra un aviso de que fue guardado el dato, creo que tenemos un toast en la parte superior en algun lado, si no es asi, a partir de ahora usemos un toast en la parte superior, verde para mensajes OK, rojo para errores o validaciones.
En esta misma pagina agrega dentro de invite member, una opcion para subir un CSV, que debe tener 3 columnas, email, nombre, rol, donde rol debe ser las opciones permitidas de roles, aclaralas para el usuario. Agrega la opcion para subir el archivo, agrega un indicador de progreso para ir mostrando que se van guardando los usuarios, si hay un usuario que no cumple con los 3 campos obligatorios, genera un nuevo archivo CSV para descargar, con una 4ta columna indicando el error, avisale de esto al usuario para que sepa que tiene que bajar el archivo y revisar los errores. Si el usuario ya existe, emails es el ID unico, actualiza el resto de los datos.
Si todo salio bien o mal o parcialmente hubo usuarios no cargados, siempre genera un nuevo CSV, ofrecelo para descarga al usuario y en la 4ta columna indica el error o el mensaje de existo: Updated, Created.
La misma funcionalidad de CSV para http://localhost:8000/dashboard/learning-plans/1, pero para asignar los enrollments

Todas las tablas de dashboard deben estar paginandas, mostrando 20 registro por defecto, imlpementa esto en el frontend y backend

En la UI del dashboard, cada vez que debe seleccionarse una organizacion, si solo existe 1, entonces seleccionarla por defecto.

Cambia la UI de los dropdowns, no quiero el aspecto por defecto. Usa un custom dropdown como por ejemplo el de notificacions, pero del estilo simple de lista.

CUando en alguna pantalla en el dashboard haya que seleccionar un curso, no quiero un dropdown, reemplazalo con una ventana popup con un buscador y la lista de cursos abajo, pero no solo el nombre pero la imagen de portada del curso, descripcion, pone botones Cerrar y cada curso debe tener un boton Select

en Portfolio el boton Save Changes debe decir Publish
quiero cambiar la UX UI de este boton en Portfolio y Account, cuando se scrolea para abajo el boton deja de estar visible, quiero que aparezca abajo de todo una especie de footer con el boton ahi puesto para que sea clickeable. en portfolio tambien agrega el boton View Porfolio en ese footer

Esta pagina http://localhost:8000/dashboard/learning-plans/1 no tiene el mismo ancho que su pagina padre, revisa el resto de las paginas "padres" y comparalas con los hijos, deben tener el mismo ancho

las paginas Portfolio y Account tiene mensajes de exito al guardar, reemplazalos por este toast que hable antes



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
