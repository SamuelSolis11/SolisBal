## Samuel Alberto Solis Baldenegro 19100257
## Metodos de HTTP
### GET
El método GET se emplea para leer una representación de un resource. En caso de respuesta positiva (200 OK), GET devuelve la representación en un formato concreto: HTML, XML, JSON o imágenes, JavaScript, CSS, etc. En caso de respuesta negativa devuelve 404 (not found) o 400 (bad request). Por ejemplo en la carga de una página web, primero se carga la url solicitada:

~~~
GET php.net/docs HTTP/1.1
~~~
En este caso devolverá HTML. Y después los demás resources como CSS, JS, o imágenes:

~~~
GET php.net/images/logo.png HTTP/1.1
~~~
Los formularios también pueden usarse con el método GET, donde se añaden los keys y values buscados a la URL del header:

~~~
<form action="formget.php" method="get"> 
    Nombre: <input type="text" name="nombre"><br>
    Email: <input type="text" name="email"><br>
    <input type="submit" value="Enviar">
</form> 
~~~
La URL con los datos rellenados quedaría así:
~~~
GET ejemplo.com/formget.php?nombre=pepe&email=pepe%40ejemplo.com HTTP/1.1
~~~

### POST
Aunque se puedan enviar datos a través del método GET, en muchos casos se utiliza POST por las limitaciones de GET. En caso de respuesta positiva devuelve 201 (created). Los POST requests se envían normalmente con formularios:
~~~
<form action="formpost.php" method="post">
    Nombre: <input type="text" name="nombre"><br>
    Email: <input type="text" name="email"><br>
    <input type="submit" value="Enviar">
</form>
~~~
Rellenar el formulario anterior crea un HTTP request con la request line:
~~~
POST /formpost.php HTTP/1.1
~~~
El contenido va en el body del request, no aparece nada en la URL, aunque se envía en el mismo formato que con el método GET. Si se quiere enviar texto largo o cualquier tipo de archivo este es el método apropiado.

Le siguen los headers, donde se incluyen algunas líneas específicas con información de los datos enviados:
~~~
Content-Type: application/x-www-form-urlencoded
Content-Length: 43
~~~
A los headers le siguen una línea en blanco y a continuación el contenido del request:
~~~
formpost.php?nombre=pepe&email=pepe%40ejemplo.com
~~~

### PUT
Utilizado normalmente para actualizar contenidos, pero también pueden crearlos. Tampoco muestra ninguna información en la URL. En caso de éxito devuelve 201 (created, en caso de que la acción haya creado un elemento) o 204 (no response, si el servidor no devuelve ningún contenido). A diferencia de POST es idempotente, si se crea o edita un resource con PUT y se hace el mismo request otra vez, el resource todavía está ahí y mantiene el mismo estado que en la primera llamada. Si con una llamada PUT se cambia aunque sea sólo un contador en el resource, la llamada ya no es idempotente, ya que se cambian contenidos.
~~~
PUT ejemplo.com/usuario/peter HTTP/1.1
~~~
### DELETE
Simplemente elimina un resource identificado en la URI. Si se elimina correctamente devuelve 200 junto con un body response, o 204 sin body. DELETE, al igual que PUT y GET, también es idempotente.
~~~
DELETE ejemplo.com/usuario/peter HTTP/1.1
~~~
### HEAD
Es idéntido a GET, pero el servidor no devuelve el contenido en el HTTP response. Cuando se envía un HEAD request, significa que sólo se está interesado en el código de respuesta y los headers HTTP, no en el propio documento. Con este método el navegador puede comprobar si un documento se ha modificado, por razones de caching. Puede comprobar también directamente si el archivo existe.

Por ejemplo, si tienes muchos enlaces en tu sitio web, puedes enviar un HEAD request a todos los enlaces para comprobar los que estén rotos. Es bastante más rápido que hacerlo con GET.

## Codigos de Respuesta
Los códigos de estado de respuesta HTTP indican si se ha completado satisfactoriamente una solicitud HTTP específica. Las respuestas se agrupan en cinco clases:

- Respuestas informativas (100–199),
- Respuestas satisfactorias (200–299),
- Redirecciones (300–399),
- Errores de los clientes (400–499),
- Errores de los servidores (500–599).

#### Respuestas afirmativas
  1. **100 Continue**
