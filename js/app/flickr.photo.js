define([], function() {

	function Photo(rawPhoto) {

		// ensure that new has been used
		if (!(this instanceof Photo)) {
			return new Photo(rawPhoto);
		}

		// declare variables
		// var _formattedSize = getPhotoSize(settings.photoSize),
		// 	_thumbSize = getPhotoSize(settings.photoThumbSize);

		// define variables
		this.raw =			rawPhoto;
		this.title =		rawPhoto.info.photo.title._content							||	undefined;
		this.description =	rawPhoto.info.photo.description._content		||	undefined;
		this.taken =		rawPhoto.info.photo.dates.taken					||	undefined;
		this.latitude =		rawPhoto.info.photo.location.latitude;
		this.longitude =	rawPhoto.info.photo.location.longitude;
		this.url =			'http://farm' + rawPhoto.farm + '.staticflickr.com/' + rawPhoto.server + '/' + rawPhoto.id + '_' + rawPhoto.secret + '_m.jpg' || 'http://www.placeholder-image.com/image.jpg';
		this.urlThumb =		'http://farm' + rawPhoto.farm + '.staticflickr.com/' + rawPhoto.server + '/' + rawPhoto.id + '_' + rawPhoto.secret + '_t.jpg' || 'http://www.placeholder-image.com/image.jpg';

		return this;
	}

	Photo.prototype.identify = function() {
		console.log('Prototype function call: ' + this.description);
	};

	return Photo;

});