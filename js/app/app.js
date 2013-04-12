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
				setTimeout(function() {
					hideLoader(hideGeoTip);
				}, 400);
			}
		});
	}

	function showMapLoader() {
		// setTimeout(function() {
		// 	$('#controls').animate({'right':'35px'}, 600,'easeOutBounce');
		// }, 1300);
		$('#controls-wrapper').fadeIn(400);
	}

	function hideMapLoader() {
		setTimeout(function() {
			$('#controls-loading').fadeOut(800, function() {
				//$('#controls-wrapper').fadeOut(800);
				$('#controls-wrapper').addClass('phil');
			});
		}, 1000);
	}

	// function hideMapLoader() {
	// 	setTimeout(function() {
	// 		$('#controls').css({'right':'-310px'});
	// 	}, 1000);
	// }

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
		}, 500);
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
	* jQuery easing methods
	*/
	jQuery.extend( jQuery.easing, {
		easeOutElastic: function (x, t, b, c, d) {
			var s=1.70158;var p=0;var a=c;
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
		},
		easeOutBounce: function (x, t, b, c, d) {
	        if ((t/=d) < (1/2.75)) {
	            return c*(7.5625*t*t) + b;
	        } else if (t < (2/2.75)) {
	            return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
	        } else if (t < (2.5/2.75)) {
	            return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
	        } else {
	            return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
	        }
	    }
	});

	/*
	* DOM Ready
	*/
	$(function() {
		var $main = $('#main'),
			$search = $main.find('#search'),
			$submit = $main.find('#submit'),
			locateHTML = '<p id="geo-tip">Click this to use your current location...</p><div id="locate-me"></div>';

		$('#services h2').addClass('active');
		// Kick off the initial map render
		MAP.init(settings.mapId, hideLoader);

		require(['twitter'], function (TWITTER) {
			console.log(TWITTER);
		});

		// Assign some vars
		$services = $main.find('#services');
		$servicesList = $services.find('li');
		$location = $main.find('#location');
		$restart = $('#restart');
		$loading = $('#loading');

		showLoader();

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
			}, 300);

			API.init(getServicesRequired());

			// If the user hasn't chosen to use the current location, get the entry that was manually provided
			if (!settings.geoData.provided) {
				getProvidedLocation();
			}
			MAP.update(settings, hideMapLoader);

		});

		$restart.on('click', function() {
			$('#rm-container').removeClass('rm-open');
			hideRestart();
			hideMapLoader();
		});

		// If supported, insert geolocation button & tip into the search criteria 'field'
		if (Modernizr.geolocation) {
			$search.prepend(locateHTML);
			setTimeout(showGeoTip, 850);

			$('#locate-me').on('click', function() {
				// Prompt for Geo access to access co-ords
				showLoader();
				navigator.geolocation.getCurrentPosition(locationSuccess, locationFail, {timeout:2500});
			});
		}

		//new API().init();
	});
});