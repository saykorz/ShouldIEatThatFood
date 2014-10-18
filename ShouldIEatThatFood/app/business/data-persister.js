window.persisters = (function () {

    var DataPersister = Class.create({
        init: function () {
            this.apiUrl = "http://localhost:1297/";
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

            return httpRequester.postNotJSON(this.url + "token", user);
        },

        register: function (email,password) {
            var user = {
                username: email,
                authCode: password
            }

            return httpRequester.postJSON(this.url + "api/register", user);
        }
    })

    return {
        get: function () {
            return new DataPersister();
        }
    }
}());