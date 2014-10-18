/// <reference path="business/http-requester.js" />
/// <reference path="business/web-storage-objects.js" />

(function (global) {
    window.accessTokenKey = "ShouldIEatThatFoodToken";
    window.pendingTags = "ShouldIEatThatFoodPendingTags";
    window.pendingTagsMaxCount = 10;
    window.submitStatus = {};
    window.submitStatus.error = "error";
    window.submitStatus.succses = "succses";
    window.cameraApp = new cameraApp();
        

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

      window.cameraApp.run();
      window.cameraApp.capturePhoto().then(function (fileObj) {

            var accessToken = localStorage.getItem(window.accessTokenKey);

            httpRequester.postImage("http://api.dev.shouldieatthatfood.com/api/Analize/Upload", fileObj,
                { Authorization: "Bearer " + accessToken })
                .then(function (data) {
                    // sucsess 
                    alert("result", data);
                    saveUploadImage(fileObj, window.submitStatus.succses);

                }, function (error) {

                    alert("Uplouding is not successful, image will be saved in history for later.");
                    saveUploadImage(fileObj, window.submitStatus.error);
                   
                });

        });

    }
   // document.addEventListener("deviceready", onDeviceReady, false);
    
    function saveUploadImage(imageString, status) {
        var savedImages = localStorage.getObject(window.pendingTags);
        savedImages.unshift(fileObj);
        if (savedImages.lenght > window.pendingTagsMaxCount) {
            savedImages.pop();
        }
        localStorage.setObject(window.pendingTags, { image: fileObj , status: status});
    }

  
}(window));




