ibook.RenameController = Puppet.Controller.extend({

	// validations: { 
	// 	name: {
	// 		required: true,
	// 		format: 'foldername'
	// 	}
	// },

	initialize: function() {
		ibook.eventAggregator.on('detail:start-rename', this.startRename);
		ibook.eventAggregator.on('detail:confirm-rename', this.confirmRename);
	},

	startRename: function() {
		var node = ibook.treeView.selected();
		ibook.renameModalView.show(node);
	},

	confirmRename: function(newName) {

		var errors = Backbone.Validator.validate(
			{'Nome': newName}, 
			{'Nome': {required: true, format: 'foldername'}});

		if (!errors) {

			// cmis.rename(options.id, options.newName, function(){
				ibook.treeView.rename(newName);
				ibook.renameModalView.hide();
			// }, function() {
				// ibook.renameModalView.error({text: 'Error'});
			// });
		
		} else {
			
			ibook.renameModalView.error({reason: errors['Nome'][0]});
		}

		console.log('renamed successfully to ' + newName)
	}

});

