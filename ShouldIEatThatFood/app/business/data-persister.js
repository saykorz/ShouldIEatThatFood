window.persisters = (function () {

    var DataPersister = Class.create({
        init: function () {
            this.apiUrl = "http://api.dev.shouldieatthatfood.com/";
            this.users = new UserPersister(this.apiUrl);
        }
    });

    var UserPersister = Class.create({
        init: function (url) {
            this.url = url;
        },

        login: function (email, password) {
            var user = {
                grant_type: "password",
                username: email,
                password: password
            };

            return httpRequester.postUrlEncoded(this.url + "token", user);
        },

        register: function (email) {
            var model = {
                Email: email
            };
            return httpRequester.postJSON(this.url + "api/account/register", model);
        }
    })

    return {
        get: function () {
            return new DataPersister();
        }
    }
}());