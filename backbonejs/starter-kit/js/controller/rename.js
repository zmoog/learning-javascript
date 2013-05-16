ibook.RenameController = Puppet.Controller.extend({

	initialize: function() {
		ibook.eventAggregator.on('detail:start-rename', this.startRename);
		ibook.eventAggregator.on('detail:confirm-rename', this.confirmRename);
	},

	startRename: function() {
		var node = ibook.treeView.selected();
		ibook.renameModalView.show(node);
	},

	confirmRename: function(newName) {

		// var node = ibook.treeView.selected();
		// console.log('renaming node ' + node.id + ' with name ' + newName);

		// cmis.rename(options.id, options.newName, function(){
			ibook.treeView.rename(newName);
			ibook.renameModalView.hide();
		// }, function() {
			// ibook.renameModalView.error({text: 'Error'});
		// });
		
		console.log('renamed successfully to ' + newName)
	}

});

