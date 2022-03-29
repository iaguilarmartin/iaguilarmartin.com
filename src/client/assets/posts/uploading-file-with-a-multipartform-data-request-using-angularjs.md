# Uploading files with a multipart/form-data request using AngularJS

In this post I pretend to explain how to upload a file to a server using a multipart/form-data request in AngularJS. Last week, while I was trying to implement a functionality to load a CSV file into a GIS viewer I realized that this functionality was not supported by any native AngularJS directive. So I started to investigate which should be the best way of doing it.

What I exactly needed was sending to ESRI’s web service a CSV file so that it can transform the content of that file into a JSON object that I can manipulate it later inside my Web viewer. I took as starting point [this sample](https://developers.arcgis.com/javascript/3/jssamples/portal_addshapefile.html) I found in ArcGIS API for Javascript Web Site. As you can see, it is coded using Dojo framework, despite I have a big knowledge of that framework because I have been working with it during a long period of time I preferred to migrate it to AngularJS in order to keep coherence in my project and not mixing source code of different frameworks on a same app.

Now that you are aware of the situation, I am going to describe the two main parts I needed to implement in order to achieve my goal.

## Creating a directive

First of all, We have to built a directive with at least two controls. A file typed input and a button to trigger the event where the file is validated, and sent to the server. As you can see that directive’s template is pretty simple.

```html
<input id='inputFile' type='file' accept='.csv'/>
<button ng-click='uploadFile()'>Load Data</button>
```

After that, We make use of the `element` object passed as an argument inside the link function available on directives to get input control and its content:

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

## Doing the request

Once the file is ready to being send, the following step is building the request. To emulate a form HTML control we create a `FormData` object, appending to it all the params needed to perform the request. Those params depends on what kind of information expects the server receiving from our web site. In my case, I added the following parameters:

```javascript
var fd = new FormData();
fd.append('file', file);
fd.append('filetype', 'csv');
fd.append('publishParameters', getRequestParams());
fd.append('f', 'json');
```

Finally, we arrive to the last and most important step. Doing the request. We are going to make use of the `$http` directive to perform a post request. It is important to override the default **Content-Type** header value to undefined. Doing that, we ensure that browser would be the responsible of setting the right type of request. In our case, multipart/form-data type request.

```javascript
$http.post('https://www.arcgis.com/sharing/rest/content/features/generate', fd, {
  transformRequest: angular.identity,
  headers: {'Content-Type': undefined}
}
).success(function(result) {
})
```

And that’s all!  If you want to see a complete sample of that solution take a look to the source code I posted in [JSFiddle](https://jsfiddle.net/iaguilarmartin/9gh4qsvq/)