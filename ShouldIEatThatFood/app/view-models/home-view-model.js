(function (global) {

    var persiter = window.persisters.get();
    var viewModel = kendo.observable({
        badIngredients: 0,
        goodIngredients: 0,
        warningIngredients: 0,
        takePhoto: function () {

        }
    });



    app.loginModel = viewModel;
})(window);