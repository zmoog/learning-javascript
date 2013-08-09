requirejs.config({
	// By default load any module IDs from js/lib
	baseUrl: 'js/lib',
	// except, if the module ID starts with "app",
    // load it from the js/app directory. paths
    // config is relative to the baseUrl, and
    // never includes a ".js" extension since
    // the paths config could be for a directory.
	paths: {
		app: '../app',
		tpl: '../tpl'
	},

	shim: {
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'underscore': {
			exports: '_'
		}
	}
});

// Start the main app logic

requirejs(['jquery', 'backbone', 'app/router'], function ($, Backbone, Router) {
	var router = new Router();
	Backbone.history.start();
});