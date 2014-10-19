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
                    showResults();
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
            savedImages.unshift(fileObj);
            if (savedImages.lenght > window.pendingTagsMaxCount) {
                savedImages.pop();
            }
            localStorage.setObject(window.pendingTags, { image: fileObj , status: status});
        }

        function showResults() {

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
                count: 2,
            }, "error");
            notification.show({
                count: 4,
            }, "warning");
            notification.show({
                count: 12,
            }, "success");

        }

    app.homeModel = viewModel;
})(window);