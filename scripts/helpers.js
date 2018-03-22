// submits to MTurk's servers if config.is_MTurk is set to true
// and the correct url is given in config.MTurk_server
var submitToMTurk = function() {
	var form = $('#mturk-submission-form');
	console.log(form.attr('action'));

	console.log('submits to mturk');
	form.submit();
};


// parses the url to get thr assignment_id and worker_id
var getHITData = function() {
	var url = window.location.href;
	var qArray = url.split('?');
	qArray = qArray[1].split('&');
	var HITData = {};

	for (var i=0; i<qArray.length; i++) {
		HITData[qArray[i].split('=')[0]] = qArray[i].split('=')[1];
	}

	console.log(HITData);

	return HITData;
};
