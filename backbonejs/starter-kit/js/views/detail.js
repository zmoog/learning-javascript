ibook.DetailView = Backbone.View.extend({

	events: {
		"click .rename": "startRename",
        "click .delete": "startDelete",
		"click .upload": "startUpload",
		"click .move": "startMove"
	},

	initialize: function() {},

    startRename: function() {
    	ibook.eventAggregator.trigger('detail:start-rename');
    },

    startDelete: function() {
        console.log('detail:start-delete')
        ibook.eventAggregator.trigger('detail:start-delete');
    },

    startUpload: function() {
        //console.log('detail:start-upload')
    	ibook.eventAggregator.trigger('detail:start-upload');
    },

    startMove: function() {
    	ibook.eventAggregator.trigger('detail:start-move');
    },

    renderLoading: function() {
        this.$el.html(ibook.loadingView.render().el);
    },

    render: function(data) {
        this.$el.html(this.template(data));
        return this;
    }
});
