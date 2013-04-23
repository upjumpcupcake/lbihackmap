define([], function(){

	FLICKR = (function() {

		/*********************************
		settings argument is an object, eg:
			flickr : {
				apiKey : '634562c3512132b584e66ff22d4c5288',
				userID : '39569477@N05',
				photoSize : 'm'
			};

		geoData argument is an object, eg:
			geoData : {
				latitude : 0,
				longitude : 0,
				latLng : null,
				placeName : null
			}
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

		function init(settings, geoData) {
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