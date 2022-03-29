# Show browser’s login dialog when performing requests to an API with Basic Authentication enabled using AngularJS

![](https://res.cloudinary.com/dr4a6933v/image/upload/v1648565183/iaguilarmartin.com/SecurityAngularJS.png)

It is very common when developing a Web site to come up with the requirement of requesting some information to an API that required any type of authentication to be used.

Nowadays, we have several ways of implementing authentication in our services. One of the most used and easiest to implement is **HTTP Basic Authentication (BA)** because it doesn’t require cookies, session identifiers, or login pages. As it is an standard protocol, browsers are the ones in charge of displaying to the users a pop-up dialog so they can introduce a valid username and password. This information is sent to the server codified in **Base64** format inside an HTTP header field which name is **WWW-Authenticate**. It is important to take into consideration that the level of security that provides this type of authentication is really low and it is recommended to use it in conjunction with **HTTPS**.

Now that we know a bit more about BA, let’s see how to prepare our AngularJS’s web app to consume APIs that implement it. If we perform a request to a service and it returns to us a **401 Unauthorized** error, normally, it is a symptom that it has implemented any kind of authentication.

![](https://res.cloudinary.com/dr4a6933v/image/upload/v1648592865/iaguilarmartin.com/401error.png)

The image above shows a typical response of a service that implements BA. We know that because inside the response header we can see this field: `WWW-Authenticate: Basic realm=Authorization Required`

Enabling secured request in **AngularJS** is extremely easy. You only have to tell your Web app that by default always try to perform request providing credentials. And we achieve this just with simple line of code inside the configuration phase of our module using  **$httpProvider**. Take a look to the next piece of code:

```javascript
angular.module("myApp").config(["$httpProvider", function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
}]);
```

As a consequence of that, the next time that our Web app call this API our browser will show us a dialog similar to this one:

![](https://res.cloudinary.com/dr4a6933v/image/upload/v1648592865/iaguilarmartin.com/login.png)

If the login information that we provided is correct then the service response would look similar to this one:

![](https://res.cloudinary.com/dr4a6933v/image/upload/v1648592865/iaguilarmartin.com/200Ok.png)

I hope you find this post interesting.