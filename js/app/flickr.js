define([], function(){

	FLICKR = (function() {

		/*********************************
		settings argument is an object, eg:
			var settings = {
				provider	: 0,
				apiKey		: '634562c3512132b584e66ff22d4c5288',
				userID		: '39569477@N05',
				photoSize	: 'm'
			};
		*********************************/

		var moduleId = 'flickr',
			flickrPrefix = 'http://api.flickr.com/services/rest/?&method=',
			flickrResponseSuffix = '&format=json&jsoncallback=?',
			photoCollection = [],
			totalPhotos,
			jsonResponse = 0;

		function getModuleId() {
			return moduleId;
		}

		function init() {
			console.log('FLICKR init called');
		}

		function getPhotos(settings) {
			// do something
		}

		return {
			getModuleId: getModuleId,
			getPhotos: getPhotos,
			init: init
		};

	}());

	return FLICKR;
});