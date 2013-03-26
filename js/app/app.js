require(['map', 'api'], function (Map, API) {
	
	$(function() {	
		var init = (function() {
			console.log('App init!');
			var app = {
				map: new Map().init(),
				api: new API().init()
			}
		})();
	});
	
});
