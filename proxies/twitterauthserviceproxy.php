<?php
	
	include ('proxy.php');
	
	ini_set('display_errors',1); 
	error_reporting(E_ALL);
	
	$consumerKey = 'RE9a7f3NYXO7xTdWqSgrGg';
  	$consumerSecret = 'O7KQ8dOoyCcUQCOXGJ44WbBw1KM4Qxv0E3W5G9NUz4';
  	$bearerTokenCredentials = $consumerKey . ':' . $consumerSecret;
  	$base64TokenCredentials = base64_encode($bearerTokenCredentials);

	$authProxy = new proxy('https://api.twitter.com/oauth2/token/');
	$authProxy->headers = array(
		'Content-Type: application/x-www-form-urlencoded',
		'Authorization: Basic ' . $base64TokenCredentials,
	);

	$response = $authProxy->makeRequest();
	if (is_null($response)) $authProxy->debug(); else echo $response;

?>