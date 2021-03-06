/// <reference path="../business/web-storage-objects.js" />

(function (global) {
    var persiter = window.persisters.get();
    var savedData = localStorage.getObject(window.pendingTags);
    if (savedData) {


        for (var i = 0; i < savedData.length; i++) {
            savedData[i].image = "data:image/jpg;base64, " + savedData[i].image;
            if (savedData[i].status === window.submitStatus.succses) {
                savedData[i].status = "re-check";
            }
            else {
                savedData[i].status = "re-check";
            }
        }
    }
    else {
        savedData = [];
    }
    var viewModel = kendo.observable({
        submits: savedData,

        checkImage: function (e) {

            var fileObj = $(e.currentTarget).closest("img").attr("src");


            var accessToken = localStorage.getItem(window.accessTokenKey);

            httpRequester.postImage("http://api.dev.shouldieatthatfood.com/api/Analize/Upload", fileObj,
                { Authorization: "Bearer " + accessToken })
                .then(function (data) {
                    // sucsess 
                    alert("succsessful", data);
                    // saveUploadImage(fileObj, window.submitStatus.succses);

                }, function (error) {

                    alert("Uplouding is not successful.");
                    // saveUploadImage(fileObj, window.submitStatus.error);

                });

        },

        refresh: function () {
            var savedData = localStorage.getObject(window.pendingTags);
            if (savedData) {
                for (var i = 0; i < savedData.length; i++) {
                    savedData[i].image = "data:image/jpg;base64, " + savedData[i].image;
                    if (savedData[i].status === window.submitStatus.succses) {
                        savedData[i].status = "re-check";
                    }
                    else {
                        savedData[i].status = "check";
                    }
                }
            }
            else {
                savedData = [];
            }
            this.set("submits", savedData);
            
        }

    });
    app.historyModel = viewModel;
})(window);