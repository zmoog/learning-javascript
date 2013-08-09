ibook.OptionsView = Backbone.View.extend({

	events: {},

	initialize: function() {},

    render: function(data) {
        this.$el.html(this.template(data));
        return this;
    }
});