(function () {
    var app;

    document.addEventListener('deviceready', function () {
        navigator.splashscreen.hide();

        app = new kendo.mobile.Application(document.body, {
            skin: 'flat',
            initial: getInitialView()
        });

    }, false);

    function getInitialView() {
        //ToDo make it constant
        var accessToken = localStorage.getItem("accessToken");
        var view;

        if (accessToken) {
            view = 'app/views/home.html';
        }
        else {
            view = 'app/views/login-register.html'
            //$("#drawer-button").hide();
        }

        return view;
    }

}());