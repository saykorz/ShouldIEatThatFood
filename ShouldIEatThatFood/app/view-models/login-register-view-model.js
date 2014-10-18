(function (global) {

    var persiter = window.persisters.get();
    var viewModel = kendo.observable({
        loginEmail: "",
        loginPass: "",
        login: function () {
            var that = this;
            var loginValidator = $("#login-panel").kendoValidator({
                validateOnBlur: false
            }).data("kendoValidator");

            if (loginValidator.validate()) {
                
                var username = that.get("loginEmail"),
                password = that.get("loginPass")
                persiter.users.login(username, password)
                    .then(login, function (serverError) {
                        var errorResponse = JSON.parse(serverError.responseText);
                        that.set("error", errorResponse.error_description);
                    });

            } 
        },
        regMail: "",
        register: function () {
            var that = this;

            var registerValidator = $("#register-panel").kendoValidator({
                validateOnBlur: false
            }).data("kendoValidator");

            if (registerValidator.validate()) {

                var email = that.get("regMail");
                persiter.users.register(email)
                        .then(login, function (serverError) {
                            var errorResponse = JSON.parse(serverError.responseText);
                            that.set("error", errorResponse.error_description);
                        });
            }
        },
        error: ""

    });

    function error(serverError) {
        var errorResponse = JSON.parse(serverError.responseText);
        that.set("error", errorResponse.error_description);
    }

    function login(data) {
        localStorage.setItem(window.accessTokenKey, data.access_token);
        global.app.application.navigate("app/views/history.html");
        $("#drawer-button").show();
    }

    app.loginModel = viewModel;
})(window);