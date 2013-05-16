ibook.TreeView = Backbone.View.extend({

	initialize: function () {},

    onClick: function() {
        var node = $('#tree-container').tree('getSelected');
        ibook.eventAggregator.trigger('node:selected', node);
    },

    selected: function() {
        return $('#tree-container').tree('getSelected');
    },

    rename: function(newName) {
        var node = $('#tree-container').tree('getSelected');

        $('#tree-container').tree('update', {
            target: node.target, 
            text: newName
        }); 
    },

    deleteSelected: function() {

        var node = $('#tree-container').tree('getSelected');
        var parent = $('#tree-container').tree('getParent', node.target);

        $('#tree-container').tree('remove', node.target);

        if (parent) {
            $('#tree-container').tree('select', parent.target);
            ibook.eventAggregator.trigger('node:selected', parent);
        }
    },

    render: function() {
        
        this.$el.tree({
            url: 'data/tree.json', 
            method: 'get',
            onClick: this.onClick
        });
        return this;
    }

});
