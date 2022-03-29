# Mostrar mensajes de alerta usando AngularJS y Bootstrap

![](https://res.cloudinary.com/dr4a6933v/image/upload/v1648565183/iaguilarmartin.com/alertMessage.png)

En este post voy a explicar como implementar una directiva de AngularJS que muestre mensajes de alerta dentro de uno de los controladores de tu web.

Los mensajes de alerta o información se están convirtiendo en una manera popular de reclamar la atención del usuario. Estoy seguro de que os habréis encontrado con más de uno si soléis trabajar con las ultimas versiones de Eclipse, WebStorm o Android Studio. Particularmente a mi me gusta usarlo para informar al usuario del resultado de alguna tarea que se estuviera ejecutando en segundo plano.

He decido utilizar Bootstrap para este ejemplo porque simplifica enormemente la parte de diseño de la interfaz gráfica para los mensajes. Si no estas familiarizado con este framework deberías echarle un vistazo porque es una autentica maravilla a la hora de diseñar páginas Web. Sobre todo, si pretendes que esta cuenten con un aspecto moderno y 100% responsive.

¡Comencemos con el ejemplo!:

## El Controlador

Lo primero de todo es crear el controlador padre de la aplicación web. Usaremos el $scope de este objeto para manejar las propiedades del mensaje de alerta. Cuando este objeto valga null no se mostrará nada.

```javascript
app.controller("MyController", function($scope) {

    $scope.alertMessage = null;

    // Función que se encargará de mostrar el mensaje de alerta.
    function showAlert() {
        $scope.alertMessage =   {
            // 'type' define el aspecto que tendrá el mensaje de alerta.
            type: "success",
            text: "Texto del mensaje a mostrar",
            // Si 'closable' es 'true' se mostrará un botón para ocultar de manera manual el mensaje.
            closable: true,
            // número de segundos antes de que el mensaje de alerta desaparezca de forma automática.
            delay: 3
        };
    };
});
```

## La directiva

Una vez terminado el controlador, necesitamos una directiva que convierta nuestro objeto alertMessage en un elemento HTML. Dentro del scope de la directiva, tenemos que dar de alta tambien un nuevo objeto alertMessage. Este objeto estará enlazado con el existente en el controlador. De modo que, cualquier cambio que se haga del objeto en el controlador, se vea inmediatamente reflejado en la directiva y vice versa. Esto lo haremos, como se ve más adelante, por medio de un atributo dentro del tag HTML de la directiva.

```javascript
app.directive("alertMessage", function($compile) {
    return {
        scope: {
            alert: "="
        },
        link: function (scope, element) {
            // Actualiza el mensaje de alerta cada vez que el objeto es modificado.
            scope.$watch('alert', function () {
                updateAlert();
            });

            // Cerrar mensaje de alerta
            scope.close = function() {
                scope.alert = null;
            }

            function updateAlert() {
                var html = "";

                if (scope.alert) {
                    var icon = null;

                    switch (scope.alert.type) {
                        case 'success': {
                            icon = 'ok-sign';
                        } break;
                        case 'warning': {
                            icon = 'exclamation-sign';
                        } break;
                        case 'info': {
                            icon = 'info-sign';
                        } break;
                        case 'danger': {
                            icon = 'remove-sign';
                        } break;
                    }

                    html = "<div class='alert alert-" + scope.alert.type + "' role='alert'>";

                    if (scope.alert.closable) {
                        html += "<button type='button' class='close' data-dismiss='alert' ng-click='close()' aria-label='Close'><span aria-hidden='true'></span></button>";
                    }

                    if (icon) {
                        html += "<span style='padding-right: 5px;' class='glyphicon glyphicon-" + icon + "' aria-hidden='true'></span>";
                    }

                    html += scope.alert.text;
                    html += "</div>";
                }

                var newElement = angular.element(html);
                var compiledElement = $compile(newElement)(scope);

                element.html(compiledElement);

                if (scope.alert && scope.alert.delay > 0) {
                    setTimeout(function () {
                        scope.alert = null;
                        scope.$apply();
                    }, scope.alert.delay * 1000);
                }
            }
        }
     }
});
```

Es **importante** mencionar que debemos adjuntar el plugin JQuery dentro de nuestro index. Ya que, a pesar de que AngularJS ya incluye una versión reducida del mismo. No incorpora los componentes necesarios para acceder a los diferentes elementos del DOM a traves de selectores. Esta capacidad es necesaria para poder compilar en tiempo de ejecución el código HTML de la directiva.

```html
<script src="vendor/jquery-1.9.1.js"></script>
<script src="vendor/angular.js"></script>
```

Es posible obtener el mismo resultado sin necesidad de compilar la directiva e implementándola directamente dentro su plantilla HTML. Sin embargo, lo he hecho así porque considero que para este ejemplo queda más claro.

## HTML

Finalmente, así quedaría el código HTML que debemos incluir en nuestro index.html:

```javascript
<div ng-app="AlertMessagesSample">
    <div ng-controller="MyController">
        <alert-message alert="alertMessage"></alert-message>
        .
        .
        .
    </div>
</div>
```

Si quieres ver el ejemplo completo y funcionando, accede al siguiente enlace en [JSFiddle](https://jsfiddle.net/iaguilarmartin/pz8uz8r3/73/)