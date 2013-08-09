ibook.RenameModalView = Backbone.View.extend({

	events: {
		'click [data-function="cancel-rename"]': 'hide',
		'click [data-function="confirm-rename"]': 'rename'
	},

	initialize: function() {},

	show: function(data) {
		this.render(data);
		this.$el.modal('show');
	},

	hide: function(data) {
		this.$el.modal('hide');
	},

	error: function(options) {
		$('#operation-modal-alert', this.$el).html(ibook.alertView.render({message: options.reason, type: 'alert-error'}).el);
	},

	rename: function() {

		var newName = $('input[name="new-name"]', this.$el).val();
		
		ibook.eventAggregator.trigger('detail:confirm-rename', newName);

		// //var errors = Backbone.Validator.validate({name: newName}, this.validations);

		// console.log('errors', errors);

		// if (!errors) {
		// } else {
		// 	console.log(ibook.validationErrorView.render(errors).el);
		// }

	},

    render: function(data) {
        this.$el.html(this.template(data));
        $('input[name="new-name"]', this.$el).focus();
        return this;
    }
});