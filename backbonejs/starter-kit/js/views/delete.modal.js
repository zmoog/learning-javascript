ibook.DeleteModalView = Backbone.View.extend({

	events: {
		'click [data-function="cancel-delete"]': 'hide',
		'click [data-function="confirm-delete"]': 'deleteSelected'
	},

	initialize: function() {
	},

	show: function(data) {
		this.render(data);
		this.$el.modal('show');
	},

	hide: function(data) {
		this.$el.modal('hide');
	},

	error: function(data) {
		this.$el.modal('hide');
		$('operation-modal-alert', this.$el).html('Oooops!');
	},

	deleteSelected: function(data) {
		ibook.eventAggregator.trigger('detail:confirm-delete');
	},

    render: function(data) {
        this.$el.html(this.template(data));
        return this;
    }
});