Esta respuesta provisional indica que todo hasta ahora está bien y que el cliente debe continuar con la solicitud o ignorarla si ya está terminada.
2. **101 Switching Protocol**
Este código se envía en respuesta a un encabezado de solicitud Upgrade (en-US) por el cliente e indica que el servidor acepta el cambio de protocolo propuesto por el agente de usuario.
  3. **102 Processing (WebDAV (en-US))**
Este código indica que el servidor ha recibido la solicitud y aún se encuentra procesandola, por lo que no hay respuesta disponible.
4.**103 Early Hints (en-US)**
Este código de estado está pensado principalmente para ser usado con el encabezado Link, permitiendo que el agente de usuario empiece a pre-cargar recursos mientras el servidor prepara una respuesta.

#### Respuestas sastifactorias
- **GET**: El recurso se ha obtenido y se transmite en el cuerpo del mensaje.
- **HEAD**: Los encabezados de entidad están en el cuerpo del mensaje.
- **PUT o POST**: El recurso que describe el resultado de la acción se transmite en el cuerpo del mensaje.
- **TRACE**: El cuerpo del mensaje contiene el mensaje de solicitud recibido por el servidor.
1. **200 OK**
La solicitud ha tenido éxito. El significado de un éxito varía dependiendo del método HTTP:
2. **201 Created**
La solicitud ha tenido éxito y se ha creado un nuevo recurso como resultado de ello. Ésta es típicamente la respuesta enviada después de una petición PUT.
3.**202 Accepted**
La solicitud se ha recibido, pero aún no se ha actuado. Es una petición "sin compromiso", lo que significa que no hay manera en HTTP que permite enviar una respuesta asíncrona que indique el resultado del procesamiento de la solicitud. Está pensado para los casos en que otro proceso o servidor maneja la solicitud, o para el procesamiento por lotes.
4. **203 Non-Authoritative Information**
La petición se ha completado con éxito, pero su contenido no se ha obtenido de la fuente originalmente solicitada, sino que se recoge de una copia local o de un tercero. Excepto esta condición, se debe preferir una respuesta de 200 OK en lugar de esta respuesta.
5. **204 No Content (en-US)**
La petición se ha completado con éxito pero su respuesta no tiene ningún contenido, aunque los encabezados pueden ser útiles. El agente de usuario puede actualizar sus encabezados en caché para este recurso con los nuevos valores.
6. **205 Reset Content (en-US)**
La petición se ha completado con éxito, pero su respuesta no tiene contenidos y además, el agente de usuario tiene que inicializar la página desde la que se realizó la petición, este código es útil por ejemplo para páginas con formularios cuyo contenido debe borrarse después de que el usuario lo envíe.
7. **206 Partial Content**
La petición servirá parcialmente el contenido solicitado. Esta característica es utilizada por herramientas de descarga como wget para continuar la transferencia de descargas anteriormente interrumpidas, o para dividir una descarga y procesar las partes simultáneamente.
8. **207 Multi-Status (WebDAV (en-US))**
Una respuesta Multi-Estado transmite información sobre varios recursos en situaciones en las que varios códigos de estado podrían ser apropiados. El cuerpo de la petición es un mensaje XML.
9. **208 Multi-Status (WebDAV (en-US))**
El listado de elementos DAV ya se notificó previamente, por lo que no se van a volver a listar.
10. **226 IM Used (HTTP Delta encoding)**
El servidor ha cumplido una petición GET para el recurso y la respuesta es una representación del resultado de una o más manipulaciones de instancia aplicadas a la instancia actual.

