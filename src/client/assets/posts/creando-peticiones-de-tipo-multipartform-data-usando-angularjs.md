# Creando peticiones de tipo multipart/form-data usando AngularJS

En este post voy a explicar como subir ficheros a un servidor usando peticiones multipart/form-data con AngularJS. La semana pasada, mientras intentaba implementar una funcionalidad para poder visualizar ficheros CSV en el visor GIS que estoy implementando con esta tecnología, me encontré con que no existía ninguna directiva nativa de AngularJS que facilitara dicha tarea. Entonces comencé a investigar cual sería el mejor modo de hacerlo.

Lo que yo necesitaba exactamente era enviar un fichero CSV a un servicio Web que tiene ESRI, para que este procesara su contenido y me lo devolviera en formato JSON. De este modo, podría cargar dicho objeto en mi visor y manipular su información sin problemas. Como punto de partida tomé [este ejemplo](https://developers.arcgis.com/javascript/3/jssamples/portal_addshapefile.html) que encontré en el sitio Web del API JavaScript de ArcGIS. Como podéis ver, el ejemplo está escrito usando el framework JavaScript de Dojo. A pesar de que tengo experiencia con este framework he preferido construirme mi propio ejemplo en AngularJS para mantener la homogeneidad del proyecto y no mezclar diferentes frameworks en una misma aplicación.

Bueno, ahora que ya os he puesto un poco en contexto, !vamos al lío!

## Creando la directiva

En primer lugar necesitaremos nuestra propia directiva. Será una directiva muy simple. En su plantilla únicamente incluiremos un control input de tipo file para que el usuario selecciones el fichero alojado en su dispositivo y un botón desde el cual validar el fichero y comenzar la subida del mismo.

```html
<input id='inputFile' type='file' accept='.csv'/>
<button ng-click='uploadFile()'>Load Data</button>
```

Una vez tenemos la plantilla, haremos uso del objeto `element` que se recibe por parámetro cuando se implementa la función link en nuestras directivas para acceder al control input y al fichero que este contiene:

```javascript
link: function(scope, element) {
   // Loading selected file when button is clicked
   scope.uploadFile = function() {

   // Getting input control
   var input = element.find("input");

   // Verifying that a file has been selected
   var fileName = input.val();

   // Getting selected file content
   var file = input[0].files[0];
}
```

## Creando la solicitud

Tras conseguir acceder al fichero, lo siguiente será crear la solicitud y enviarla. Para emular el uso de una etiqueta HTML de tipo form crearemos un objeto `FormData` y adjuntaremos en él todos los parámetros necesarios para hacer la solicitud. Estos parámetros dependen de la información que el servidor espera recibir por parte de nuestra página web. En mi caso, he tenido que añadir los siguiente parámetros:

```javascript
var fd = new FormData();
fd.append('file', file);
fd.append('filetype', 'csv');
fd.append('publishParameters', getRequestParams());
fd.append('f', 'json');
```

Finalmente, llega el momento de lanzar la solicitud. Haciendo uso de la directiva `$http`, mandaremos un mensaje de tipo POST al servidor incluyendo el objeto FormData creado anteriormente. En este punto, es muy importante sobrescribir el valor por defecto de la cabecera **Content-Type** estableciéndolo a undefined. Con ello, nos aseguramos de que sea el explorador el encargado de establecer tipo de contenido de la solicitud (multipart/form-data).

```javascript
$http.post('https://www.arcgis.com/sharing/rest/content/features/generate', fd, {
  transformRequest: angular.identity,
  headers: {'Content-Type': undefined}
}
).success(function(result) {
})
```

¡Eso es todo! He creado un ejemplo completo de esto funcionando en JSFiddle. Este es el enlace por si alguien quiere echarle un vistazo: [JSFiddle](https://jsfiddle.net/iaguilarmartin/9gh4qsvq/)