(function (global) {

    var persiter = window.persisters.get();
    var viewModel = kendo.observable({
        takePhoto: takePhoto,
        isImageVisible: false,
        imageSrc: ""
    });

    function takePhoto() {
        var that = this;

        global.app.application.showLoading();

        window.cameraApp.run();
        window.cameraApp.capturePhoto().then(function (fileObj) {

            var accessToken = localStorage.getItem(window.accessTokenKey);

            httpRequester.postImage("http://api.dev.shouldieatthatfood.com/api/Analize/Upload", fileObj,
                { Authorization: "Bearer " + accessToken })
                .then(function (data) {
                    // sucsess 
                    kendo.mobile.application.hideLoading();
                    showResults(data.allowed, data.warning, data.dangerous);
                    that.set("isImageVisible", true);
                    that.set("imageSrc", "data:image/png;base64, " + fileObj);
                    saveUploadImage(fileObj, window.submitStatus.succses);

                }, function (error) {
                    kendo.mobile.application.hideLoading();
                    alert("Uplouding is not successful, image will be saved in history for later.");
                    saveUploadImage(fileObj, window.submitStatus.error);
                   
               });

        });

    }
    
        function saveUploadImage(imageString, status) {
            var savedImages = localStorage.getObject(window.pendingTags);
            if (!savedImages) {
                savedImages = [];
            }
            savedImages.unshift({ image: imageString, status: status });
            if (savedImages.lenght > window.pendingTagsMaxCount) {
                savedImages.pop();
            }
            localStorage.setObject(window.pendingTags, savedImages);
        }

        function showResults(allowed, warning, dangerous) {

            $("#appendto").html("");

            var notification = $("#notification").kendoNotification({
                autoHideAfter: 0,
                templates: [{
                    type: "error",
                    template: $("#badTemplate").html()
                }, {
                    type: "warning",
                    template: $("#warningTemplate").html()
                }, {
                    type: "success",
                    template: $("#goodTemplate").html()
                }],
                appendTo: "#appendto"

            }).data("kendoNotification");

            notification.show({
                count: dangerous,
            }, "error");
            notification.show({
                count: warning,
            }, "warning");
            notification.show({
                count: allowed,
            }, "success");

        }

    app.homeModel = viewModel;
})(window);