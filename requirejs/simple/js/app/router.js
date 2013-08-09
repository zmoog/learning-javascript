define(['jquery', 'backbone', 'app/views/simple', 'app/views/about'], function ($, Backbone, SimpleView, AboutView) {
	
	"use strict";

	var simpleView = new SimpleView();
	var aboutView = new AboutView();


	return Backbone.Router.extend({

		routes: {
			"": "home",
			"home": "home",
			"about": "about"
		},

		home: function () {
			simpleView.render();
		},

		about: function () {
			aboutView.render();
		}
	});

});