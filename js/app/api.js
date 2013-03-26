define(['twitter', 'foursquare'], function(){

	var apiInstance = (function() {

		var init = function(callback) {
			console.log('API Init!');
			
			//Initialise foursquare request
			getFoursquare.init();
			callback();
		
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