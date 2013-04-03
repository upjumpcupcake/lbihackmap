<?php

	ini_set('display_errors',1); 
	error_reporting(E_ALL);

	class proxy {
		
		public $postValues;
		public $methodType;
		public $serviceURL;
		public $headers;
		public $response = 'Not Set';

		public function __construct($url) {  
			$this->serviceURL = $url;
			$this->postValues = $_POST;
			
	    }

	    public function isCurlInstalled() {
		    if (in_array('curl', get_loaded_extensions())) {
		        return true;
		    } else{
		        return false;
		    }
		}

	    public function makeRequest(){

	    	if ($this->isCurlInstalled()) {
	    		$ch = curl_init();
		    	curl_setopt($ch, CURLOPT_URL, $this->serviceURL);
		    	curl_setopt($ch, CURLOPT_POST, 1);
		    	curl_setopt($ch, CURLOPT_TIMEOUT, 10);            
				curl_setopt($ch, CURLOPT_POSTFIELDS, $this->postValues);
				curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);       
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);               
				curl_setopt($ch, CURLOPT_HTTPHEADER, $this->headers);
				$this->response = curl_exec($ch);
				
				if ($this->response !== false) {
					return $this->response;
				} else {
					echo curl_error($ch);
				}
				
				curl_close($ch);

	    	} else {
	    		return 'Going to need to install Curl!';
	    	}
	    }
	}

	$authProxy = new proxy('https://api.twitter.com/oauth2/token/');
	$authProxy->methodType = 'POST';
	$authProxy->headers = array(
		'Content-Type: application/x-www-form-urlencoded',
		'Authorization: Basic UkU5YTdmM05ZWE83eFRkV3FTZ3JHZzpPN0tROGRPb3lDY1VRQ09YR0o0NFdiQncxS000UXh2MEUzVzVHOU5VejQ='
	);
	$response = $authProxy->makeRequest();
	//var_dump($response);
	
?>