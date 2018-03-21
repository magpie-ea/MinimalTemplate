// creates the Introduction view
var initIntroView = function() {
	var view = {};
	view.name = 'intro';
	view.template = $('#intro-view').html();
	$('#main').html(Mustache.render(view.template, {
		title: config_views.intro.title,
		text: config_views.intro.text,
		button: config_views.intro.buttonText
	}));

	showNextView();

	return view;
};


// creates Instruction view
var initInstructionsView = function() {
	var view = {};
	view.name = 'instructions';
	view.template = $("#instructions-view").html();
	$('#main').html(Mustache.render(view.template, {
		title: config_views.instructions.title,
		text: config_views.instructions.text,
		button: config_views.instructions.buttonText
	}));

	showNextView();

	return view;
};


// creates Practice view
var initPracticeView = function(trialInfo, CPT) {
    var view = {};
    view.name = 'practice',
    view.template = $('#practice-view').html();
    $('#main').html(Mustache.render(view.template, {
	title: config_views.practice.title,
	problem: trialInfo.question,
	option1: trialInfo.option1,
	option2: trialInfo.option2
    }));
    startingTime = Date.now()
    // attaches an event listener to the yes / no radio inputs
    // when an input is selected a response property with a value equal to the answer is added to the trial object
    // as well as a readingTimes property with value - a list containing the reading times of each word
    $('input[name=question]').on('change', function() {
    	RT = Date.now() - startingTime; // measure RT before anything else
    	trial_data = {
    	    trial_type: "practice",
    	    trial_numner: CPT+1,
	    question: trialInfo.question,
	    question1: trialInfo.option1,
	    question2: trialInfo.option2,
    	    response: $('input[name=question]:checked').val(),
	    RT: RT
    	};
    	exp.data.out.push(trial_data)
    	exp.findNextView();
    });
    
    return view;
};


// creates Begin experiment view
var initBeginExpView = function() {
	var view = {};
	view.name = 'beginExp';
	view.template = $('#begin-exp-view').html();
	$('#main').html(Mustache.render(view.template, {
		text: config_views.beginExp.text
	}));

	showNextView();

	return view;
};


// creates Trial View
var initTrialView = function(trialInfo, CT) {
    var view = {};
    view.name = 'trial',
    view.template = $('#trial-view').html();
    $('#main').html(Mustache.render(view.template, {
	problem: trialInfo.question,
	option1: trialInfo.option1,
	option2: trialInfo.option2
    }));
    startingTime = Date.now()
    // attaches an event listener to the yes / no radio inputs
    // when an input is selected a response property with a value equal to the answer is added to the trial object
    // as well as a readingTimes property with value - a list containing the reading times of each word
    $('input[name=question]').on('change', function() {
    	RT = Date.now() - startingTime; // measure RT before anything else
    	trial_data = {
    	    trial_type: "main",
    	    trial_numner: CT+1,
	    question: trialInfo.question,
	    question1: trialInfo.option1,
	    question2: trialInfo.option2,
    	    response: $('input[name=question]:checked').val(),
	    RT: RT
    	};
    	exp.data.out.push(trial_data)
    	exp.findNextView();
    });
    
    return view;
};


// creates Subject Info View
var initSubjInfoView = function() {
	var view = {};
	view.name = 'subjInfo';
	view.template = $('#subj-info-view').html();
	$('#main').html(Mustache.render(view.template, {
		title: config_views.subjInfo.title,
		text: config_views.subjInfo.text,
		buttonText: config_views.subjInfo.buttonText
	}));

	showNextView();

	return view;
}


// creates Thanks View
var initThanksView = function() {
	var view = {};
	view.name = 'thanks';
	view.template = $('#thanks-view').html();
	// var HITData = getHITData();

	$('#main').html(Mustache.render(view.template, {
		// mturk_server: config_deploy.MTurk_server,
		thanksMessage: config_views.thanks.message,
		// assignmentId: HITData['assignmentId'],
		author: config_deploy.author,
		experiment_id: config_deploy.experiment_id,
		trials: JSON.stringify(exp.data.out),
		description: config_deploy.description,
		// worker_id: HITData['workerId']
	}));

	var data = {
		'author': config_deploy.author,
		'experiment_id': config_deploy.experiment_id,
		'trials': exp.data.out,
		'description': config_deploy.description,
		// 'worker_id': HITData['workerId'],
		// MTurk expects a key 'assignmentId' for the submission to work, that is why is it not consistent with the snake case that the other keys have
		// 'assignmentId': HITData['assignmentId'],
		// 'HIT_id': HITData['hitId']
	};

	// if the experiment is set to live (seenconfig.js liveExperiment)
	// the results are sent to the server
	// if it is set to false
	// the results are shown on the thanks slide
	if (config_deploy.liveExperiment) {
		submitResults(config.is_MTurk, config.contact_email, data);
	} else {
		jQuery('<p/>', {
			text: JSON.stringify(data)
		}).appendTo($('.view'));
	}
	return view;
};


// HELPERS:
// functions shared between more than two views or long functions

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



// submits data to the uni server and MTurk's server if the experiment runs on MTurk
// takes two arguments:
// 1) isMTurk - boolean; true if the experiment runs on MTurk
// 2) contactEmail - string;
var submitResults = function(isMTurk, contactEmail, data) {
	// if isMTurk is not given, sets it to false
	isMTurk = typeof isMTurk !== 'undefined' ? isMTurk : false;
	// set a default contact email
	contactEmail = typeof contactEmail !== 'undefined' ? contactEmail : "mchfranke@gmail.com";

	$.ajax({
		type: 'POST',
		url: 'https://procomprag.herokuapp.com/api/submit_experiment',
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


// HELPERS for trial and practice view needed for this exp in partucular

// func that shuffles a list
// takes a list as an argument and returns the same list with the items shuffled
var shuffleComb = function(comb) {
	var counter = comb.length;
	var index;
	var temp;

	while (counter > 0) {
		index = Math.floor(Math.random() * counter);
		counter--;

		temp = comb[counter];
		comb[counter] = comb[index];
		comb[index] = temp;
	}

	return comb;
};

// takes the main shape as an argument
// returns one of the other two shapes as a secondary shape
var pickSecondaryShape = function(mainShape) {
	var shapes = ['circular', 'triangular', 'squared'];

	for (var i=0; i<shapes.length; i++) {
		if (shapes[i] === mainShape) {
			shapes.splice(i, 1);
		}
	}

	shapes = shuffleComb(shapes);

	return shapes[0];
};
