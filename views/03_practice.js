config_views.practice = {
    "title": "Practice trial"
};

// creates Practice view
var initPracticeView = function(CT) {
    var view = {};
    view.name = 'practice',
    view.template = $('#practice-view').html();
    $('#main').html(Mustache.render(view.template, {
	title: config_views.practice.title,
	question: exp.trial_info.practice_trials[CT].question,
	option1: exp.trial_info.practice_trials[CT].option1,
	option2: exp.trial_info.practice_trials[CT].option2,
	picture: exp.trial_info.practice_trials[CT].picture
    }));
    startingTime = Date.now()
    // attaches an event listener to the yes / no radio inputs
    // when an input is selected a response property with a value equal to the answer is added to the trial object
    // as well as a readingTimes property with value - a list containing the reading times of each word
    $('input[name=question]').on('change', function() {
    	RT = Date.now() - startingTime; // measure RT before anything else
    	trial_data = {
    	    trial_type: "practice",
    	    trial_number: CT+1,
	    question: exp.trial_info.practice_trials[CT].question,
	    option1: exp.trial_info.practice_trials[CT].option1,
	    option2: exp.trial_info.practice_trials[CT].option2,
    	    response: $('input[name=question]:checked').val(),
	    RT: RT
    	};
    	exp.trial_data.push(trial_data)
    	exp.findNextView();
    });
    
    return view;
};
