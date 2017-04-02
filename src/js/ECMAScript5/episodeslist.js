// ==========================================================
// Episodes list - switch btn

var episodeslist = (function(data) {

	var my = {};
	var v =  {};
	var _v = data;

	my.init = function () {
		
		require(['jquery'], function($) {
			v.switchBtn    = $('#switchBtn');
			v.episodesList = $('#episodesList');
			v.episodes = v.episodesList.find('ul li');
			v.addMoreBtn   = $('.episodesBlock .loadMore .btn');
			my.behavior();
		});

	},

	my.behavior = function() { 

		v.switchBtn.click( function(){
			$(this).toggleClass( 'on', 'off' );
			if( v.episodesList.hasClass('episodesListRows') ){
				v.episodesList
					.removeClass('episodesListRows')
					.addClass('episodesListBoxes');
			} else {
				v.episodesList
					.removeClass('episodesListBoxes')
					.addClass('episodesListRows');
			}
		});

		v.addMoreBtn.click( function(){
			v.episodes
				.slice(0,2)
				.clone()
				.insertAfter("#episodesList ul li:last");
		});
	};
	
	return my;
		
}(app.config));

