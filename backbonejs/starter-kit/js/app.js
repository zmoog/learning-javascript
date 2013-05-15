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
        "home":                 "home"
    },

    initialize: function() {
    },

    home: function() {

        ibook.treeView = new ibook.TreeView({el: $('#tree-container')});

		ibook.detailView = new ibook.DetailView({el: $('#detail-container')});

        // $('#tree-container').html(ibook.treeView.render().el);
        ibook.treeView.render();
        ibook.detailView.render();

        //$('#detail-container').html(ibook.detailView.render({}).el);
        // console.log('home');
    },


});


$(document).on("ready", function () {
    ibook.loadTemplates(["TreeView", "DetailView"],
        function () {
            ibook.router = new ibook.Router();
            Backbone.history.start();

            ibook.eventAggregator = new Puppet.EventAggregator();

            // Event Aggregator 

            ibook.eventAggregator.on('node:selected', function(node) { 
                $.get('data/' + node.id + '.json', function(data) {
                    console.log('data', data);
                    ibook.detailView.render(data);
                }); 
            });

            ibook.eventAggregator.on('detail:rename', function(options) { 
                console.log('got rename', options);
                ibook.treeView.rename(options.id, options.newName);
            });

            ibook.eventAggregator.on('detail:delete', function(options) { 
                console.log('got delete', options);
            });

            ibook.eventAggregator.on('detail:move', function(options) { 
                console.log('got move', options);
            });
        });
});