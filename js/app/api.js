define([], function(){

	var API = (function() {

		var FLICKR,
			FOURSQUARE,
			TWITTER,
			YOUTUBE;

		function init(services) {
			require(services, function() {
				$.each(arguments, function(i, module) {
					var moduleId = module.getModuleId();

					switch (moduleId) {
					case('flickr'):
						FLICKR = module;
						FLICKR.init();
						break;

					case('foursquare'):
						FOURSQUARE = module;
						break;

					case('twitter'):
						TWITTER = module;
						TWITTER.init();
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
		// var init = function(callback) {
		// 	console.log('API Init!');
		// 	initialiseTwitter();
		// 	getFoursquare.init();
		// 	callback();
		// }

		// var initialiseTwitter = function() {
		// 	new Twit().init();
		// }
		
		// var bindMapEvents = function(){
		// 	$('#checkLocation button').on('click', function(e){
		// 		e.preventDefault();
		// 		//getFoursquare.update();
		// 	});
		// };

		return {
			init: init
		};

	}());

	return API;

});