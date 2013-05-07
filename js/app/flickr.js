define(['flickr.photo'], function(Photo) {

	var FLICKR = (function() {

		/*********************************
		settings = {
			services : {
				required : [],
				flickr : {
					apiKey : '5579814a804136a05490e63c4a0798ce',
					photoSize		: '',
					photoThumbSize	: 't',
					photosToShow	: 60,
					searchRadius	: 5,
					radiusUnits		: 'km'
				},
			},
			geoData : {
				latitude : 0,
				longitude : 0,
				latLng : null,
				placeName : null,
				resultsZoomLevel : 15
			},
			location : {},
			map : {
				domElement : 'map',
				instance : null
			}

		}
		*********************************/

		var moduleId = 'flickr',
			flickrPrefix = 'http://api.flickr.com/services/rest/?method=',
			flickrMethods = {
				search : 'flickr.photos.search',
				info : 'flickr.photos.getInfo'
			},
			flickrResponseSuffix = '&format=json&jsoncallback=?',
			photoCollection = [],
			infoWindow = new google.maps.InfoWindow({
				content: "<div class='infowin'><h3 style='line-height:22px'>Hi there</h3></div>",
				maxWidth: 300
			}),
			photoMarker = 'img/dot.png',
			photoMarkerActive = 'img/dot_splat.png',
			rawPhotoData,
			totalPhotos,
			jsonResponse = 0,
			markerCollection = [],
			markerCurrent,
			map,
			callback;

		google.maps.event.addListener(infoWindow, 'closeclick', closeMarker);

		/*
		* Return the ID of the module
		*/
		function getModuleId() {
			return moduleId;
		}

		/*
		* Init. 'Nuff said.
		*/
		function init(settings) {
			// Check whether a callback function was supplied
			if (typeof settings.services.flickr.callback === 'function') {
				callback = settings.services.flickr.callback;
			}
			map = settings.map.instance; // Assign the map instance
			getAllPhotos(settings);
		}

		/*
		* Get the list of photos within specififed distance of the user's chosen location
		*/
		function getAllPhotos(settings) {
			var location =  settings.geoData.provided ? settings.geoData : settings.location,
				flickr = settings.services.flickr,
				url = flickrPrefix + flickrMethods.search + '&api_key=' + flickr.apiKey + '&per_page=' + flickr.photosToShow + '&has_geo=&radius=' + flickr.searchRadius + '&radius_units=' + flickr.radiusUnits + '&lat=' + location.latitude + '&lon=' + location.longitude + flickrResponseSuffix;

			$.getJSON(url, function(rawPhotos) {
				console.log(rawPhotos);
				rawPhotoData = rawPhotos;

				if (rawPhotoData.photos) {
					totalPhotos = rawPhotoData.photos.photo.length;
					$.each(rawPhotoData.photos.photo, function(i, photo) {
						getPhotoInfo(i, photo.id, settings);
					});
				} else {
					console.log('There are no photos for this location');
				}
			});

			// wait for JSON to finish
			checkJSONReady();
		}

		/*
		* Get the info for a specific photo
		*/
		function getPhotoInfo(i, photoID, settings) {
			var flickr = settings.services.flickr,
				url = flickrPrefix + flickrMethods.info + '&api_key=' + flickr.apiKey + '&photo_id=' + photoID + flickrResponseSuffix;

			$.getJSON(url, function(info) {
				rawPhotoData.photos.photo[i].info = info;
				photoCollection[i] = new Photo(rawPhotoData.photos.photo[i]);

				// keep track of json response iteration
				jsonResponse++;
			});

		}

		/*
		* Poll the photo count to heck whether all the JSON has returned
		*/
		function checkJSONReady() {
			console.log('totalPhotos: ' + totalPhotos + 'jsonResponse: ' + jsonResponse);
			if (totalPhotos == jsonResponse) { // <--- this is very sketchy, type coercion. Fix this later. FLICKR.isReady..?
				console.log('drop markers');
				drawMarkers(photoCollection);
				callback();
			} else {
				console.log('checkJSON');
				setTimeout(checkJSONReady, 500);
			}
		}

		/*
		* Create a marker instance for each photo object in the photos array
		*/
		function drawMarkers(photos) {
			$.each(photos, function(i, photo) {
				console.log(photo);
				photo.latLng = new google.maps.LatLng(photo.latitude, photo.longitude);

				// create a marker for each photo
				markerCollection[i] = new google.maps.Marker({
					position: photo.latLng,
					map: map,
					title: photo.title,
					icon: photoMarker
				});

				// set the marker's animation type
				markerCollection[i].setAnimation(google.maps.Animation.DROP);

				// set the click event
				google.maps.event.addListener(markerCollection[i], 'click', function(e) {
					markerClickHandler(photo, this);
				});

			});
		}

		/*
		* Set the marker click action and infowindow content
		*/
		function markerClickHandler(photo, currentMarker) {
			if (markerCurrent !== undefined) {
				markerCurrent.setIcon(photoMarker);
			}
			currentMarker.setIcon(photoMarkerActive);
			markerCurrent = currentMarker;
			infoWindow.setContent('<div class="infowin"><h3>Description: ' + photo.title + '</h3><h4>Taken by <a href="http://www.flickr.com/photos/' + photo.raw.info.photo.owner.username + '" target="_blank">' + photo.raw.info.photo.owner.username + '</a> on ' + photo.taken + '</h4>' + '<a href="' + photo.raw.info.photo.urls.url[0]._content + '" target="_blank"><img src="' + photo.url + '" /></a></div>');
			infoWindow.open(map, currentMarker);
		}

		/*
		* Change the marker icon back to 'off'
		*/
		function closeMarker() {
			console.log('called closeMarker');
			markerCurrent.setIcon(photoMarker);
		}

		return {
			init : init,
			getModuleId : getModuleId
		};

	}());

	return FLICKR;
});