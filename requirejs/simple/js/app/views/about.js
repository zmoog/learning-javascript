define(['jquery', 'backbone', 'underscore', 'text!tpl/about.html'], function ($, Backbone, _, html) {
	
	var template = _.template(html);

	return Backbone.View.extend({

		el: $('#content'),

		render: function () {
			this.$el.html(template());
			return this;
		}

	});

});