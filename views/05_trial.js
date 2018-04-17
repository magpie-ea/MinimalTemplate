//config_views.trial = {
//};
//
//// creates Trial View
//var initTrialView = function(CT) {
//    var view = {};
//    view.name = 'trial',
//    view.template = $('#trial-view').html();
//    $('#main').html(Mustache.render(view.template, {
//		question: exp.trial_info.trials[CT].question,
//		option1: exp.trial_info.trials[CT].option1,
//		option2: exp.trial_info.trials[CT].option2,
//		picture: exp.trial_info.trials[CT].picture
//    }));
//    startingTime = Date.now()
//    
//	// attaches an event listener to the yes / no radio inputs
//    // when an input is selected a response property with a value equal
//	// to the answer is added to the trial object
//    // as well as a readingTimes property with value 
//    $('input[name=question]').on('change', function() {
//    	RT = Date.now() - startingTime; // measure RT before anything else
//    	trial_data = {
//    		trial_type: "main",
//    		trial_number: CT+1,
//	    	question: exp.trial_info.trials[CT].question,
//	    	option1: exp.trial_info.trials[CT].option1,
//	    	option2: exp.trial_info.trials[CT].option2,
//    		response: $('input[name=question]:checked').val(),
//	    	RT: RT
//    	};
//    	exp.trial_data.push(trial_data)
//    	exp.findNextView();
//    });
//    
//    return view;
//};

var mainTrialView = {
	render : function(CT) {
		var view = {};
		view.name = 'trial',
		view.template = $('#trial-view').html();
		$('#main').html(Mustache.render(view.template, {
			question: exp.trial_info.trials[CT].question,
			option1: exp.trial_info.trials[CT].option1,
			option2: exp.trial_info.trials[CT].option2,
			picture: exp.trial_info.trials[CT].picture
		}));
		startingTime = Date.now()

		// attaches an event listener to the yes / no radio inputs
		// when an input is selected a response property with a value equal
		// to the answer is added to the trial object
		// as well as a readingTimes property with value 
		$('input[name=question]').on('change', function() {
			RT = Date.now() - startingTime; // measure RT before anything else
			trial_data = {
				trial_type: "main",
				trial_number: CT+1,
				question: exp.trial_info.trials[CT].question,
				option1: exp.trial_info.trials[CT].option1,
				option2: exp.trial_info.trials[CT].option2,
				response: $('input[name=question]:checked').val(),
				RT: RT
			};
			exp.trial_data.push(trial_data)
			exp.findNextView();
		});

		return view;
	},
	trials: 2
}

