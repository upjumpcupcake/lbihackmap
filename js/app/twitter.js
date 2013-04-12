define([], function() {

	var TWITTER = (function() {

		function init() {
			console.log('TWITTER init called');
		}

		return {
			init: init
		};

	}());

	return TWITTER;

});