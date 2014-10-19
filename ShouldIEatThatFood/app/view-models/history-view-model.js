/// <reference path="../business/web-storage-objects.js" />

(function (global) {
    var persiter = window.persisters.get();
    var ss=localStorage.getObject(window.pendingTags);
    var viewModel = kendo.observable({
        submits: ss

    });
    app.historyModel = viewModel;
})(window);