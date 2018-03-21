// initExp() creates and returns an object ('data') where the experiment's info is stored.
// data.trials - a list of objects containing the trial info that is needed for each slide
// of the experiment.
var initExp = function() {
    var data = {};

	var trials_raw = [
         	    {question: "How are you today?", option1: "fine", option2: "great"},
	    	    {question: "What is the weather like?", option1: "shiny", option2: "rainbow"},
	];

        var practice_trials = [
         	    {question: "Where is your head?", option1: "here", option2: "there"},
	    	    {question: "What's on the bread?", option1: "jam", option2: "ham"},
	];
    
	// function that shuffles the items in a list
	var shuffleComb = function(comb) {
		var counter = comb.length;

		while (counter > 0) {
			let index = Math.floor(Math.random() * counter);
			counter--;

			let temp = comb[counter];
			comb[counter] = comb[index];
			comb[index] = temp;
		}

		return comb;
	};

	// each time initExp() is called, items in data.trials are shuffled
        data.trials = shuffleComb(trials_raw);
        // practice trials occur in the same order for all participants
        data.practice_trials = practice_trials;
        data.out = [];
	return data;
};

