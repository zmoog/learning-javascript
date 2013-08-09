ibook.AlertView = Backbone.View.extend({

	events: {},

	initialize: function() {},

    render: function(data) {
    	data.title = data.title || 'Ooops!';
    	data.type = data.type || 'alert-warning';
        this.$el.html(this.template(data));
        return this;
    }
});