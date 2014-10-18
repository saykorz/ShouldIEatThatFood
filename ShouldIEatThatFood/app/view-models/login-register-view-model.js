(function (global) {
   
    var persiter = window.persisters.get();

    var viewModel = kendo.observable({
        loginEmail: "admin@example.bg",
        loginPass: "admin123#",
        login: function () {
            var that = this;
            
                var username = that.get("loginEmail"),
                password = that.get("password")
            
                persiter.users.login(username, password);
        },
        regMail: "",
        register: function () {

        }

    });

    app.loginModel = viewModel;
})(window);