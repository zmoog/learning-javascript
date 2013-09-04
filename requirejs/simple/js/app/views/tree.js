define(['module', 'jquery', 'backbone', 'underscore', 'jstree', 'app/eventaggregator', 'text!tpl/tree.html'], function (module, $, Backbone, _, jstree, eventaggregator, html) {
	
	var template = _.template(html);

	return Backbone.View.extend({

		el: $('#content'),

		initialize: function () {

			// Non sembra funzionare (almeno utilizzato in questo modo).
			// this.$el.jstree._themes = '../css/jstree/themes';

			this.config = {
				'jstree': {
					"plugins": [ "themes", "json_data", "ui", "checkbox", "types" ],
					'themes': { url: 'css/jstree/themes/default/style.css', dots: false },
					"core" : { animation: 0 },
					"ui": { select_multiple_modifier: false, select_prev_on_delete: false },
					'json_data': {
	            		"ajax" : {
	                		"url": module.config().cdnContextPath + '/node.json',
							"data": function(n) {
				        		return {
				            		// basePath: ibook.config.basePath,
				            		id: n.attr ? n.attr("id") : '',
				            		ts: new Date().getTime()
				        		};
				    		},
				    		correct_state: false
	            		}
					},
					checkbox: {
						'two_state': true
					},
					"types": {
						"types": {
							"folder": {
								"check_node": false,
								"uncheck_node": false
							}
						}
					}
				}
			}
		},

		render: function () {

			console.log('rendering tree');
			
			this.$el.html(template());

			this.$el.jstree(this.config.jstree).bind("select_node.jstree", function (e, data) {
				eventaggregator.trigger('node:selected', {text: 'hello'});
			});

			console.log('rendering completed.');

			return this;
		}

	});

});