ibook.RenameModalView = Backbone.View.extend({

	events: {
		'click [data-function="cancel-rename"]': 'hide',
		'click [data-function="confirm-rename"]': 'rename'
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

	rename: function(data) {
		var newName = $('input[name="new-name"]', this.$el).val();
		ibook.eventAggregator.trigger('detail:confirm-rename', newName);
	},

    render: function(data) {
        this.$el.html(this.template(data));
        $('input[name="new-name"]', this.$el).focus();
        return this;
    }
});