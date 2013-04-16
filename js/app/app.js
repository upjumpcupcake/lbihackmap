require(['map', 'api'], function (MAP, API) {

	var settings = {
			services : [],
			geoData : {
				latLng : null,
				placeName : null
			},
			location : {},
			mapId : 'map'
		},
		$services,
		$servicesList,
		$location,
		$loading,
		$restart;

	function locationSuccess(position) {
		var geoCoder = new google.maps.Geocoder();

		settings.geoData.provided = true;
		settings.geoData.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

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
				showControlsPanel();
			});
		}, 600);
	}

	function showControlsPanel() {
		$('#controls-wrapper').addClass('panel');
		
		// Grab the list of services from the splash panel and duplicate in the controls panel
		$services.find('ul').clone().appendTo('#controls-panel');

		setTimeout(function() {
			$('.controls-container').addClass('panel-flip');
		}, 800);
	}

	function showGeoTip() {
		$('#geo-tip').addClass('active');
		setTimeout(function() {
			// $('#services h2').addClass('active');
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
				settings.services.push(this.id);
			}
			//settings.services[this.id] = serviceRequired(this.id);
		});
		return settings.services;
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

		// Animate in the service tip
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

			setTimeout(function() {
				$('#rm-container').addClass('rm-open');
				showRestart();
				setTimeout(function() {
					API.init(getServicesRequired());
					MAP.update(settings, hideMapLoader);
				}, 1200);
			}, 300);

			// If the user hasn't chosen to use the current location, get the entry that was manually provided
			if (!settings.geoData.provided) {
				getProvidedLocation();
			}

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
					MAP.init(settings.mapId, hideLoader);
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
				MAP.init(settings.mapId, hideLoader);
			}, 450);
		}

	});
});