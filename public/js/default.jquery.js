/***************************************************************************************************
 *   default.jquery.js
 *
 *   This is a default javascript file.  
 *
 *   For this file, only global javascript functions allowed.
 *   If additional functions are required, those functions must be put
 *   into the proper module.
 *
 *   @copyright     2014 DARE 
 *                   
 *   @authors       Cindy Son, Technical Director <cindy.son@thisisdare.com>
 *                  Gabrielle Carson, Front-End Developer <gabrielle.carson@thisisdare.com>
 *                  Carolvie Ozar, Front-End Developer <carolvie.ozar@thisisdare.com>
 *  
 *   @since         June 9, 2014 
 *
 *   @category      Javascript
 *   @package       channels
 *   @subpackage    christmas-tree
 *
 * TABLE OF CONTENTS
 *
 * A - GLOBAL VARIABLES 
 * B - WINDOW LOAD
 * 	01 - resizeHandler()
 * 	02 - scrollHandler()
 * 	03 - fontLoader()
 * B - DOCUMENT READY
 *	01 - modeHandler()
 **************************************************************************************************/
jQuery.noConflict();

/* A - GLOBAL VARIABLES
***********************************************/
var colors = ["#FCEE43", "#F41414", "#31A9E0", "#35A31D", "#F4AC2E"],
	color,
	color_index,
	ornament;

/* B - WINDOW LOAD
 * when the complete page is fully loaded,
 * including all frames, objects and images.
 ***********************************************/
jQuery(window).load(function() {
	/* Font Loader */
	fontLoader();

	/* Using debounce and throttle
	 *	debouncedFn = jQuery.debounce(fn, timeout, [invokeAsap], [ctx]);
	 *	throttledFn = jQuery.throttle(fn, timeout, [ctx]);
	 */

	/* Resize */
	jQuery(window).resize( jQuery.throttle(resizeHandler, 300) );

	/* Scroll */
	jQuery(window).scroll( jQuery.throttle(scrollHandler, 300) );
});

/*
 * 01 - fontLoader() - load web fonts
 */
function fontLoader() {
	WebFontConfig = {
		google: { families: [ 'Poiret+One::latin', 'Playball::latin' ] }
	};

	(function() {
		var wf = document.createElement('script');
		wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
		wf.type = 'text/javascript';
		wf.async = 'true';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(wf, s);
	})();
}

/*
 * 02 - resizeHandler - handle scroll events
 */
function resizeHandler() {
	console.log('resizing');
}

/*
 * 03 - scrollHandler - handle scroll events
 */
function scrollHandler() {
	console.log('scrolling');
} 

/* C - DOCUMENT READY
 * when the HTML document is loaded and the DOM is ready,
 * even if all the graphics haven't loaded yet.
 ***********************************************/
jQuery(document).ready(function(){
	/* Prevent native touch activity like scrolling */
	jQuery("html, body").on("touchstart touchmove", function(e){
		if (!jQuery(e.target).is("a") ) { 
			e.preventDefault();
		}
	});

	initOrnament();
});

/*
 * 01 - initOrnament - randomly select ornament to show and place on the christmas tree
 */
function initOrnament() {
	var element,
		hammertime;

	/* Select random ornament to show on the box */
	ornament = jQuery(".js_xmas_ornament");
	setNewOrnament();

	/* Initialize ornament with swipe */
	/*
	element = document.getElementById("js_xmas_ornament_cont");
	hammertime = Hammer(element).on("swipeup", function(e) {
		e.preventDefault();
		//alert("swipe");
		placeOrnament(color);
	});
	*/

	/* Test for Desktop - inititalize with click */
	ornament.on("click", function() {
	   	placeOrnament(color);
	});
}

/*
 * 02 - setNewOrnament - Select random ornament to show on the box
 */
function setNewOrnament() {
	if (colors.length >= 1) {

		/* Assign color to ornament */
		color_index = getRand(colors.length - 1);
		color = colors[color_index];
		
		ornament.removeClass("bounceOutUp");

		ornament
			.css("background-color", color)
			.addClass("bounceInUp");
		
		var check = jQuery('#is_controller').text();
	
	    if ( check == 'no' ) {
		  ornament.hide();
		} 	
		
	}
}

/*
 * 03 - placeOrnament - handle adding ornament to christmas tree
 */
function placeOrnament(color) {
	
			ornament
				.removeClass("bounceInUp")
				.addClass("bounceOutUp");
          
			/* Remove the color that was selected from array */
			removeItem(colors, color_index);
		

		
	
	/* Get new color */
	setTimeout("setNewOrnament();", 800);
      
}


/*
 * 04 - rgb2hex - convert rgb format to a hex color
 */
function rgb2hex(rgb) {
	rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

/*
 * 05 - hex - convert rgb format to a hex color
 */
function hex(x) {
	var hexDigits = new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 
	return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}

/*
 * 06 - getRand - return random number from 0 - max
 */
function getRand(max) {
	return Math.floor(Math.random() * max);
}

/*
 * 07 - removeItem - remove item from an array
 */
function removeItem(arr, i) {
	arr.splice(i, 1);
}