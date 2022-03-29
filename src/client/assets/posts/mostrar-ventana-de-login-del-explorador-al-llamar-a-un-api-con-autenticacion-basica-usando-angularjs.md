# Mostrar ventana de login del explorador al llamar a un API con autenticación básica usando AngularJS

![](https://res.cloudinary.com/dr4a6933v/image/upload/v1648565183/iaguilarmartin.com/SecurityAngularJS.png)

Seguramente, mientras desarrollabais un sitio Web, os habéis encontrado con la necesidad de hacer llamadas a un API propia o de terceros que requería de autenticación para poder usarla.

Existen varios tipos de autenticación pero una de las más comunes y más fáciles de implementar es la **Autenticación Básica**. Este tipo de autenticación no hace uso de cookies, ni de identificadores de sesión (como por ejemplo tokens) ni siquiera de formularios personalizados de login. Ya que, al ser un protocolo estándar, es el propio navegador el que te mostrará una ventana emergente donde poder introducir un nombre de usuario y contraseña. Esa información se enviará codificada en formato **Base64** al servidor dentro de un campo de la cabecera HTTP cuyo nombre es **WWW-Authenticate**. Es importante tener en cuenta también que la Autenticación Básica es relativamente fácil de romper.

Una vez hecha una breve descripción del funcionamiento de la autenticación básica, retomamos el tema principal del post. Si hacemos una llamada a un API con este tipo de autenticación activada, lo normal, es que el servidor nos responda con un código de error **401 Unauthorized** como el de la imagen siguiente:

![](https://res.cloudinary.com/dr4a6933v/image/upload/v1648592865/iaguilarmartin.com/401error.png)

Como se puede ver en la cabecera de la respuesta, el servidor nos está indicando que es necesario proporcionar la información de autenticación: `WWW-Authenticate: Basic realm=Authorization Required`

En **AngularJS**, hacer que el explorador solicite al usuario dicha información es muy sencillo. Simplemente habrá que indicarte que, por defecto, todas las peticiones HTTP que haga incluyan la solicitud de credenciales. Esto se consigue con una simple linea de código dentro de la fase de configuración de la aplicación, haciendo uso del proveedor `$httpProvider`, tal y como se puede ver en el siguiente fragmento de código:

```javascript
angular.module("myApp").config(["$httpProvider", function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
}]);
```

El resultado será, la solicitud de usuario y contraseña por parte del explorador:

![](https://res.cloudinary.com/dr4a6933v/image/upload/v1648592865/iaguilarmartin.com/login.png)

Y la consiguiente respuesta positiva del servidor, siempre y cuando, la información proporcionada sea válida:

![](https://res.cloudinary.com/dr4a6933v/image/upload/v1648592865/iaguilarmartin.com/200Ok.png)

Espero que este post os haya sido de utilidad