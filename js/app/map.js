define(['requireasync!https://maps.googleapis.com/maps/api/js?key=AIzaSyCZ4VOmMY7satBEH7wRhgWWGBhztulXE8g&sensor=false'], function(){

	var mapInstance = (function() {

		/* 	Instance Variables
		------------------------------------------------ */

		var googleMap;
		var geocoder;
		var mapsAPiKey = 'AIzaSyCZ4VOmMY7satBEH7wRhgWWGBhztulXE8g';

		var domElements = {
			mapContainer: document.getElementById('map'),
		}

		/* 	Methods
		------------------------------------------------ */

		var init = function(callback) {
			console.log('Map Init!');
			getUserLocation();
			callback();
		}

		var getUserLocation = function () {

		    var geolocationReceived = function(position) {
		    	locationReceived(position)
		    }

		    var geolocationFailed = function(error) {
		    	alert('Uh oh, Error');
		    }
		    var geolocationOptions = {
		      timeout: 5000
		    }
			
			if (Modernizr.geolocation){		
				navigator.geolocation.getCurrentPosition(geolocationReceived, geolocationFailed, geolocationOptions);
			} else {
				alert('Geolocation API unsupported here, handle error');
	 		}
		}

		var	locationReceived = function(pos) {
			var lati = pos.coords.latitude;
			var longi = pos.coords.longitude;
			var loc = {
				latitude: lati,
				longitude: longi
			}
			initMapAtLocation(loc);
		}
		
		var usePostcodeForMapLocation = function(pc) {
			
		}

		var	useDefaultForMapLocation = function() {
			
		}

		var initMapAtLocation = function(pos){
			
			console.log('Initialising Google Map at Location: ' + pos.latitude + ' ' + pos.longitude);
			
			geocoder = new google.maps.Geocoder();
			
			var mapOptions = {
				center: new google.maps.LatLng(pos.latitude, pos.longitude),
				zoom: 15,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			googleMap = new google.maps.Map(domElements.mapContainer, mapOptions);

			//debugger;

		};
		
		var triggerApiCalls = function(latitude, longditude){
			getFoursquare.update(latitude, longditude);
		}
		
		var codeAddress = function(){
			var location = $('#location').val();
			geocoder.geocode({'address': location}, function(results, status){
				if(status == google.maps.GeocoderStatus.OK){
					googleMap.setCenter(results[0].geometry.location);
					var marker = new google.maps.Marker({
						map: googleMap,
						position: results[0].geometry.location
					});
					
					var latitude = results[0].geometry.location.kb;
					var longditude = results[0].geometry.location.lb;
			
					triggerApiCalls(latitude, longditude);
					
				} else{
					console.log("Geocode was not successful for the following reason: " + status);
				}
			});
		}
		
		var bindMapEvents = function(){
			console.log('bind map events');
			$('#checkLocation button').on('click', function(){
				codeAddress();
			});
		};

		return {
			init: function(){
				init(bindMapEvents);
			}
		};

	});

	return mapInstance;

});