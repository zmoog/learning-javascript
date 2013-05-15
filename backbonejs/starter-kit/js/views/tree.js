ibook.TreeView = Backbone.View.extend({

	initialize: function () {
    },

    render: function() {
        
        // this.$el.html(this.template());

        $(this.$el).tree({
            url: 'data/tree.json', 
            method: 'get',
            onClick: this.onClick
        });
        return this;
    },


    onClick: function() {

    	var node = $('#tree-container').tree('getSelected');

    	console.log(node);

    	ibook.eventAggregator.trigger('node:selected', node);
    },


	rename: function(id, newName) {

		var node = $('#tree-container').tree('getSelected');

    	console.log('node', node);

		$('#tree-container').tree('update', {
			target: node.target, 
			text: 'new name'
		});	
	}

});
