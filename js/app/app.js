require(['map', 'api'], function (MAP, API) {

	var settings = {
			services : {
				required : [],
				flickr : {
					apiKey : '634562c3512132b584e66ff22d4c5288',
					userID : '39569477@N05',
					photoSize : 'm'
				},
				twitter : {},
				foursquare : {
					clientId : 'RQPBSUGGRSJH3GZQNABEV35JRFNT3WFK5LIKPNCWJHY2ZDON',
					clientSecret : 'KCHKHT3BFOAMPFV4NWEQQDH302TI5NPFK02ELZJ5C3VBJZSW&v=20130326'
				},
				youtube : {}
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

		},
		$services,
		$servicesList,
		$location,
		$loading,
		$restart;

	function locationSuccess(position) {
		var geoCoder = new google.maps.Geocoder();

		settings.geoData.provided = true;
		settings.geoData.latitude = position.coords.latitude;
		settings.geoData.longitude = position.coords.longitude;
		settings.geoData.latLng = new google.maps.LatLng(settings.geoData.latitude, settings.geoData.longitude);

		geoCoder.geocode({'location': settings.geoData.latLng, 'region': 'en-gb'}, function (results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				settings.geoData.placeName = results[0].address_components[1].long_name;
				$location.addClass('pre-selected').val(results[0].address_components[1].long_name + ', ' + results[0].address_components[2].short_name).on('focus', function() {
					$(this).removeClass('pre-selected'); // If the user overrides the geolocation provided by the browser, set the styling appropriately
					settings.geoData.provided = false;
				});
					hideLoader(hideGeoTip);
			}
		});
	}

	function showMapLoader() {
		$('#controls-wrapper').fadeIn(400);
	}

	function hideMapLoader() {
		setTimeout(function() {
			$('#controls-loading').fadeOut(800, function() {
				showControls();
				addServicesToControls();
			});
		}, 600);
	}

	/*
	* Allow a min of 0.8s for the controls wrapper to morph into 
	* it's final shape & position, then flip the controls panel into view
	*/
	function showControls() {
		$('#controls-wrapper').addClass('panel');
		setTimeout(function() {
			$('.controls-container').addClass('panel-flip');
		}, 800);
	}

	/*
	* Grab the list of services from the splash panel, remove ids and 
	* apply as classes, then drop into the controls panel
	*/
	function addServicesToControls() {
		var $servicesClone = $servicesList.clone();

		$servicesClone.each(function(i) {
			var name = this.id;
			$(this).removeAttr('id').attr('class', name);
		}).appendTo('#controls-panel').wrapAll('<ul />');
	}

	function showGeoTip() {
		$('#geo-tip').addClass('active');
		setTimeout(function() {
		}, 500);
	}

	function hideGeoTip() {
		$('#geo-tip').removeClass('active');
	}

	function locationFail() {
		console.log('Well, that\'s torn it.');
	}

	/*
	* Attach event handlers for the services icons
	*/
	function attachServiceHandlers() {
		$servicesList.on('click', function() {
			$(this).toggleClass('exclude');
		});
	}

	/*
	* Search the services element for items
	*/
	function getServicesRequired() {
		$servicesList.each(function() {
			if (serviceRequired(this.id)) {
				settings.services.required.push(this.id);
			}
		});
		return settings.services.required;
	}

	function getProvidedLocation() {
		settings.location.provided = true;
		settings.location.value = $location.val();
	}

	/*
	* Check whether the service is required
	*/
	function serviceRequired(element) {
		return $services.find('#' + element).hasClass('exclude') ? false : true;
	}

	/*
	* Start the loading animation
	*/
	function showLoader() {
		$loading.fadeIn();
	}

	/*
	* Stop the loading animation
	*/
	function hideLoader(callback) {
		setTimeout(function() {
			$loading.fadeOut(650, function() {
				if (callback !== undefined) {
					callback();
				}
			});
		}, 400);
	}

	/*
	* Show the restart button
	*/
	function showRestart() {
		$restart.delay(1000).animate({'top':'8px'});
	}

	/*
	* Hide the restart button
	*/
	function hideRestart() {
		$restart.delay(1000).animate({'top':'-22px'});
	}

	/*
	* DOM Ready
	*/
	$(function() {
		var $main = $('#main'),
			$search = $main.find('#search'),
			$submit = $main.find('#submit'),
			locateHTML = '<p id="geo-tip">Click this to use your current location...</p><div id="locate-me"></div>';

		// Animate the service tip
		$('#services h2').addClass('active');

		// Assign some vars
		$services = $main.find('#services');
		$servicesList = $services.find('li');
		$location = $main.find('#location');
		$restart = $('#restart');
		$loading = $('#loading');

		// Empty out any previous values
		$location.val('');

		// Wire up services icons' handlers
		attachServiceHandlers();

		// Attach 'Go' button handler
		$submit.on('click', function() {
			showMapLoader();

			// If the user hasn't chosen to use the current location, get the entry that was manually provided
			if (!settings.geoData.provided) {
				getProvidedLocation();
			}

			setTimeout(function() {
				$('#rm-container').addClass('rm-open');
				showRestart();
				setTimeout(function() {
					API.init(getServicesRequired(), settings);
					MAP.update(settings, hideMapLoader);
				}, 1200);
			}, 300);
		});

		$restart.on('click', function() {
			$('#rm-container').removeClass('rm-open');
			hideRestart();
			hideMapLoader();
		});

		// If supported, insert geolocation button & tip into the search criteria 'field'
		if (Modernizr.geolocation) {
			showLoader();

			$search.prepend(locateHTML);
			// Introduce a slight pause before we show the tip
			setTimeout(function() {
				showGeoTip();
				// Animating the tip and drawing the map together is killing the browser. Stagger instead.
				setTimeout(function() {
					// Kick off the initial map render
					settings.map.instance = MAP.init(settings.map.domElement, hideLoader);
				}, 1000);
			}, 850);

			$('#locate-me').on('click', function() {
				// Prompt for Geo access to get co-ords
				showLoader();
				navigator.geolocation.getCurrentPosition(locationSuccess, locationFail, {timeout:2500});
			});
		} else {
			// No geolocation so just show the map
			setTimeout(function() {
				// Kick off the initial map render
				settings.map.instance = MAP.init(settings.map.domElement, hideLoader);
			}, 450);
		}

	});
});