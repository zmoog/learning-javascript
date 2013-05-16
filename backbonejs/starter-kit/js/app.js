var ibook = {

	views: {},

	models: {},

    loadTemplates: function(views, callback) {

        var deferreds = [];

        $.each(views, function(index, view) {
            if (ibook[view]) {
                deferreds.push($.get('tpl/' + view + '.html', function(data) {
                    ibook[view].prototype.template = _.template(data);
                }, 'html'));
            } else {
                alert(view + " not found");
            }
        });

        $.when.apply(null, deferreds).done(callback);
    }
};

ibook.Router = Backbone.Router.extend({

    routes: {
        "home": "home"
    },

    initialize: function() {},

    home: function() {

        //
        // Main views
        //
        ibook.treeView = new ibook.TreeView({el: $('#tree-container')});
        ibook.detailView = new ibook.DetailView({el: $('#detail-container')});
		
        //
        // Modal views
        //
        ibook.renameModalView = new ibook.RenameModalView({el: $('#operation-modal')});
        ibook.deleteModalView = new ibook.DeleteModalView({el: $('#operation-modal')});

        //
        // Support views
        //
        ibook.loadingView = new ibook.LoadingView();

        //
        // Render
        //
        ibook.treeView.render();
        ibook.detailView.render();
    }


});


$(document).on("ready", function () {
    ibook.loadTemplates(["LoadingView", "TreeView", "DetailView", "RenameModalView", "DeleteModalView"],
        function () {
            ibook.router = new ibook.Router();
            Backbone.history.start();

            //
            // Event Aggregator
            //
            ibook.eventAggregator = new Puppet.EventAggregator();

            //
            // Controllers
            //
            ibook.MainController = new ibook.MainController();
            ibook.renameController = new ibook.RenameController();
            ibook.deleteController = new ibook.DeleteController();

        });
});