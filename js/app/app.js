require(['map', 'api'], function (Map, API) {
<<<<<<< HEAD
	new Map().init();
	new API().init();
});
=======

	var config = {
			services : {},
			geoData : {
				latLng : null,
				placeName : null
			},
			location : {}
		},
		$services,
		$servicesList,
		$location,
		$loading,
		$restart;

	function locationSuccess(position) {
		var geoCoder = new google.maps.Geocoder();

		config.geoData.provided = true;
		config.geoData.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

		geoCoder.geocode({'location': config.geoData.latLng, 'region': 'en-gb'}, function (results, status) {
			console.dir(results);
			if (status === google.maps.GeocoderStatus.OK) {
				config.geoData.placeName = results[0].address_components[1].long_name;
				$location.addClass('pre-selected').val(results[0].address_components[1].long_name + ', ' + results[0].address_components[2].short_name).on('focus', function() {
					$(this).removeClass('pre-selected'); // Allows the user to override the geolocation provided by the browser
				});
				setTimeout(function() {
					hideLoader(hideGeoTip);
				}, 400);
			}
		});
	}

	function showControls() {
		setTimeout(function() {
			$('#controls').animate({'right':'35px'}, 1000,'easeOutBounce');
		}, 1300);
	}

	function hideControls() {
		setTimeout(function() {
			$('#controls').css({'right':'-310px'});
		}, 1000);
	}

	function showGeoTip() {
		$('#geo-tip').addClass('active');
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
	function checkForServices() {
		$servicesList.each(function() {
			config.services[this.id] = serviceRequired(this.id);
		});
	}

	function checkLocValue() {
		config.location.value = $location.val();
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
		$loading.fadeOut(650, function(){
			if (callback !== undefined) {
				callback();
			}
		});
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
			showLoader();
			// $('#rm-container').addClass('rm-open');
			// showRestart();
			setTimeout(function() {
				$('#rm-container').addClass('rm-open');
				hideLoader();
				showRestart();
				showControls();
			}, 1000);
			checkForServices();
			// If the user hasn't chosen to use the current location, get the entry they manually provided
			if (!config.geoData.provided) {
				checkLocValue();
			}
			console.log(config);
			//new Map.init(config);

		});

		$restart.on('click', function() {
			$('#rm-container').removeClass('rm-open');
			hideRestart();
			hideControls();
		});

		// If supported, insert geolocation button & tip into the search criteria 'field'
		if (Modernizr.geolocation) {
			$search.prepend(locateHTML);
			setTimeout(showGeoTip, 350);

			$('#locate-me').on('click', function() {
				// Prompt for Geo access to access co-ords
				showLoader();
				navigator.geolocation.getCurrentPosition(locationSuccess, locationFail, {timeout:2500});
			});
		}

		new Map().init();
		new API().init();
	});
});
>>>>>>> Added UI 'stuff'
