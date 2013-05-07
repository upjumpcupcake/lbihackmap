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
			return googleMap; // return the map instance so we can pass it around to other modules as needed
		}

		function setMapLocation(settings, callback) {
			// Check whether a callback function was supplied
			if (typeof callback === 'function') {
				mapObj.event.addListenerOnce(googleMap, 'tilesloaded', callback);
			}

			if (settings.geoData.provided) { // User chose to geo locate themself
				userLocation = settings.geoData.latLng;
				googleMap.setCenter(userLocation);
				dropUserMarker(userLocation);
			} else {
				if (settings.location.provided) { // User provided a manual location
					geoCoder.geocode({'address': settings.location.value}, function(results, status){
						if (status == mapObj.GeocoderStatus.OK) {
							settings.location.latitude = results[0].geometry.location.lat();
							settings.location.longitude = results[0].geometry.location.lng();
							settings.location.latLng = results[0].geometry.location;
							userLocation = settings.location.latLng;
							googleMap.setCenter(userLocation);
							dropUserMarker(userLocation);
						} else {
							console.log("Geocode was not successful for the following reason: " + status);
						}
					});
				}
			}
			googleMap.setZoom(14);
		}

		function dropUserMarker(userLocation) {
			var userHomeicon = 'img/user_dot.png',
				userMarker,
				userInfowindow = new google.maps.InfoWindow({
					content: "<div class='infowin'><h3 style='line-height:22px'>You're here</h3></div>",
					maxWidth: 300
				});

			// Drop user marker
			userMarker = new google.maps.Marker({
				position: userLocation,
				map: googleMap,
				icon: userHomeicon
			});
			userMarker.setAnimation(google.maps.Animation.DROP);

			google.maps.event.addListener(userMarker, 'click', function() {
				userInfowindow.open(googleMap, userMarker);
			});
		}

		return {
			init	: init,
			update	: setMapLocation
		};

	}());

	return MAP;

});