define(['requireasync!https://maps.googleapis.com/maps/api/js?key=AIzaSyCZ4VOmMY7satBEH7wRhgWWGBhztulXE8g&sensor=false'], function() {

	var MAP = (function() {

		var googleMap,
			mapObj = google.maps,
			geoCoder = new google.maps.Geocoder(),
			mapOptions = {
				center: new google.maps.LatLng(54.64841250231667, -3.4716796875),
				zoom: 3,
				disableDefaultUI: true,
				navigationControl: true,
				navigationControlOptions: { style: google.maps.NavigationControlStyle.ZOOM_PAN },
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

		/*
		* Load the initial map state using the default LatLng values
		*/
		function init(mapId, callback) {
			googleMap = new google.maps.Map(document.getElementById(mapId), mapOptions);
			// Check whether a callback function was supplied
			if (typeof callback === 'function') {
				mapObj.event.addListener(googleMap, 'tilesloaded', callback);
			}
		}

		function setMapLocation(settings, callback) {
			// Check whether a callback function was supplied
			if (typeof callback === 'function') {
				mapObj.event.addListener(googleMap, 'tilesloaded', callback);
			}

			if (settings.geoData.provided) {
				googleMap.setCenter(settings.geoData.latLng);
			} else {
				if (settings.location.provided) {
					console.log('location provide manually: ' + settings.location.value);
					geoCoder.geocode({'address': settings.location.value}, function(results, status){
						if (status == mapObj.GeocoderStatus.OK) {
							googleMap.setCenter(results[0].geometry.location);
						} else {
							console.log("Geocode was not successful for the following reason: " + status);
						}
					});
				}
			}
			googleMap.setZoom(10);
		}

		return {
			init	: init,
			update	: setMapLocation
		};

	}());

	return MAP;

	// var mapInstance = (function() {

	// /*  Instance Variables
	// 	------------------------------------------------ */

	// 	var googleMap;
	// 	var geocoder;
	// 	var mapsAPiKey = 'AIzaSyCZ4VOmMY7satBEH7wRhgWWGBhztulXE8g';

	// 	var domElements = {
	// 		mapContainer: document.getElementById('map'),
	// 	}

	// /*  Methods
	// ------------------------------------------------ */

	// 	var init = function(callback) {
	// 		console.log('Map Init!');
	// 		getUserLocation();
	// 		callback();
	// 	}

	// 	var getUserLocation = function () {
	// 	    var geolocationReceived = function(position) {
	// 	    	locationReceived(position)
	// 	    }
	// 	    var geolocationFailed = function(error) {
	// 	    	alert('Uh oh, Error');
	// 	    }
	// 	    var geolocationOptions = {
	// 	      timeout: 5000
	// 	    }			
	// 		if (Modernizr.geolocation){		
	// 			navigator.geolocation.getCurrentPosition(geolocationReceived, geolocationFailed, geolocationOptions);
	// 		} else {
	// 			alert('Geolocation API unsupported here, handle error');
	//  		}
	// 	}

	// 	var	locationReceived = function(pos) {
	// 		var lati = pos.coords.latitude;
	// 		var longi = pos.coords.longitude;
	// 		var loc = {
	// 			latitude: lati,
	// 			longitude: longi
	// 		}
	// 		initMapAtLocation(loc);
	// 	}
		
	// 	var usePostcodeForMapLocation = function(pc) {
			
	// 	}

	// 	var	useDefaultForMapLocation = function() {
			
	// 	}

	// 	var initMapAtLocation = function(pos){
			
	// 		console.log('Initialising Google Map at Location: ' + pos.latitude + ' ' + pos.longitude);
			
	// 		geocoder = new google.maps.Geocoder();
			
	// 		var mapOptions = {
	// 			center: new google.maps.LatLng(pos.latitude, pos.longitude),
	// 			zoom: 3,
	// 			mapTypeId: google.maps.MapTypeId.ROADMAP
	// 		};

	// 		googleMap = new google.maps.Map(domElements.mapContainer, mapOptions);

	// 		//debugger;

	// 	};
		
	// 	var triggerApiCalls = function(latitude, longditude, googleMap, mapObj){
		
	// 		getFoursquare.update(latitude, longditude, googleMap, mapObj);
	// 	}
		
	// 	var codeAddress = function(){
	// 		var mapObj = google.maps,
	// 			location = $('#location').val();
	// 		geocoder.geocode({'address': location}, function(results, status){
	// 			if(status == mapObj.GeocoderStatus.OK){
	// 				googleMap.setCenter(results[0].geometry.location);
	// 				var marker = new google.maps.Marker({
	// 					map: googleMap,
	// 					position: results[0].geometry.location
	// 				});
					
	// 				var latitude = results[0].geometry.location.jb;
	// 				var longditude = results[0].geometry.location.kb;
					
	// 				triggerApiCalls(latitude, longditude, googleMap, mapObj);
			
					
	// 			} else{
	// 				console.log("Geocode was not successful for the following reason: " + status);
	// 			}
	// 		});
	// 	}
		
	// 	var bindMapEvents = function(){
	// 		console.log('bind map events');
	// 		$('#checkLocation button').on('click', function(){
	// 			codeAddress();
	// 		});
	// 	};

	// 	return {
	// 		init: function(){
	// 			init(bindMapEvents);
	// 		}
	// 	};

	// });

	// return mapInstance;

});