define([], function(){

	var API = (function() {

		function init(services) {
			require(services, function() {
				console.log(arguments);
				$.each(arguments, function(i, module) {
console.log(module);
					module.init();
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