### Redirecciones
1. **300 Multiple Choice (en-US)**
Esta solicitud tiene más de una posible respuesta. User-Agent o el usuario debe escoger uno de ellos. No hay forma estandarizada de seleccionar una de las respuestas.
2. **301 Moved Permanently (en-US)**
Este código de respuesta significa que la URI del recurso solicitado ha sido cambiado. Probablemente una nueva URI sea devuelta en la respuesta.
3. **302 Found**
Este código de respuesta significa que el recurso de la URI solicitada ha sido cambiado temporalmente. Nuevos cambios en la URI serán agregados en el futuro. Por lo tanto, la misma URI debe ser usada por el cliente en futuras solicitudes.
4. **303 See Other (en-US)**
El servidor envía esta respuesta para dirigir al cliente a un nuevo recurso solicitado a otra dirección usando una petición GET.
5. **304 Not Modified**
Esta es usada para propósitos de "caché". Le indica al cliente que la respuesta no ha sido modificada. Entonces, el cliente puede continuar usando la misma versión almacenada en su caché.
6. **305 Use Proxy Deprecated**
Fue definida en una versión previa de la especificación del protocolo HTTP para indicar que una respuesta solicitada debe ser accedida desde un proxy. Ha quedado obsoleta debido a preocupaciones de seguridad correspondientes a la configuración de un proxy.
7. **306 unused**
Este código de respuesta ya no es usado más. Actualmente se encuentra reservado. Fue usado en previas versiones de la especificación HTTP1.1.
8. **307 Temporary Redirect (en-US)**
El servidor envía esta respuesta para dirigir al cliente a obtener el recurso solicitado a otra URI con el mismo método que se usó la petición anterior. Tiene la misma semántica que el código de respuesta HTTP 302 Found, con la excepción de que el agente usuario no debe cambiar el método HTTP usado: si un POST fue usado en la primera petición, otro POST debe ser usado en la segunda petición.
9. **308 Permanent Redirect (en-US)**
Significa que el recurso ahora se encuentra permanentemente en otra URI, especificada por la respuesta de encabezado HTTP Location:. Tiene la misma semántica que el código de respuesta HTTP 9.301 Moved Permanently, con la excepción de que el agente usuario no debe cambiar el método HTTP usado: si un POST fue usado en la primera petición, otro POST debe ser usado en la segunda petición.

#### Errores de cliente
1. **400 Bad Request**
Esta respuesta significa que el servidor no pudo interpretar la solicitud dada una sintaxis inválida.
2. **401 Unauthorized**
Es necesario autenticar para obtener la respuesta solicitada. Esta es similar a 403, pero en este caso, la autenticación es posible.
3. **402 Payment Required**
Este código de respuesta está reservado para futuros usos. El objetivo inicial de crear este código fue para ser utilizado en sistemas digitales de pagos. Sin embargo, no está siendo usado actualmente.
4. **403 Forbidden**
El cliente no posee los permisos necesarios para cierto contenido, por lo que el servidor está rechazando otorgar una respuesta apropiada.
5. **404 Not Found**
El servidor no pudo encontrar el contenido solicitado. Este código de respuesta es uno de los más famosos dada su alta ocurrencia en la web.
6. **405 Method Not Allowed (en-US)**
El método solicitado es conocido por el servidor pero ha sido deshabilitado y no puede ser utilizado. Los dos métodos obligatorios, GET y HEAD, nunca deben ser deshabilitados y no deberían retornar este código de error.
7. **406 Not Acceptable (en-US)**
Esta respuesta es enviada cuando el servidor, después de aplicar una negociación de contenido servidor-impulsado, no encuentra ningún contenido seguido por la criteria dada por el usuario.
8. **407 Proxy Authentication Required (en-US)**
Esto es similar al código 401, pero la autenticación debe estar hecha a partir de un proxy.
9. **408 Request Timeout**
Esta respuesta es enviada en una conexión inactiva en algunos servidores, incluso sin alguna petición previa por el cliente. Significa que el servidor quiere desconectar esta conexión sin usar. Esta respuesta es muy usada desde algunos navegadores, como Chrome, Firefox 27+, o IE9, usa mecanismos de pre-conexión HTTP para acelerar la navegación. También hay que tener en cuenta que algunos servidores simplemente desconecta la conexión sin enviar este mensaje.
10. **409 Conflict (en-US)**
Esta respuesta puede ser enviada cuando una petición tiene conflicto con el estado actual del servidor.
11.  **410 Gone (en-US)**
Esta respuesta puede ser enviada cuando el contenido solicitado ha sido borrado del servidor.
12. **411 Length Required (en-US)**
El servidor rechaza la petición porque el campo de encabezado Content-Length no esta definido y el servidor lo requiere.
13. **412 Precondition Failed (en-US)**
El cliente ha indicado pre-condiciones en sus encabezados la cual el servidor no cumple.
14. **413 Payload Too Large**
La entidad de petición es más larga que los límites definidos por el servidor; el servidor puede cerrar la conexión o retornar un campo de encabezado Retry-After.
15. **414 URI Too Long (en-US)**
La URI solicitada por el cliente es más larga de lo que el servidor está dispuesto a interpretar.
16. **415 Unsupported Media Type (en-US)**
El formato multimedia de los datos solicitados no está soportado por el servidor, por lo cual el servidor rechaza la solicitud.
17. **416 Requested Range Not Satisfiable (en-US)**
El rango especificado por el campo de encabezado Range en la solicitud no cumple; es posible que el rango está fuera del tamaño de los datos objetivo del URI.
18. **417 Expectation Failed (en-US)**
Significa que la expectativa indicada por el campo de encabezado Expect solicitada no puede ser cumplida por el servidor.
19. **418 I'm a teapot**
El servidor se rehúsa a intentar hacer café con una tetera.
20. **421 Misdirected Request**
La petición fue dirigida a un servidor que no es capaz de producir una respuesta. Esto puede ser enviado por un servidor que no está configurado para producir respuestas por la combinación del esquema y la autoridad que están incluidos en la URI solicitada
21. **422 Unprocessable Entity (en-US) (WebDAV (en-US))**
La petición estaba bien formada pero no se pudo seguir debido a errores de semántica.
22. **423 Locked (WebDAV (en-US))**
El recurso que está siendo accedido está bloqueado.
23. **424 Failed Dependency (WebDAV (en-US))**
La petición falló debido a una falla de una petición previa.
24. **426 Upgrade Required (en-US)**
El servidor se rehúsa a aplicar la solicitud usando el protocolo actual pero puede estar dispuesto a hacerlo después que el cliente se actualice a un protocolo diferente. El servidor envía un encabezado Upgrade en una respuesta para indicar los protocolos requeridos.
25. **428 Precondition Required (en-US)**
El servidor origen requiere que la solicitud sea condicional. Tiene la intención de prevenir problemas de 'actualización perdida', donde un cliente OBTIENE un estado del recurso, lo modifica, y lo PONE devuelta al servidor, cuando mientras un tercero ha modificado el estado del servidor, llevando a un conflicto.
26. **429 Too Many Requests (en-US)**
El usuario ha enviado demasiadas solicitudes en un periodo de tiempo dado.
27. **431 Request Header Fields Too Large (en-US)**
El servidor no está dispuesto a procesar la solicitud porque los campos de encabezado son demasiado largos. La solicitud PUEDE volver a subirse después de reducir el tamaño de los campos de encabezado solicitados.
28. **451 Unavailable For Legal Reasons (en-US)**
El usuario solicita un recurso ilegal, como alguna página web censurada por algún gobierno.

