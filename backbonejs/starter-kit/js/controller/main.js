ibook.MainController = Puppet.Controller.extend({

	initialize: function() {
		ibook.eventAggregator.on('node:selected', this.nodeSelected);
	},

	nodeSelected: function(node) {

		ibook.detailView.renderLoading();

		setTimeout(function() {

			$.get('data/' + node.id + '.json', function(data) {


				// console.log('data', data);
				ibook.detailView.render(data);
			}); 

			
		}, 500);

	}

});

