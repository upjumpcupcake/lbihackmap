define([], function(){

	var API = (function() {

		var FLICKR,
			FOURSQUARE,
			TWITTER,
			YOUTUBE;

		function init(services, settings) {
			require(services, function() {
				$.each(arguments, function(i, module) {
					var moduleId = module.getModuleId();

					switch (moduleId) {
					case('flickr'):
						FLICKR = module;
						FLICKR.init(settings.services.flickr, settings.geoData);
						break;

					case('foursquare'):
						FOURSQUARE = module;
						//FOURSQUARE.update(settings.geoData, settings.services.foursquare, settings.map.instance);
						break;

					case('twitter'):
						TWITTER = module;
						TWITTER.init(settings.services.twitter);
						break;

					case('youtube'):
						YOUTUBE = module;
						break;
						
					default:
						console.log('Switch statement default called. No modules found?');
					}
				});
			});
		}

		return {
			init: init
		};

	}());

	return API;

});