<?php
	
	class proxy {
		
		public $serviceURL;
		public $postString;
		public $headers;
		public $response;

		public function __construct($url) {  
			$this->serviceURL = $url;
			$this->postStringify($_POST);
	    }

	    private function postStringify($postArray) {
	    	$ps = '';
	    	foreach($postArray as $key => $value) { 
	    		$ps .= $key . '=' . $value . '&'; 
	    	}
			rtrim($ps, '&');
	    	$this->postString = $ps;    
	    }

	    private function isCurlInstalled() {
		    return (in_array('curl', get_loaded_extensions())) ? true : false;
		}

	    public function makeRequest() {
	    	if ($this->isCurlInstalled()) {
	    		$ch = curl_init();
		    	curl_setopt($ch, CURLOPT_URL, $this->serviceURL);
		    	curl_setopt($ch, CURLOPT_POST, 1);
		    	curl_setopt($ch, CURLOPT_TIMEOUT, 10);            
				curl_setopt($ch, CURLOPT_POSTFIELDS, $this->postString);
				curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
				curl_setopt($ch, CURLOPT_HTTPHEADER, $this->headers);
				$this->response = curl_exec($ch);
				if ($this->response === false) $this->response = curl_error($ch);
				curl_close($ch);
	    	} else {
	    		$this->response = 'Need to install Curl!';
	    	}

	    	return $this->response;

	    }

	    public function debug() {
	    	var_dump($this->response);
	    }

	}

?>