#### Errores del Servidor
1. **500 Internal Server Error**
El servidor ha encontrado una situación que no sabe cómo manejarla.
2. **501 Not Implemented (en-US)**
El método solicitado no está soportado por el servidor y no puede ser manejado. Los únicos métodos que los servidores requieren soporte (y por lo tanto no deben retornar este código) son GET y HEAD.
3. **502 Bad Gateway**
Esta respuesta de error significa que el servidor, mientras trabaja como una puerta de enlace para obtener una respuesta necesaria para manejar la petición, obtuvo una respuesta inválida.
4. **503 Service Unavailable**
El servidor no está listo para manejar la petición. Causas comunes puede ser que el servidor está caído por mantenimiento o está sobrecargado. Hay que tomar en cuenta que junto con esta respuesta, una página usuario-amigable explicando el problema debe ser enviada. Estas respuestas deben ser usadas para condiciones temporales y el encabezado HTTP Retry-After: debería, si es posible, contener el tiempo estimado antes de la recuperación del servicio. El webmaster debe también cuidar los encabezados relacionados al caché que son enviados junto a esta respuesta, ya que estas respuestas de condición temporal deben usualmente no estar en el caché.
5. **504 Gateway Timeout**
Esta respuesta de error es dada cuando el servidor está actuando como una puerta de enlace y no puede obtener una respuesta a tiempo.
6. **505 HTTP Version Not Supported**
La versión de HTTP usada en la petición no está soportada por el servidor.
7. **506 Variant Also Negotiates (en-US)**
El servidor tiene un error de configuración interna: negociación de contenido transparente para la petición resulta en una referencia circular.
8. **507 Insufficient Storage (en-US)**
El servidor tiene un error de configuración interna: la variable de recurso escogida está configurada para acoplar la negociación de contenido transparente misma, y no es por lo tanto un punto final adecuado para el proceso de negociación.
9. **508 Loop Detected (en-US) (WebDAV (en-US))**
El servidor detectó un ciclo infinito mientras procesaba la solicitud.
10. **510 Not Extended (en-US)**
Extensiones adicionales para la solicitud son requeridas para que el servidor las cumpla.
11. **511 Network Authentication Required (en-US)**
El código de estado 511 indica que el cliente necesita autenticar para obtener acceso a la red.
