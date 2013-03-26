define([], function(){
	
	getFoursquare = (function(){
		
		var getFoursquareJson = function(latitude, longditude){
			
			var limit = 20,
				url = 'https://api.foursquare.com/v2/venues/explore?ll=' + latitude + ',' + longditude + '&client_id=RQPBSUGGRSJH3GZQNABEV35JRFNT3WFK5LIKPNCWJHY2ZDON&client_secret=KCHKHT3BFOAMPFV4NWEQQDH302TI5NPFK02ELZJ5C3VBJZSW&v=20130326';
				
				$.getJSON(url, function(data){
					console.log(data);
				});
		
		}
		
		return{
			init: function(){
				console.log('foursquare init');	
			}, 
			update: function(latitude, longditude){
				console.log('foursquare update');
				getFoursquareJson(latitude, longditude);
			}
		}
		
	})();
	
	return getFoursquare;

});