define([], function(){

	var FLICKR = (function() {

		function init() {
			console.log('FLICKR init called');
		}

		return {
			init: init
		};

	}());

	return FLICKR;
});