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
var initPracticeView = function(trialInfo) {
	var view = {};
	view.name = 'practice',
	view.template = $('#practice-view').html();
	var sentence = initSentence();
	// initialises a canvas (code is canvas.js)
	var canvas = createCanvas();
	var secondaryShape = pickSecondaryShape(trialInfo['shape']);
	var numberOfBlacks = trialInfo['numberBlack'].split(', ');
	numberOfBlacks[0] = Number(numberOfBlacks[0]);
	numberOfBlacks[1] = Number(numberOfBlacks[1]);

	$('#main').html(Mustache.render(view.template, {
		title: config_views.practice.title,
		sentence: trialInfo.sentence.split(" "),
		helpText: config_views.expSettings.helpText
	}));

	// creates one continuous underline below the sentence if it was set to true in config.js
	if (config.expSettings.underlineOneLine === true) {
		var words = $(".word");

		for (var i=0; i<words.length; i++) {
			$(words[i]).css('margin', '0 -3px');
		}
	}

	canvas.draw(numberOfBlacks[0], trialInfo['shape'], numberOfBlacks[1], secondaryShape, trialInfo['side']);

	setTimeout(function() {
		var show = $('.show');
		$('.pause-container').addClass('nodisplay');

		for (var i=0; i<show.length; i++) {
			$(show[i]).removeClass('nodisplay');
		};
	}, config.expSettings.pause);


	// checks the expSettings in config.js and depending on the settings
	// either show the image for a particular amount of time
	if (config.expSettings.hideImage === true) {
		setTimeout(function() {
			// add a css class to the image to hide it
			$('.img').addClass('nodisplay');

			$('.help-text').removeClass('hidden');
			// attaches an event listener for key pressed
			// called handleKeyUp() when a key is pressed. (handleKeyUp() checks whether the key is space)
			$('body').on('keyup', handleKeyUp);
		}, config.expSettings.showDuration + config.expSettings.pause);
	// or the image does not disappear at all
	} else {
		// attaches an event listener for key pressed
		// called handleKeyUp() when a key is pressed. (handleKeyUp() checks whether the key is space)
		$('.help-text').removeClass('hidden');
		$('body').on('keyup', handleKeyUp);
	}

	// checks whether the key pressed is space and if so calls sentence.showNextWord()
	// handleKeyUp() is called when a key is pressed
	var handleKeyUp = function(e) {
		if (e.which === 32) {
			$('.help-text').addClass('hidden');
			sentence.showNextWord();
		}
	};

	$('input[name=question]').on('change', function() {
		$('body').off('keyup', handleKeyUp);
		spr.findNextView();
	});

	return view;
};


// creates Begin experiment view
var initBeginExpView = function() {
	var view = {};
	view.name = 'beginExp';
	view.template = $('#begin-exp-view').html();
	$('#main').html(Mustache.render(view.template, {
		text: config.beginExp.text
	}));

	showNextView();

	return view;
};


// creates Trial View
var initTrialView = function(trialInfo, CT) {
	var view = {};
	view.name = 'trial';
	view.template = $('#trial-view').html();
		// initialises a canvas (code is canvas.js)
	var canvas = createCanvas();
	var readingDates = [];
	var readingTimes = [];
	var rtCount = trialInfo.sentence.split(" ").length;
	var sentence = initSentence();
	var secondaryShape = pickSecondaryShape(trialInfo['shape']);
	// converts the numbers into number data types
	var numberOfBlacks = trialInfo['numberBlack'].split(', ');
	numberOfBlacks[0] = Number(numberOfBlacks[0]);
	numberOfBlacks[1] = Number(numberOfBlacks[1]);
	var startingTime = Date.now();

	// renders the templ
	$('#main').html(Mustache.render(view.template, {
		currentTrial: CT + 1,
		totalTrials: spr.data.trials.length,
		sentence: trialInfo.sentence.split(" "),
		helpText: config.expSettings.helpText
	}));

	// creates one continuous underline below the sentence if it was set to true in config.js
	if (config.expSettings.underlineOneLine === true) {
		var words = $(".word");

		for (var i=0; i<words.length; i++) {
			$(words[i]).css('margin', '0 -3px');
		}
	}

	canvas.draw(numberOfBlacks[0], trialInfo['shape'], numberOfBlacks[1], secondaryShape, trialInfo['side']);

	setTimeout(function() {
		var show = $('.show');
		$('.pause-container').addClass('nodisplay');

		for (var i=0; i<show.length; i++) {
			$(show[i]).removeClass('nodisplay');
		};
	}, config.expSettings.pause);

	// checks whether the key pressed is space and if so calls sentence.showNextWord()
	// handleKeyUp() is called when a key is pressed
	var handleKeyUp = function(e) {
		$('.help-text').addClass('hidden');
		if (e.which === 32) {
			sentence.showNextWord();

			// collects the dates (unix time) in a variable readingDates every time a word is shown
			if (rtCount >= 0) {
				readingDates.push(Date.now());
			}
			rtCount--;
		}
	};

	// converts the readingDates into readingTimes by substracting
	// returns a list of readingTimes
	var getDeltas = function() {
		var deltas = [];

		for (var i = 0; i < readingDates.length - 1; i++) {
			deltas[i] = readingDates[i+1] - readingDates[i];
		};

		return deltas;
	};

	// checks the expSettings in config.js and depending on the settings
	// either show the image for a particular amount of time
	if (config.expSettings.hideImage === true) {
		setTimeout(function() {
			// add a css class to the image to hide it
			$('.img').addClass('nodisplay');

			// attaches an event listener for key pressed
			// called handleKeyUp() when a key is pressed. (handleKeyUp() checks whether the key is space)
			$('.help-text').removeClass('hidden');
			$('body').on('keyup', handleKeyUp);
		}, config.expSettings.showDuration + config.expSettings.pause);
	// or the image does not disappear at all
	} else {
		// attaches an event listener for key pressed
		// called handleKeyUp() when a key is pressed. (handleKeyUp() checks whether the key is space)
		$('.help-text').removeClass('hidden');
		$('body').on('keyup', handleKeyUp);
	}

	// attaches an event listener to the yes / no radio inputs
	// when an input is selected a response property with a value equal to the answer is added to the trial object
	// as well as a readingTimes property with value - a list containing the reading times of each word
	$('input[name=question]').on('change', function() {
		$('body').off('keyup', handleKeyUp);
		spr.data.trials[CT].time_spent = Date.now() - startingTime - config.expSettings.pause;
		spr.data.trials[CT].trial_number = CT+1;
		spr.data.trials[CT].response = $('input[name=question]:checked').val();
		spr.data.trials[CT].reading_times = getDeltas();
		console.log(spr.data.trials[CT]);
		setTimeout(function() {
			spr.findNextView();
		}, 200);
	});

	return view;
};


