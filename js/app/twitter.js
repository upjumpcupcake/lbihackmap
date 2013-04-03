define(['jquerybase64'], function(){
  
  var twitterInstance = function() {

  	var consumerKey = 'RE9a7f3NYXO7xTdWqSgrGg';
  	var consumerSecret = 'O7KQ8dOoyCcUQCOXGJ44WbBw1KM4Qxv0E3W5G9NUz4';
  	var requestTokenURL = 'https://api.twitter.com/oauth/request_token';
  	var authURL = 'https://api.twitter.com/oauth/authorize';
  	var accessTokenURL = 'https://api.twitter.com/oauth/access_token';

  	var bearerTokenCredentials = consumerKey + ':' + consumerSecret;

  	var base64EncodedBearerTokenCredentials = $.base64.encode(bearerTokenCredentials);

  	var accessToken;
  	var accessTokenSecret;

  	var init = function() {
  		console.log('Twitter init!');
  		obtainBearerToken();
  	};

  	var obtainBearerToken = function() {

      var authHeader = 'Basic ' + base64EncodedBearerTokenCredentials;
      var contentType = 'application/x-www-form-urlencoded';

      var proxyURL = 'proxies/twitterauthserviceproxy.php';

  		$.ajax({
  			type: 'POST',
  			url: proxyURL,
  			headers: {
          'Authorization': authHeader,
          'Content-Type': contentType
      	},
      	data: {
      		'grant_type': 'client_credentials'
      	},
  			error: function(xhr, status, error) {
  			},
  			success: function(response){
  			}
  		});

  };

	return {
  		init: init,
	}

  };

  return twitterInstance;

});