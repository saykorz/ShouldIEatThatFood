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

  global.app.onDeviceReady = function () {

        cameraApp = new cameraApp();
        cameraApp.run();
        cameraApp.capturePhoto().then(function (fileObj) {

            var accessToken = localStorage.getItem(window.accessTokenKey);

            httpRequester.postImage("http://api.dev.shouldieatthatfood.com/api/Analize/Upload", fileObj,
                { Authorization: "Bearer " + accessToken })
                .then(function (data) {
                    var some = data;

                });

        });

    }
   // document.addEventListener("deviceready", onDeviceReady, false);


   




   
    
    function cameraError(error) {
        
    }

  
}(window));




