define([], function(){

	YOUTUBE = (function(){

		/* ! instance variables
	    --------------------------*/
	    var moduleId = 'youtube',
	    	Icon = 'img/YouTube.png',
			key = "&key=AIzaSyACRs5gJevyMoVtp3U6wNGm00WzOLAgYcU";

	    var Latitude;
	    var Longitude;
	    var Map;
	    var Zoom;

	    /* ! methods
	    --------------------------*/

	    var init = function() {
	      console.log('Youtube Init');
	    }

	    var getModuleId = function() {
	      return moduleId;
	    }


	    var plotResultsAtLocation = function(lat, lo, googleMap, zoomLvl) {
	    	//zoomLvl is to calculate which results should be marked on map
		    Latitude = lat;
		    Longitude = lo;
		    Map = googleMap;
		    Zoom = zoomLvl;

		    initVids("");
	    }


	    function initVids(token) {
	    	//if token is an empty string the first page will be requested / returned

			var url = "https://www.googleapis.com/youtube/v3/search?part=id&type=video&order=date&maxResults=50";
			

			var link = url + key + "&pageToken=" + token + "";

			$.getJSON(link, function(data) {
				var myPageTK = data.nextPageToken;

				$.each(data.items, function(i,item) {
					var videoID = item.id.videoId;
					getVid(videoID);
				});
			   	
				if(myPageTK != undefined) {

					initVids(myPageTK);
				}
			});
		}

		function getVid(vidID) {
			var myUrl = "https://www.googleapis.com/youtube/v3/videos?part=id,snippet,contentDetails,recordingDetails,player,statistics,status,topicDetails";

			myUrl = myUrl + "&id=" + vidID + key;

			$.getJSON(myUrl, function(data) {

				$.each(data.items, function(i,item) {

					var emb = item.recordingDetails;

					if(emb != undefined) {
						if(emb.location != undefined) {

							if(inRange(emb.location.latitude, emb.location.longitude))
							{
								placeMarker(emb.location.latitude, emb.location.longitude, item.snippet.title, item.player.embedHtml);
							}
							
						}
						
					}
					
				});
			    	
			});
		}

		function inRange(lat, lon) {
			//this function will check if lat/lon is within the distance based on zoom level
			return true;
		}


		function placeMarker(lat, lon, vidTitle, player) {
			var myLatlng = new google.maps.LatLng(lat,lon);

			var marker = new google.maps.Marker({
              position: myLatlng,
              map: Map,
              title: vidTitle,
              icon: Icon
            });

            marker.info = new google.maps.InfoWindow({
              content: player,
              disableAutoPan: true
            });
            
            google.maps.event.addListener(marker, 'click', function() {
              this.info.open(Map, this);
            });

		}



	    return {
      		init: init,
      		getModuleId: getModuleId,
      		plotResultsAtLocation: plotResultsAtLocation
      	};

	})();
	
	return YOUTUBE;

});