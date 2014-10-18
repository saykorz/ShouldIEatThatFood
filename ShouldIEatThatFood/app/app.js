/// <reference path="business/http-requester.js" />

(function (global) {
    window.accessTokenKey = "ShouldIEatThatFoodToken";

    var app;
    
    var app = global.app = global.app || {};;

    document.addEventListener('deviceready', function () {
        navigator.splashscreen.hide();

        app.application = new kendo.mobile.Application(document.body, {
            skin: 'flat',
            initial: getInitialView(),
            layout: "main"
        });

    }, false);

  function getInitialView() {
        //ToDo make it constant
       
        var accessToken = localStorage.getItem(window.accessTokenKey);
        var view;
      
        if (accessToken) {
            view = 'app/views/home.html';
           
          
        }
        else {
            view = 'app/views/login-register.html';
            $("#drawer-button").hide();
          
        }

        return view;
    }


   // document.addEventListener("deviceready", onDeviceReady, false);


    function onDeviceReady() {
        var user = {
            username: "admin@example.bg",
            password: "admin123#"
        };
        cameraApp = new cameraApp();
        cameraApp.run();
        cameraApp.capturePhoto().then(function (fileObj) {

           

            httpRequester.postUrlEncoded("http://api.dev.shouldieatthatfood.com/token", user)
            .then(function (token) {
                httpRequester.postImage("http://api.dev.shouldieatthatfood.com/api/Analize/Upload", fileObj, { Authorization: "Bearer " + token.access_token })
                .then(function (data) {
                         var some = data;

                 });

                });
        }, function error(e) {

        });
       
    }




   
    
    function cameraError(error) {
        
    }

  
}(window));



