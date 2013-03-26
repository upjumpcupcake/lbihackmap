define([], function(){
	
	getFoursquare = (function(){
		
		var getJson = function(){
			
			var latitude = '',
				longditude = '',
				url = 'https://api.foursquare.com/v2/venues/trending?ll=' + latitude + ',' + longditude + '&client_id=RQPBSUGGRSJH3GZQNABEV35JRFNT3WFK5LIKPNCWJHY2ZDON&client_secret=KCHKHT3BFOAMPFV4NWEQQDH302TI5NPFK02ELZJ5C3VBJZSW&v=20130326'	
			
		}
		
		return{
			init: function(){
				console.log('foursquare init');	
			}, 
			update: function(){
				console.log('forsquare update');
			}
		}
		
	})();
	
	return getFoursquare;

});