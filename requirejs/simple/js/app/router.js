define(['jquery', 'backbone', 'app/eventaggregator',
	'app/views/simple', 
	'app/views/tree', 
	'app/views/about'], function ($, Backbone, eventaggregator, SimpleView, TreeView, AboutView) {
	
	"use strict";

	var simpleView = new SimpleView();
	var treeView = new TreeView();
	var aboutView = new AboutView();


	return Backbone.Router.extend({

		initialize: function () {
			eventaggregator.on('node:selected', function () {
				console.log('a node has been selected somewhere.');
			});
		},

		routes: {
			"": "home",
			"home": "home",
			"tree": "tree",
			"about": "about"
		},

		home: function () {
			simpleView.render();
		},

		tree: function () {
			treeView.render();
		},

		about: function () {
			aboutView.render();
		}
	});

});