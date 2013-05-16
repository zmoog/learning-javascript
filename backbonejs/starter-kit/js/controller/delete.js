ibook.DeleteController = Puppet.Controller.extend({

	initialize: function() {
		ibook.eventAggregator.on('detail:start-delete', this.startDelete);
		ibook.eventAggregator.on('detail:confirm-delete', this.confirmDelete);
	},

	startDelete: function() {

		var node = ibook.treeView.selected();

		ibook.deleteModalView.show(node);
	},

	confirmDelete: function() {

		// var node = ibook.treeView.selected();

		// cmis.rename(options.id, options.newName, function(){
			ibook.treeView.deleteSelected();
			ibook.deleteModalView.hide();
		// }, function() {
			// ibook.deleteModalView.error({text: 'Error'});
		// });
		
		console.log('deleted successfully')
	}

});

