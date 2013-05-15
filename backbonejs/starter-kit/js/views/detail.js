ibook.DetailView = Backbone.View.extend({

	events: {
		"click .rename": "rename",
		"click .delete": "deleteNode",
		"click .move": "move"
	},

	initialize: function() {},

    rename: function() {
    	ibook.eventAggregator.trigger('detail:rename', {id: '1', newName: 'node renamed'});
    },

    deleteNode: function() {
    	ibook.eventAggregator.trigger('detail:delete', {id: '1'});
    },

    move: function() {
    	ibook.eventAggregator.trigger('detail:move', {source: '1', target: '2'});
    },

    render: function(data) {
        this.$el.html(this.template(data));
        return this;
    }
});
