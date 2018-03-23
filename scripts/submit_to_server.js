// function for submitting the results of the experiment
// submission method depends on the deployment method

var submitResults = function(isMTurk, contactEmail, data) {
    // if isMTurk is not given, sets it to false
    isMTurk = typeof isMTurk !== 'undefined' ? isMTurk : false;
    // set a default contact email
    contactEmail = typeof contactEmail !== 'undefined' ? contactEmail : "mchfranke@gmail.com";

    $.ajax({
	type: 'POST',
	url: 'https://procomprag.herokuapp.com/api/submit_experiment',
	// url: 'http://localhost:4000/api/submit_experiment',
	crossDomain: true,
	data: data,
	success: function (responseData, textStatus, jqXHR) {
	    console.log(textStatus);
	    
	    if (isMTurk) {
		// For now we still use the original turk.submit to inform MTurk that the experiment has finished.
		// submits to MTurk's server if isMTurk = true
		submitToMTurk();
	    }
	    // shows a thanks message after the submission
	    $('.thanks-message').removeClass('hidden');
	},
	error: function (responseData, textStatus, errorThrown) {
	    // There is this consideration about whether we should still allow such a submission that failed on our side to proceed on submitting to MTurk. Maybe we should after all.
	    if (isMTurk) {
		// For now we still use the original turk.submit to inform MTurk that the experiment has finished.
		// Stela might have another implementation which submits only the participant id.
		// Not notifying the user yet since it might cause confusion. The webapp should report errors.

		// submits to MTurk's server if isMTurk = true
		submitToMTurk();
		// shows a thanks message after the submission
		$('.thanks-message').removeClass('hidden');
	    } else {
		// It seems that this timeout (waiting for the server) is implemented as a default value in many browsers, e.g. Chrome. However it is really long (1 min) so timing out shouldn't be such a concern.
		if (textStatus == "timeout") {
		    alert("Oops, the submission timed out. Please try again. If the problem persists, please contact " + contactEmail + ", including your ID");
		} else {
		    alert("Oops, the submission failed. Please try again. If the problem persists, please contact " + contactEmail + ", including your ID");
		}
	    }
	}
    });
};

// submits to MTurk's servers if config.is_MTurk is set to true
// and the correct url is given in config.MTurk_server
var submitToMTurk = function() {
    var form = $('#mturk-submission-form');
    console.log(form.attr('action'));
    console.log('submits to mturk');
    form.submit();
};

// parses the url to get the assignment_id and worker_id
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
