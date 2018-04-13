config_views.thanks = {
    "message": "Thank you for taking part in this experiment!"
};


// creates Thanks View
var initThanksView = function() {
    var view = {};
    view.name = 'thanks';
    view.template = $('#thanks-view').html();

	// construct data object for output
	var data = {
	'author': config_deploy.author,
	'experiment_id': config_deploy.experiment_id,
	'description': config_deploy.description,
	'startDateTime': exp.startDate,
	'total_exp_time_minutes': (Date.now() - exp.global_data.startTime) / 60000,
	'trials': exp.trial_data
	// 'worker_id': HITData['workerId'],
	// 'assignmentId': HITData['assignmentId'],
	// 'HIT_id': HITData['hitId']
    };
	
	// merge in global data accummulated so far
	// this could be unsafe if 'exp.global_data' contains keys used in 'data'!!
	data = _.merge(exp.global_data, data)
	
	// TODO ::: 
	// hide everything from here on from the user
	// have a simple function call like 'exp.submit(data)' or 'submit(data)'
	// some possibilities:
	// -> move this to "submit_to_server.js" ?
	// -> include a function 'exp.submit(data)' in 'main.js'?

    // needed for the submission to MTurk's server
    if (config_deploy.is_MTurk) {
        var HITData = getHITData();

        // updates the fields in the hidden form with info for the MTurk's server
        $('main').html(Mustache.render(view.template, {
            thanksMessage: config_views.thanks.message,
            mturk_server: config_deploy.MTurk_server,
            assignmentId: HITData['assignmentId'],
            author: config_deploy.author,
            experimentId: config_deploy.experiment_id,
			// the following info is included in "data" and does not seem necessary
			// for MTurk submission to do its thing; is that right?
//            startDateTime: exp.global_data.startDate,
//            totalExpTimeMinutes: (Date.now() - exp.global_data.startTime) / 60000,
//            userAgent: exp.data.userAgent
            data: JSON.stringify(data), // should we put in "data" here, including global_data?
            description: config_deploy.description,
            workerId: HITData['workerId'],
        }));

        // MTurk expects a key 'assignmentId' for the submission to work, that is why is it not consistent with the snake case that the other keys have
        data['assignmentId'] = HITData['assignmentId'];
        data['workerId'] = HITData['workerId'];
        data['HITId'] = HITData['HITId'];
    } else if (config_deploy.deployMethod === 'Prolific') {
        var prolificURL = 'https://prolific.ac/submissions/complete?cc=' + config_deploy.prolificCode;

        $('main').html(Mustache.render(view.template, {
            thanksMessage: config_views.thanks.message,
            extraMessage: "Please press the button below<br />" + '<a href=' + prolificURL +  ' class="prolific-url">Finished!</a>'
        }));

        data['participant_id'] = exp.data.out.participant_id;
    } else if (config_deploy.deployMethod === 'directLink'){
    	$('main').html(Mustache.render(view.template, {
    		thanksMessage: config_views.thanks.message
    	}));

//        data['participant_id'] = exp.data.out.participant_id;
    } else if (config_deploy.deployMethod === 'debug') {
        $('main').html(Mustache.render(view.template, {}));
    } else {
        console.log('no such config_deploy.deployMethod');
    }

    // if the experiment is set to live (see config.js liveExperiment)
    // the results are sent to the server
    // if it is set to false
    // the results are displayed on the thanks slide
    if (config_deploy.liveExperiment) {
        console.log('submits');
        submitResults(config_deploy.contact_email, data);
    } else {
        // hides the 'Please do not close the tab.. ' message in debug mode
        $('.warning-message').addClass('nodisplay');
        console.log('debug mode');
        jQuery('<h3/>', {
            text: 'Debug Mode'
        }).appendTo($('.view'));
        jQuery('<p/>', {
            class: 'debug-results',
            text: JSON.stringify(data)
        }).appendTo($('.view'));
    }

    return view;
};
