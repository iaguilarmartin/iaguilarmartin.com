# How to implement basic HTTP auth on NodeJS & Express backend

![](https://res.cloudinary.com/dr4a6933v/image/upload/v1648565183/iaguilarmartin.com/express_and_nodejs.png)

In order to avoid that anyone can perform requests to your backend it is necessary to implement some type of authentication. It is a must if your backend contains endpoints where data is updated as result.

Nowadays we have available several types of authentication like for example, **basic HTTP auth, API Key** authentication or using **JSON Web Tokens (JWT)**. In this post I am going to explain how to implement into your backend the basic HTTP auth, which is the simplest authentication type between all of them. Despite it is not as secure as other types it has some advantages like its simplicity and that it is supported by every browser so anybody can login into your backend manually and without adding a single line of code to your web page (or almost).

Continue reading to learn how to implement this authentication type into your **NodeJS** and **Express** backend:

## Import basic-auth module

You can find a bunch of different modules that will make this implementation easier but my favorite one is [basic-auth](https://github.com/jshttp/basic-auth) because it is easy to use and works perfectly. To install it just execute the following command:

```bash
npm install --save basic-auth
```

## Building your own module

My advise is that you include all the source code of the authentication inside your own module. Because in that way, you separate it from the rest of the solution and it can be reused easily in different points of our backend. Besides, I also prefer creating an specific module to store credentials information so if I need to change them later I can remember quickly where they are. This is the configuration module source code:

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

As you can see, this is a pretty simple module and you can also use it to store other configuration values as connection strings, number of instances of the backend and more. The ideal would be to encrypt the password so it is not visible directly in source code but, in order to keep this sample as clean as possible I am not going to do it.

Now let’s see authentication module source code:

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

This sample is so easy that I do not think it requires any explanation. Firstly, we have to import basic-auth and configuration modules. The only thing that this module does is to recover user information from request header using basic-auth module and validate it against configured credentials. If they coincide then we invoke `next();` function to continue with the following middleware whereas, if the information is wrong we respond with a 401 error returning inside header that the validation have not been passed.

In this scenario we only have one user but you can complicate it adding more users and different roles by user.

## Invoking the module

Once our module is ready it’s time to invoke it. This can be done in two different ways. If we want that all requests done to our backend require authentication then we have to invoke it from the *app.js* file of our project, just before endpoints modules:

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

If what you want is just securing some endpoints, the call to `app.use(auth())` method should be after those endpoints. Another possibility is to invoke our module inside each endpoint router declaration:

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

And that’s all, now our backend is a little more secure.

If you want to know more about basic HTTP authentication and how to create an AngularJS web site that performs requests to a backend that implement it, just take a look to this [post I wrote some weeks ago](/blog/show-browsers-login-dialog-when-performing-requests-to-an-api-with-basic-authentication-enabled-using-angularjs/).

If you want me to write a new post explaining another type of authentication inside this backend just leave a comment. I would appreciate if you take some time sharing this post on your social networks.