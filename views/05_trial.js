config_views.trial = {
    // all info in external trial-data file
};

// creates Trial View
var initTrialView = function(trialInfo, CT) {
    var view = {};
    view.name = 'trial',
    view.template = $('#trial-view').html();
    $('#main').html(Mustache.render(view.template, {
	problem: trialInfo.question,
	option1: trialInfo.option1,
	option2: trialInfo.option2,
	picture: trialInfo.picture
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