// creates Subject Info View
var initSubjInfoView = function() {
	var view = {};
	view.name = 'subjInfo';
	view.template = $('#subj-info-view').html();
	$('#main').html(Mustache.render(view.template, {
		title: config.subjInfo.title,
		text: config.subjInfo.text,
		buttonText: config.subjInfo.buttonText
	}));

	showNextView();

	return view;
}


// creates Thanks View
var initThanksView = function() {
	var view = {};
	view.name = 'thanks';
	view.template = $('#thanks-view').html();
	var HITData = getHITData();

	$('#main').html(Mustache.render(view.template, {
		mturk_server: config.MTurk_server,
		thanksMessage: config.thanks.message,
		assignmentId: HITData['assignmentId'],
		author: config.author,
		experiment_id: config.experiment_id,
		trials: JSON.stringify(spr.data.trials),
		description: config.description,
		worker_id: HITData['workerId']
	}));

	var data = {
		'author': config.author,
		'experiment_id': config.experiment_id,
		'trials': spr.data.trials,
		'description': config.description,
		'worker_id': HITData['workerId'],
		// MTurk expects a key 'assignmentId' for the submission to work, that is why is it not consistent with the snake case that the other keys have
		'assignmentId': HITData['assignmentId'],
		'HIT_id': HITData['hitId']
	};

	// if the experiment is set to live (seenconfig.js liveExperiment)
	// the results are sent to the server
	// if it is set to false
	// the results are shown on the thanks slide
	if (config.liveExperiment) {
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

// attaches spr.findNextView() function to all the buttons that bring
// the next view when clicked. Which view should be shown is determined by 
// the conditionals in spr.findNextView() which is located in main.js
// if the button has id='send-data' (the button in subj info template has it),
// the data is collected sent before spr.findNextView(); is called
var showNextView = function() {
	var nexts = $('.next-view');

	for (var i=0; i<nexts.length; i++){
		if (nexts[i].id === 'sends-data') {
			nexts[i].addEventListener('click', function() {
				for (var i=0; i<spr.data.trials.length; i++) {
					spr.data.trials[i].age = $('#age').val(),
					spr.data.trials[i].gender = $('#gender').val(),
					spr.data.trials[i].education = $('#education').val(),
					spr.data.trials[i].languages = $('#languages').val(),
					spr.data.trials[i].comments = $('#comments').val().trim()
				}

				spr.findNextView();
			});
		} else {
			nexts[i].addEventListener('click', function() {
				spr.findNextView();
			});
		}
	}
};


// creates a sentence object that has showNextWord() function
var initSentence = function() {
	var sentence = {};
	// keeps track of word to be shown
	var currentWord = -1;

	// picks the word that should be shown when space is clicked
	// when there are no more words to show, the question appears
	sentence.showNextWord = function() {
		var words = $('.word').toArray();

		currentWord++;
		if (currentWord < words.length){
			$(words[currentWord]).addClass('visible');
			$(words[currentWord -1]).removeClass('visible');
		}
		// when all the words have been shown, the last one is hidden
		// and the response buttons appear
		else {
			// hides last word
			$(words[currentWord -1]).removeClass('visible');
			// shows the response buttons
			$('.question').removeClass('nodisplay');
		}
	};

	return sentence;
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
