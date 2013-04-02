define([], function(){
	
	getFoursquare = (function(){
		
		var getFoursquareJson = function(latitude, longditude, googleMap, mapObj){
			
			var limit = 20,
				url = 'https://api.foursquare.com/v2/venues/explore?ll=' + latitude + ',' + longditude + '&client_id=RQPBSUGGRSJH3GZQNABEV35JRFNT3WFK5LIKPNCWJHY2ZDON&client_secret=KCHKHT3BFOAMPFV4NWEQQDH302TI5NPFK02ELZJ5C3VBJZSW&v=20130326';
				
				$.getJSON(url, function(data){
					
					var getVenues = function(){
					
						var i,
							marker,
							infoWindow,
							venueArr = data.response.groups[0].items;
						
						//Do stuff with each venue
						for(i in venueArr){
							
							var currentLatitude = venueArr[i].venue.location.lat,
								currentLongditude = venueArr[i].venue.location.lng,
								currentLocation = new google.maps.LatLng(currentLatitude,currentLongditude),
								currentLocationTitle = venueArr[i].venue.location.name;
							
							marker = new google.maps.Marker({
								position: currentLocation,
								map: googleMap,
								title: currentLocationTitle
							});
							
							infoWindow = new google.maps.InfoWindow({
								content: 'test'
							});
							
							
							console.log(marker)
							google.maps.event.addListener(this.marker, 'click', function() {
								infoWindow.open(googleMap,this.marker);
							});
							
							i++;
						};
						
							
					};
					
					getVenues();
					
				});
				
		
		}
		
		return{
			init: function(){
				console.log('foursquare init');	
			}, 
			update: function(latitude, longditude, googleMap, mapObj){
				getFoursquareJson(latitude, longditude, googleMap, mapObj);
			}
		}
		
	})();
	
	return getFoursquare;

});