$(document).ready(function(){
	initBackbone();
});

function initBackbone() {
	var ArtistsContainerViewTemplate = Backbone.View.extend({		
		el: '.js-artists',
		render: function(artistsCollection) {
			var self = this;
			self.$el.html('');						
			artistsCollection.each(function(model) {
		      var artist = new ArtistViewTemplate({
		        model: model
		      });
		      self.$el.append(artist.render().el);
		    });			
		    $('.artist h5').textDecapitator();			
		}		
	});

	var ArtistViewTemplate = Backbone.View.extend({
		render: function() {
	    	this.$el.html(this.template(this.model.attributes));
	    	return this;
	    },
		className : 'col-xs-12 col-sm-6 col-md-3',
		tagName : 'li',
		template : _.template($('#artist_thumbnail_template').html())
	});

	var ArtistModelTemplate = Backbone.Model.extend();
	var ArtistsCollectionList = Backbone.Collection.extend({
		model : ArtistModelTemplate,
		url : 'data/artists.json',
		parse: function (data) {		
	        return $.map(data[0].artists, function(el) { return el });
	    }
	});	

	var artistsCollection = new ArtistsCollectionList();
	artistsCollection.fetch({
		success : function() {
			var artistsContainerView = new ArtistsContainerViewTemplate();
			artistsContainerView.render(artistsCollection);
		}
	});
}