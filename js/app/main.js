require.config({

	paths: {

		jquery: 				'../lib/jquery-1.9.0.min',
		jqueryui: 				'../lib/jquery-ui-1.10.0.min',
		modernizr: 				'../lib/modernizr-2.6.2.min',
		underscore:				'../lib/underscore-min',
		handlebars: 			'../lib/handlebars',
		bootstrap: 				'../lib/bootstrap.min.',
		requireasync: 			'../lib/async.require',
		googlemaps: 			'https://maps.googleapis.com/maps/api/js?key=AIzaSyCZ4VOmMY7satBEH7wRhgWWGBhztulXE8g&sensor=false',

		app: 					'app',
		map: 					'map',
		api: 					'api',
		twitter: 				'twitter',

	},

	shim: {
    },

	deps: ['app', 'modernizr', 'jquery'],

});