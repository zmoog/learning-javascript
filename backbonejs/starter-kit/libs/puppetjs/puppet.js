
(function(){

	// Initial Setup
	// -------------

	// Save a reference to the global object (`window` in the browser, `exports`
	// on the server).
	var root = this;

	// The top-level namespace. All public Puppet classes and modules will
	// be attached to this. Exported for both the browser and the server.
	var Puppet;
		if (typeof exports !== 'undefined') {
	Puppet = exports;
	} else {
		Puppet = root.Puppet = {};
	}

	Puppet.VERSION = '0.1.0';


	// Puppet.EventAggregator
	// ----------------------

	var EventAggregator = Puppet.EventAggregator = function() {};

	// Attach all inheritable methods to the Model prototype.
  	_.extend(EventAggregator.prototype, Backbone.Events, {

  	});

	// Puppet.Controller
	// -------------------

	var Controller = Puppet.Controller = function(options) {
		options || (options = {});
		this.initialize.apply(this, arguments);
	};

	_.extend(Controller.prototype, Backbone.Events, {

		initialize: function(){}

	});


	// Set up inheritance for the event aggregator, and controller.
	EventAggregator.extend = Controller.extend = Backbone.Model.extend


}).call(this);