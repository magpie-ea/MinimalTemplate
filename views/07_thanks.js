config_views.thanks = {
    "message": "Thank you for taking part in this experiment!"
};

// creates Thanks View
var initThanksView = function() {
    var view = {};
    view.name = 'thanks';
    view.template = $('#thanks-view').html();
    // var HITData = getHITData();

    $('#main').html(Mustache.render(view.template, {
	// mturk_server: config_deploy.MTurk_server,
	// worker_id: HITData['workerId']
	// assignmentId: HITData['assignmentId'],
	thanksMessage: config_views.thanks.message,
	// author: config_deploy.author,
	// experiment_id: config_deploy.experiment_id,
	// description: config_deploy.description,
	trials: JSON.stringify(exp.data.out)
    }));

    var data = {
	'author': config_deploy.author,
	'experiment_id': config_deploy.experiment_id,
	'description': config_deploy.description,
	'trials': exp.data.out
	// 'worker_id': HITData['workerId'],
	// 'assignmentId': HITData['assignmentId'],
	// 'HIT_id': HITData['hitId']
    };

    // if the experiment is set to live (see config_deploy.js variable `liveExperiment`),
    // the results are sent to the server;
    // if it is set to false,
    // the results are shown on the thanks slide
    if (config_deploy.liveExperiment) {
	submitResults(config_deploy.is_MTurk, config_deploy.contact_email, data);
    } else {
	jQuery('<p/>', {
	    text: "debug mode; record this data manually if necessary (by copy-paste)"
	}).appendTo($('.view'));
	jQuery('<p/>', {
	    text: JSON.stringify(exp.data.out)
	}).appendTo($('.view'));
    }
    return view;
};

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
