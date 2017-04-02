// ==========================================================
// Mobile Menu 

var mobilemenu = (function(data) {

	var my = {};
	var v =  {};
	var _v = data;

	my.init = function () {

		require(['jquery'], function($) {
			v.mmBtn = $('.openMobileMenu');
			v.mmBlock = $('.mobilemenuBlock');
			v.mmMainItem = $('nav > ul > li > a');
			my.behavior();
		});

	},

	my.behavior = function() { 

		v.mmBtn.click( function(){
			$(this).toggleClass( 'on', 'off' );
			v.mmBlock.slideToggle( 200, 'swing' );
			window.scrollTo(0,0);
		});

		v.mmMainItem.click( function(){
			$(this)
				.parent().toggleClass( 'on', 'off' )
				.children('ul').slideToggle( 200, 'swing' );
		});

	};
	
	return my;
		
}(app.config));

