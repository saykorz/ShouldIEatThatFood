function cameraApp() { }

cameraApp.prototype = {
    _pictureSource: null,

    _destinationType: null,

    run: function () {
        var that = this;
        that._pictureSource = navigator.camera.PictureSourceType;
        that._destinationType = navigator.camera.DestinationType;
       
    },

    capturePhoto: function () {
        var that = this;
        var promise = new RSVP.Promise(function (resolve, reject) {
            // Take picture using device camera and retrieve image as base64-encoded string.
            navigator.camera.getPicture(function () {
                var imgString = that._onPhotoDataSuccess.apply(that, arguments);
                resolve(imgString);
            }, function (error) {
                reject(error);
            }, {
                quality: 50,
                destinationType: that._destinationType.DATA_URL
            });
        });
        return promise;
        
    },


    _onPhotoDataSuccess: function (imageData) {
        var some = imageData;
        return some;
    },

}