ibook.UploadController = Puppet.Controller.extend({

	initialize: function() {
		ibook.eventAggregator.on('detail:start-upload', this.startUpload);
	},

	startUpload: function() {

		var node = ibook.treeView.selected();

		// console.log('handling upload under foler ', node);

		ibook.wizardView.render({
			objectId: node.id,
			cards: [
				'card-document-type', 
				'card-document-properties', 
				'card-file-upload', 
				'card-scanner-document-name',
				'document-creation-confirm'] // , 'document-creation-confirm'
		});
	}

});

