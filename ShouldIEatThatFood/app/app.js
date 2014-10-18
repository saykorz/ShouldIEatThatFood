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
            //navigator.camera.getPicture(cameraSuccess, cameraError);
        }
        else {
            view = 'app/views/login-register.html';
            $("#drawer-button").hide();
           // navigator.camera.getPicture(cameraSuccess, cameraError);
        }

        return view;
    }




    function cameraSuccess(imageData) {
        var user = {
            username: "admin@example.bg",
            password: "admin123#"
        };

        function gotPhoto(imageUri) {
            window.resolveLocalFileSystemURL(imageUri,
                function (fileEntry) {
                fileEntry.file(function (fileObj) {
                    httpRequester.postUrlEncoded("http://localhost:1297/token", user)
                    .then(function (token) {
                        httpRequester.postImage("http://localhost:1297/api/Analize/Upload", "data:image/jpeg;base64," + fileObj, { Authorization: token.access_token })
                            .then(function (data) {
                                var some = data;

                            });
                    });
                });
                }, cameraError);
           
        }

        var some = gotPhoto(imageData);

      
        
    }

    function cameraError() {
        
    }

  
}(window));



