var httpRequester = (function () {

    function getJSON(serviceUrl, headers) {
        var promise = new RSVP.Promise(function (resolve, reject) {
            jQuery.ajax({
                url: serviceUrl,
                type: "GET",
                dataType: "json",
                headers: headers,
                success: function (data) {
                    resolve(data);
                },
                error: function (err) {
                    reject(err);
                }
            });
        });
        return promise;
    }

    function postJSON(serviceUrl, data, headers) {
        var promise = new RSVP.Promise(function (resolve, reject) {
            jQuery.ajax({
                url: serviceUrl,
                dataType: "json",
                headers: headers,
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function (data) {
                    resolve(data);
                },
                error: function (err) {
                    reject(err);
                }
            });
        });
        return promise;
    }

    function puJSON(serviceUrl, headers) {
        var promise = new RSVP.Promise(function (resolve, reject) {
            jQuery.ajax({
                url: serviceUrl,
                type: "PUT",
                dataType: "json",
                headers: headers,
                success: function (data) {
                    resolve(data);
                },
                error: function (err) {
                    reject(err);
                }
            });
        });
        return promise;
    }

    function postNotJSON(serviceUrl, data, headers) {
        var promise = new RSVP.Promise(function (resolve, reject) {
            jQuery.ajax({
                url: serviceUrl,
                dataType: "json",
                headers: headers,
                type: "POST",
                data: data,
                success: function (data) {
                    resolve(data);
                },
                error: function (err) {
                    reject(err);
                }
            });
        });
        return promise;
    }

    return {
        getJSON: getJSON,
        postJSON: postJSON,
        puJSON: puJSON,
        postNotJSON: postNotJSON
    }
}());