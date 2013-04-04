define([], function(){
  
  var twitterInstance = function() {

  	var init = function() {
  		console.log('Twitter init!');
  		obtainBearerToken();
  	};

  	var obtainBearerToken = function() {

      var proxyURL = 'proxies/twitterauthserviceproxy.php';

  		$.ajax({
  			type: 'POST',
  			url: proxyURL,
      	data: {
      		'grant_type': 'client_credentials'
      	},
  			error: function(xhr, status, error) {
  			},
  			success: function(response) {
          var r = JSON.parse(response);
          console.log('Twitter access token received! ->');
          console.log(r.access_token);
  			}
  		});

  };

	return {
  		init: init,
	}

  };

  return twitterInstance;

});