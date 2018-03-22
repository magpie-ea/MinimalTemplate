// attaches exp.findNextView() function to all the buttons that bring
// the next view when clicked. Which view should be shown is determined by 
// the conditionals in exp.findNextView() which is located in main.js
// if the button has id='send-data' (the button in subj info template has it),
// the data is collected sent before exp.findNextView(); is called
var showNextView = function() {
    var nexts = $('.next-view');
    for (var i=0; i<nexts.length; i++){
	if (nexts[i].id === 'sends-data') {
	    nexts[i].addEventListener('click', function() {
		for (var i=0; i<exp.data.out.length; i++) {
		    exp.data.out[i].age = $('#age').val(),
		    exp.data.out[i].gender = $('#gender').val(),
		    exp.data.out[i].education = $('#education').val(),
		    exp.data.out[i].languages = $('#languages').val(),
		    exp.data.out[i].comments = $('#comments').val().trim()
		}
		exp.findNextView();
	    });
	} else {
	    nexts[i].addEventListener('click', function() {
		exp.findNextView();
	    });
	}
    }
};

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
