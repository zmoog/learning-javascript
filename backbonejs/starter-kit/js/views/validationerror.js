ibook.ValidationErrorView = Backbone.View.extend({

	events: {},

	initialize: function() {},

    render: function(errors) {
    	errors.title = errors.title || 'Ooops!';
    	errors.type = errors.type || 'alert-warning';
        this.$el.html(this.template(errors));
        return this;
    }
});