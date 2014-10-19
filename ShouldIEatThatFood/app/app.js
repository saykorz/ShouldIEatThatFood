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
            $("#drawer-button").css("visibility", "hidden");
            $("#appDrawer").css("visibility", "hidden");
            $("#view-title").css("visibility", "hidden");

        }

        return view;
    }

  
}(window));




