# Como implementar autenticación básica en un backend contruido con NodeJS y Express

![](https://res.cloudinary.com/dr4a6933v/image/upload/v1648565183/iaguilarmartin.com/express_and_nodejs.png)

Todo backend que se precie debe tener implementado algún tipo de autenticación para evitar que cualquier persona puede realizar peticiones sobre el, y más, si dicho backend cuenta con endpoints que realicen modificaciones sobre los datos con los que este trabaja.

Hoy en día, tenemos disponibles muchos tipos de autenticación, como por ejemplo: la **autenticación básica**, autenticación por medio de un **API Key** o los **JSON Web Tokens (JWT)** que están muy de moda últimamente. En este post voy a explicar como incorporar a tu backend el mas sencillo de todos, que es la autenticación básica o **Basic HTTP Auth** en ingles. Además de ser muy sencillo de implementar, cuenta con la ventaja de que está soportado por todos los navegadores y por tanto cualquier persona puede identificarse de manera manual y sin incluir ni una sola línea de código en nuestra web (o casi).



Los pasos a seguir para incorporar en un backend construido con **NodeJS** y **Express** este tipo de autenticación son los siguientes:

## Incluir la libreria basic-auth

En la actualidad existen varios módulos de NodeJS para integrar la autenticación básica en tu backend. Yo te recomiendo utilizar el módulo [basic-auth](https://github.com/jshttp/basic-auth) ya que funciona perfectamente y es super sencillo de utilizar. Para su instalación ejecutaremos el siguiente comando:

```bash
npm install --save basic-auth
```

## Crear un modulo propio

Yo te aconsejo encapsular toda la lógica de la autenticación dentro de un modulo propio para que este bien separado del resto de operaciones del backend y para que pueda ser reutilizado de una manera sencilla desde diferentes puntos de nuestro código. Además, también me gusta guardar los credenciales de autenticación en un módulo de configuración para que si en algún momento necesito modificarlos, los pueda tener a mano. El código de dicho módulo de configuración es el siguiente:

```javascript
'use strict';

module.exports = {
    auth: {
        enabled: true,
        user: "myuser",
        password: "mypassword"
    }
};
```

Como veis, es un módulo extremadamente sencillo y se puede reutilizar para guardar otros valores de configuración como la cadena de conexión a la base de datos o el numero de instancias del backend que queremos arrancar…etc. Lo ideal sería encriptar dicha contraseña para que no fuera visible directamente en el código del backend y desencriptarla a la hora de compararla con la que ha proporcionado el usuario pero, con el fin de mantener este post lo más sencillo posible no lo voy a hacer.

Una vez tenemos metidos los datos de inicio de sesión vamos con el código del módulo de autenticación:

```javascript
'use strict';

var basicAuth = require('basic-auth');
let credentials = require('./../app_config').auth;

module.exports = function () {
    return function(req, res, next) {
        if (!credentials.enabled) {
            return next();
        }

        var user = basicAuth(req);
        if (!user || user.name !== credentials.user || user.pass !== credentials.password) {
            res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
            return res.send(401);
        }
        next();
    };
};
```

El código es tan sencillo que prácticamente se explica el solo. Antes de la declaración del modulo tenemos los imports del módulo basic-auth y de los credenciales de autenticación. El módulo en si lo único que hace es recuperar los datos del usuario de la cabecera de la petición usando el módulo basic-auth y validarlos contra los que nosotros tenemos configurados. Si son correctos, usamos la función `next();` para pasar al siguiente middlepoint y en caso contrario respondemos con un error 401, indicando en la cabecera que no ha pasado el proceso de autenticación básico.

Este es un caso de uso muy simple donde únicamente hay un usuario. Se podría crear una estructura mucho más compleja con varios usuarios y donde cada usuario pudiera tener diferentes roles.

## Invocando el modulo

Una vez tenemos el módulo creado, es hora de invocarlo. Esta invocación se puede realizar de dos maneras diferentes. Si queremos que todas las llamadas de nuestro backend estén securizadas, entonces, lo llamaremos directamente desde el *app.js* de nuestra aplicación, justo delante de todos los módulos de endpoints:

```javascript
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

let auth = require('./lib/authentication');
app.use(auth());

app.use('/api/v1/students', require('./routes/api/v1/students'));
app.use('/api/v1/categories', require('./routes/api/v1/categories'));
app.use('/api/v1/products', require('./routes/api/v1/products'));
app.use('/api/v1/lessons', require('./routes/api/v1/lessons'));
app.use('/api/v1/articles', require('./routes/api/v1/articles'));
app.use('/api/v1/sales', require('./routes/api/v1/sales'));
```

Si por el contrario, simplemente quieres securizar algunos endpoints puedes colocar estos antes de realizar la llamada a `app.use(auth())` o bien, meterlos dentro de la declaración de ruta de dicho endpoint de la siguiente manera:

```javascript
'use strict';

let express = require('express');
let router = express.Router();
let auth = require('./lib/authentication');

router.delete('/:article', auth(), function(req, res) {
    Article.deleteRecord(req.params.article, function(err) {
        if (err) {
            return res.json({
                success: false,
                error: {message: err.message, err: err}
            });
        }

        return res.json({
            success: true
        });
    });
});
```

Y con estos sencillos pasos ya habríamos hecho nuestro backend al menos un poco seguro.

Si quieres saber un poco más acerca de la autenticación HTTP básica e incluso como crear una web en AngularJS que realice peticiones a un backend que la implementa, echa un vistazo a [este post que escribí hace poco](/blog/mostrar-ventana-de-login-del-explorador-al-llamar-a-un-api-con-autenticacion-basica-usando-angularjs/).

Si quieres que escriba una nuevo post explicando como implementar otro tipo de autenticación en nuestro backend simplemente indícamelo en los comentarios. También puedes dejar un comentario si tienes cualquier duda o simplemente para indicar si este post te ha parecido interesante o no.