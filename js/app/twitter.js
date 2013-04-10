define(['jquerybase64'], function(){
  
  var twitterInstance = function() {

   //  var accessToken;
   //  var base64AccessToken;

  	// var init = function() {
  	// 	console.log('Twitter init!');
  	// 	obtainBearerToken();
  	// };

  	// var obtainBearerToken = function() {
   //    var proxyURL = 'proxies/twitterauthserviceproxy.php';
  	// 	$.ajax({
  	// 		type: 'POST',
  	// 		url: proxyURL,
   //    	data: {
   //    		'grant_type': 'client_credentials'
   //    	},
  	// 		error: function(xhr, status, error) {
  	// 		},
  	// 		success: function(response) {
   //        var r = JSON.parse(response);
   //        accessToken = r.access_token;
   //        base64AccessToken = $.base64.encode(accessToken);
   //        getTweetsAtLocation(51.52111250000001, -0.0714644);
   //      }
  	// 	});
   //  };

   //  var hello = function() {

   //  };

   //  var getTweetsAtLocation = function(lat, lo) {
   //    console.log('Should be requesting tweets');

   //    var authHeader = 'Bearer ' + base64AccessToken;
   //    console.log(authHeader);

   //    var serviceURL = 'http://api.twitter.com/1.1/geo/reverse_geocode.json';
   //    $.ajax({
   //      type: 'GET',
   //      url: serviceURL,
   //      data: {
   //        'lat': lat,
   //        'long': lo,
   //      },
   //      dataType: 'jsonp',
   //      headers: {
   //        'Authorization': authHeader
   //      },
   //      error: function(xhr, status, error) {
   //      },
   //      success: function(response) {
   //      }
   //    });
   //  };

    

  	// return {
   //  	init: init,
  	// }

  };

  return twitterInstance;

});