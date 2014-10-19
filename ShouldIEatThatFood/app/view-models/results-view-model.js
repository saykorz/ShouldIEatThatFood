(function (global) {
    var groupsDataSource;
    var previousSources = [];
    var persiter = window.persisters.get();
    var viewModel = kendo.observable({
        isBackVisible: false,
        getBack: function () {
            previousSources.pop();
            var source = previousSources[previousSources.length - 1];
            groupsDataSource.data(source);
            if (previousSources.length === 1) {
                this.set('isBackVisible', false);
            }
        },
        init: function () {
            persiter.results.getResults()
                .then(function (data) {
                    initListView(data);
                });
        },

        itemClick: function (e) {
            var self = this;
            var $item = $(e.item).find('.item-wrapper');
            var id = $item.data('id');
            var desc = $item.data('desc');
            if (desc) {
                showDesc(desc, $item);
            }
            else {
                persiter.results.getResults(id)
                    .then(function (data) {
                        refreshListViewData(data);
                        debugger;
                        self.set('isBackVisible', true);
                    });
            }
        }
    });

    var fixData = function (data) {
        $.each(data, function (index, item) {
            if (!item.Description) {
                item.Description = '';
            }
        });
    }

    var showDesc = function (desc, $item) {
        $item.find('a').hide();
        var data = [{
            "Name": desc,
            "Description": '',
            "Id": ''
        }];
        previousSources.push(data)
        groupsDataSource.data(data);
    };

    var refreshListViewData = function (newData) {
        var items;

        if (newData.Items && newData.Items.length > 0) {
            fixData(newData.Items);
            items = newData.Items;
        }
        else if (newData.Categories && newData.Categories.length > 0) {
            fixData(newData.Categories);
            items = newData.Categories;
        }

        previousSources.push(items)
        groupsDataSource.data(items);
    };

    var initListView = function (data) {
        fixData(data);
        previousSources.push(data);
        groupsDataSource = new kendo.data.DataSource({
            data: data
        });
        var $listView = $('#group-list-view');
        $listView.kendoMobileListView({
            dataSource: groupsDataSource,
            template: '<div class="item-wrapper" data-desc="#:Description#" data-id="#:Id#"> #:Name# <a data-role="detailbutton" data-style="detaildisclose"></a> </div>',
            click: function (e) {
                viewModel.itemClick(e)
            },
            style: 'inset'
        });
    }

   
    app.resultsModel = viewModel;
})(window);