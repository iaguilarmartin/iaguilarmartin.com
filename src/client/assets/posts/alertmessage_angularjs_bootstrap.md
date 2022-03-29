# Displaying alert messages with AngularJS & Bootstrap

![](https://res.cloudinary.com/dr4a6933v/image/upload/v1648565183/iaguilarmartin.com/alertMessage.png)

In this post I am going to explain how to implement an AngularJS directive to display alert messages inside one of your website containers.

Alert messages are becoming in a very popular way of giving feedback to the user. I am sure you have come up with more than one while coding in latest version of Eclipse, WebStorm or Android Studio. I usually display alert messages to the user to inform about the result of a background process.

I decided to include Bootstrap because it simplifies incredibly the design part of this sample and if you are not familiarized with it you should consider giving it a chance.

Let’s start with the sample:

## The controller

First of all we need a parent controller with an object. In this object we are going to store the properties of the alert message. If it is null then no alert message would be displayed.

```javascript
app.controller("MyController", function($scope) {
    On controller declaration the alert message would be hidden
    $scope.alertMessage = null;

    // Invoke this function to display the alert message
    function showAlert() {
        $scope.alertMessage =   {
            // type defines the style of the alert message
            type: "success",
            text: "Text to show in the alert message",
            // if true a button will be rendered to dismiss the alert message manually
            closable: true,
            // number of seconds that the alert message would be visible before disappearing
            delay: 3
        };
    };
});
```

## The directive

Now that we have a controller, we need a directive to convert our alertMessage object into an HTML element. Inside the scope of the directive we have to include an alertMessage object too. This object will be bound with the one inside the controller. So any change made in the controller will be automatically applied to directive’s object and vice versa.

```javascript
app.directive("alertMessage", function($compile) {
    return {
        scope: {
            alert: "="
        },
        link: function (scope, element) {
            // Redraw the alert message each time the object is modified
            scope.$watch('alert', function () {
                updateAlert();
            });

            // Close alert message
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
                        html += "<button type='button' class='close' data-dismiss='alert' ng-click='close()' aria-label='Close'><span aria-hidden='true'>&times;</span></button>";
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

It is **important** to mention that we must include JQuery plugin into our index page. Despite AngularJS already includes a version of JQLite embedded it is not able to look up elements via selector. We use this capability to compile alert message’s template at runtime.

```html
<script src="vendor/jquery-1.9.1.js"></script>
<script src="vendor/angular.js"></script>
```

It is possible to get the same result writing the template only using AngularJS’s directives instead of using the $compile service but in my opinion, doing in that way is easier to understand.

## HTML

Finally, this is the source code that we have to include inside our index.html page:

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

You can take a look to a complete sample of that in [JSFiddle](https://jsfiddle.net/iaguilarmartin/pz8uz8r3/73/)