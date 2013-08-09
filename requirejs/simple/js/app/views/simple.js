define(['jquery', 'backbone', 'underscore', 'text!tpl/simple.html'], function ($, Backbone, _, html) {
	
	var template = _.template(html);

	console.log('defining view SimpleView');


	return Backbone.View.extend({

		el: $('#content'),

		// initialize: function () {
		// 	// put some random crap here ...
		// 	console.log('initializing SimpleView');
		// },

		render: function () {
			this.$el.html(template());
			// console.log('rendering!')
			return this;
		}

	});

});