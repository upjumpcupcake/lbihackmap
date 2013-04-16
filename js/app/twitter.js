define([], function() {

	var TWITTER = (function() {

		var moduleId = 'twitter';

		function getModuleId() {
			return moduleId;
		}
		
		function init() {
			console.log('TWITTER init called');
		}

		return {
			init: init,
			getModuleId: getModuleId
		};

	}());

	return TWITTER;

});