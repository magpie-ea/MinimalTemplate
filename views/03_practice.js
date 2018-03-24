config_views.practice = {
    "title": "Practice trial"
};

// creates Practice view
var initPracticeView = function(CPT) {
    var view = {};
    view.name = 'practice',
    view.template = $('#practice-view').html();
    $('#main').html(Mustache.render(view.template, {
	title: config_views.practice.title,
	question: exp.data.practice_trials[CPT].question,
	option1: exp.data.practice_trials[CPT].option1,
	option2: exp.data.practice_trials[CPT].option2,
	picture: exp.data.practice_trials[CPT].picture
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
	    question: exp.data.practice_trials[CPT].question,
	    option1: exp.data.practice_trials[CPT].option1,
	    option2: exp.data.practice_trials[CPT].option2,
    	    response: $('input[name=question]:checked').val(),
	    RT: RT
    	};
    	exp.data.out.push(trial_data)
    	exp.findNextView();
    });
    
    return view;
};
