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
							currentLocationTitle,
							venueArr = data.response.groups[0].items;
							
						//Do stuff with each venue
						for(i in venueArr){
							
							var currentLatitude = venueArr[i].venue.location.lat,
								currentLongditude = venueArr[i].venue.location.lng,
								currentLocation = new google.maps.LatLng(currentLatitude,currentLongditude),
								currentLocationTitle = venueArr[i].venue.name,
								currentLocationLikes = venueArr[i].venue.likes.count,
								currentLocationRating = venueArr[i].venue.rating, 
								currentLocationUrl = venueArr[i].venue.url, 
								foursquareIcon = '../../img/foursquare-icon.png',
								infoContent = '<div><h2>' + currentLocationTitle + '</h2><p>' + currentLocationLikes + ' People like this</p><div class="rating"><p>Rating: ' + currentLocationRating + '/10</p><span class="rating-bar"></span></div><p>Url: <a href="currentLocationUrl">' + currentLocationUrl + '</a></p></div>';
								
								console.log(venueArr[i].venue);
							
							marker = new google.maps.Marker({
								position: currentLocation,
								map: googleMap,
								title: currentLocationTitle,
								icon: foursquareIcon
							});
														
							marker.info = new google.maps.InfoWindow({
								content: infoContent
							});
							
							google.maps.event.addListener(marker, 'click', function() {
								this.info.open(googleMap, this);
							});
							
							i++;
						};
						
							
					};
					
					getVenues();
					
				});
				
		
		}
		
		return{
			init: function(){
				
			}, 
			update: function(latitude, longditude, googleMap, mapObj){
				getFoursquareJson(latitude, longditude, googleMap, mapObj);
			}
		}
		
	})();
	
	return getFoursquare;

});