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
	thanksMessage: config_views.thanks.message,
	trials: JSON.stringify(exp.data.out)
    }));

    var data = {
	'author': config_deploy.author,
	'experiment_id': config_deploy.experiment_id,
	'description': config_deploy.description,
	'startDateTime': exp.startDate,
	'total_exp_time_minutes': (Date.now() - exp.startTime) / 60000,
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
	    text: JSON.stringify(data)
	}).appendTo($('.view'));
    }
    return view;
};
