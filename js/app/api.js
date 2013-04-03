define(['twitter', 'foursquare'], function(Twit){

	var apiInstance = (function() {

		var init = function(callback) {
			console.log('API Init!');
			initialiseTwitter();
			getFoursquare.init();
			callback();
		}

		var initialiseTwitter = function() {
			new Twit().init();
		}
		
		var bindMapEvents = function(){
			$('#checkLocation button').on('click', function(e){
				e.preventDefault();
				//getFoursquare.update();
			});
		};

		return {
			init: function(){
				init(bindMapEvents);	
			}
		}

	});

	return apiInstance;

});